package main

import (
	"encoding/binary"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"os"
	"runtime"

	//"github.com/apache/arrow/go/v14/arrow"
	//"github.com/apache/arrow/go/v14/arrow/array"
	//"github.com/apache/arrow/go/v14/arrow/memory"
	//"github.com/apache/arrow/go/v14/parquet/pqarrow"
	"github.com/qedus/osmpbf"
	//"github.com/twpayne/go-geom"
	//"github.com/twpayne/go-geom/encoding/wkb"
)

// wkbPoint returns the WKB representation (using LittleEndian) of a Point geometry.
func wkbPoint(lat, lon float64) []byte {
	pt := geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{lon, lat})
	data, err := wkb.Marshal(pt, binary.LittleEndian)
	if err != nil {
		panic(err)
	}
	return data
}

// quadrantKey is a rough function that buckets lat/lon into ~1 mile squares.
// 1 degree of lat ≈ 69 miles at lat ~ 0° (i.e. near equator).
func quadrantKey(lat, lon float64) string {
	dLat := 1.0 / 69.0
	dLon := 1.0 / 69.0
	latIndex := int(math.Floor(lat / dLat))
	lonIndex := int(math.Floor(lon / dLon))
	return fmt.Sprintf("%d_%d", latIndex, lonIndex)
}

// writeJSON will take slices of node information, encode each geometry as base64,
// and write them to a JSON array on disk.
func writeJSON(filename string, nodeIDs []uint64, quadrants []string, wkbGeometries [][]byte) error {
	// Define the data structure we want to encode as JSON
	type NodeJSON struct {
		NodeID      uint64 `json:"node_id"`
		Quadrant    string `json:"quadrant"`
		WKBGeometry string `json:"geometry"` // base64-encoded WKB
	}

	// Prepare the slice of records
	records := make([]NodeJSON, 0, len(nodeIDs))
	for i := 0; i < len(nodeIDs); i++ {
		records = append(records, NodeJSON{
			NodeID:      nodeIDs[i],
			Quadrant:    quadrants[i],
			WKBGeometry: base64.StdEncoding.EncodeToString(wkbGeometries[i]),
		})
	}

	// Marshal to JSON
	data, err := json.MarshalIndent(records, "", "  ")
	if err != nil {
		return err
	}

	// Write JSON to file
	return os.WriteFile(filename, data, 0644)
}

func main() {

	f, err := os.Open("/home/adnan/planet-241230.osm.pbf")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	d := osmpbf.NewDecoder(f)
	d.SetBufferSize(osmpbf.MaxBlobSize)
	err = d.Start(runtime.GOMAXPROCS(-1)) // decode in parallel
	if err != nil {
		log.Fatal(err)
	}

	// Collect data for nodes
	// We'll store node ID, quadrant, and the WKB geometry (lat/lon).
	var nodeIDs []uint64
	var quadrantVals []string
	var wkbGeoms [][]byte

	var nc, wc, rc uint64

	for {
		v, err := d.Decode()
		if err == io.EOF {
			break
		} else if err != nil {
			log.Fatalf("failed to decode: %v", err)
		}

		switch obj := v.(type) {
		case *osmpbf.Node:
			nc++
			nodeIDs = append(nodeIDs, obj.ID)
			quadKey := quadrantKey(obj.Lat, obj.Lon)
			quadrantVals = append(quadrantVals, quadKey)
			wkbGeoms = append(wkbGeoms, wkbPoint(obj.Lat, obj.Lon))

		case *osmpbf.Way:
			wc++
			// not handled in this example
		case *osmpbf.Relation:
			rc++
			// not handled in this example
		default:
			log.Fatalf("unknown type %T\n", obj)
		}
	}

	fmt.Printf("Finished reading OSM file. Nodes: %d, Ways: %d, Relations: %d\n", nc, wc, rc)
	fmt.Printf("Now writing to Parquet...\n")

	if err := writeGeoParquet("nodes-latlon.parquet", nodeIDs, quadrantVals, wkbGeoms); err != nil {
		log.Fatalf("failed to write GeoParquet: %v", err)
	}
	fmt.Println("Wrote GeoParquet file: nodes-latlon.parquet")

	// Now also write the same data to JSON
	fmt.Printf("Now writing to JSON...\n")
	if err := writeJSON("nodes-latlon.json", nodeIDs, quadrantVals, wkbGeoms); err != nil {
		log.Fatalf("failed to write JSON: %v", err)
	}
	fmt.Println("Wrote JSON file: nodes-latlon.json")
}

