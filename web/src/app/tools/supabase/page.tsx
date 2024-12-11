'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  'https://ewkxvbgbzikwwudriebh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y'
)

export default function SupabaseDashboard() {
  const [collections, setCollections] = useState<any[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('KV')
  const [tableData, setTableData] = useState<any[]>([])

  useEffect(() => {
    fetchTables()
    fetchTableData(selectedTable)
  }, [selectedTable])

  async function fetchTables() {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (data) {
      setCollections(data)
    }
  }

  async function fetchTableData(tableName: string) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
    
    if (data) {
      setTableData(data)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Dashboard</h1>
      
      <div className="mb-4">
        <select 
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="border p-2 rounded"
        >
          {collections.map((collection) => (
            <option key={collection.table_name} value={collection.table_name}>
              {collection.table_name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              {tableData[0] && Object.keys(tableData[0]).map((header) => (
                <th key={header} className="border p-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, i) => (
                  <td key={i} className="border p-2">
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
