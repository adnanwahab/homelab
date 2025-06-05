package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

const (
	supabaseUrl = "https://ewkxvbgbzikwwudriebh.supabase.co"
	supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y"
)

type Comment struct {
	ID        int    `json:"id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	// Add other fields as needed
}

func main() {
	// Initialize Echo
	e := echo.New()

	// Define route to get all comments
	e.GET("/comments", func(c echo.Context) error {
		// Create HTTP request to Supabase
		req, err := http.NewRequest("GET", fmt.Sprintf("%s/rest/v1/comments?select=*", supabaseUrl), nil)
		if err != nil {
			log.Printf("Error creating request: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to create request",
			})
		}

		// Add required headers
		req.Header.Add("apikey", supabaseKey)
		req.Header.Add("Authorization", "Bearer "+supabaseKey)
		req.Header.Add("Content-Type", "application/json")

		// Make the request
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Error making request: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to fetch comments",
			})
		}
		defer resp.Body.Close()

		// Read response body
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("Error reading response: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to read response",
			})
		}

		// Parse response
		var comments []Comment
		if err := json.Unmarshal(body, &comments); err != nil {
			log.Printf("Error parsing response: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to parse comments",
			})
		}

		return c.JSON(http.StatusOK, comments)
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server starting on port %s...\n", port)
	e.Logger.Fatal(e.Start(":" + port))
}