// writeGeoParquet writes the provided slices into a Parquet file with minimal
// GeoParquet metadata, so that it is recognized as a single geometry column file.
func writeGeoParquet(
	filename string,
	nodeIDs []uint64,
	quadrants []string,
	wkbGeometries [][]byte,
) error {

	// 1) Define the Arrow schema with columns:
	//    node_id (uint64), quadrant (utf8), geometry (binary).
	//    geometry metadata below indicates it's a GeoParquet geometry column.
	fields := []arrow.Field{
		{
			Name: "node_id",
			Type: arrow.PrimitiveTypes.Uint64,
		},
		{
			Name: "quadrant",
			Type: arrow.BinaryTypes.String,
		},
		{
			Name: "geometry",
			Type: arrow.BinaryTypes.Binary,
			Metadata: arrow.NewMetadata(
				[]string{
					"geo", // Key specifying this column's geo metadata
				},
				[]string{
					`{"encoding":"WKB","geometry_type":"Point","crs":"EPSG:4326"}`,
				},
			),
		},
	}
	schema := arrow.NewSchema(fields, nil)

	// 2) Build in-memory columns.
	pool := memory.NewCheckedAllocator(memory.DefaultAllocator)
	defer pool.AssertSize(nil, 0)

	// We'll build them as Arrow arrays in a single batch.
	numRecords := len(nodeIDs)

	nodeIDBuilder := array.NewUint64Builder(pool)
	defer nodeIDBuilder.Release()

	quadBuilder := array.NewStringBuilder(pool)
	defer quadBuilder.Release()

	geomBuilder := array.NewBinaryBuilder(pool, arrow.BinaryTypes.Binary)
	defer geomBuilder.Release()

	for i := 0; i < numRecords; i++ {
		nodeIDBuilder.Append(nodeIDs[i])
		quadBuilder.Append(quadrants[i])
		geomBuilder.Append(wkbGeometries[i])
	}

	// 3) Convert the built columns into an Arrow Record.
	nodeIDArr := nodeIDBuilder.NewArray()
	defer nodeIDArr.Release()

	quadArr := quadBuilder.NewArray()
	defer quadArr.Release()

	geomArr := geomBuilder.NewArray()
	defer geomArr.Release()

	record := array.NewRecord(schema, []arrow.Array{nodeIDArr, quadArr, geomArr}, int64(numRecords))
	defer record.Release()

	// 4) Use pqarrow to write the record to a Parquet file.
	// Add GeoParquet metadata to the file-level metadata as well.
	props := pqarrow.DefaultWriterProps()
	fileMeta := pqarrow.NewFileMetaDataBuilder(props)

	// Add global "geo" metadata, indicating that "geometry" is the geometry column.
	// In the official GeoParquet spec, it’s recommended to set top-level metadata
	// with a JSON object describing the primary geometry column and CRS, etc.
	//
	// Example of minimal top-level geo metadata:
	// {
	//   "version": "0.4.0",
	//   "primary_column": "geometry",
	//   "columns": {
	//     "geometry": {
	//       "geometry_type": "Point",
	//       "encoding": "WKB",
	//       "crs": "EPSG:4326"
	//     }
	//   }
	// }
	geoMetadata := `{
	  "version": "0.4.0",
	  "primary_column": "geometry",
	  "columns": {
	    "geometry": {
	      "geometry_type": "Point",
	      "encoding": "WKB",
	      "crs": "EPSG:4326"
	    }
	  }
	}`
	fileMeta.AppendKeyValueMetadata("geo", geoMetadata)

	writer, err := pqarrow.NewFileWriter(schema, filename, fileMeta, props, pqarrow.DefaultArrowWriterProps())
	if err != nil {
		return fmt.Errorf("NewFileWriter error: %w", err)
	}
	defer writer.Close()

	if err := writer.Write(record); err != nil {
		return fmt.Errorf("failed to write record: %w", err)
	}

	return writer.Close()
}
