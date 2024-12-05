// 'use client'
// import { createClient } from '@libsql/client'
// import { useState, useEffect } from 'react'

// const client = createClient({
//   url: 'libsql://hi-adnanwahab.turso.io',
//   authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzMxNjM0MzksImlkIjoiMmM1NmM2ZjYtNjQ4MC00NjQ5LWEwZjctZjg2ZDE0MjlkYWQ3In0.QdezhRxdMw01SBveNIV_NQcVzi2GZtLsbgDe6ujXLZdX0aBShAa3ReHxjMybYFE7YjfimNFXNFwP7nNyqOl4CA'
// })

// export async function query(sql, params = []) {
//   try {
//     const result = await client.execute({
//       sql,
//       args: params
//     })
//     return result.rows
//   } catch (error) {
//     console.error('Database query error:', error)
//     throw error
//   }
// }

// export default function Home() {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [jsonInput, setJsonInput] = useState('')

//   useEffect(() => {
//     fetchData()
//   }, [])

//   async function fetchData() {
//     try {
//       const response = await fetch('/api/data')
//       const result = await response.json()
//       setData(result)
//     } catch (error) {
//       console.error('Error fetching data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddJson = async () => {
//     try {
//       // Validate JSON input
//       const jsonData = JSON.parse(jsonInput)
      
//       // Insert the JSON data into the table
//       await client.execute({
//         sql: 'INSERT INTO your_table (data) VALUES (?)',
//         args: [JSON.stringify(jsonData)]
//       })

//       // Refresh the data display
//       await fetchData()
      
//       // Clear the input field
//       setJsonInput('')
//     } catch (error) {
//       console.error('Error adding JSON:', error)
//       alert('Invalid JSON or database error')
//     }
//   }

//   if (loading) return <div>Loading...</div>

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Data from Turso</h1>
      
//       <div className="mb-4">
//         <textarea
//           value={jsonInput}
//           onChange={(e) => setJsonInput(e.target.value)}
//           placeholder="Enter JSON data..."
//           className="w-full h-32 p-2 border rounded-md mb-2"
//         />
//         <button
//           onClick={handleAddJson}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add JSON
//         </button>
//       </div>

//       <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </div>
//   )
// }
export default function Turso() {
  return <div>Turso</div>
}