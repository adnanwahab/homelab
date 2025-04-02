'use client'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'

import { useEffect, useState } from 'react'

//const TOKEN = 'generated-jwt';

const WS_URL = 'wss://omnissiah-university-kmuz0plz.livekit.cloud'

export default function Example() {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true)

        const response = await fetch('/api/livekit/get_token')

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setToken(data.token)
      } catch (err) {
        console.error('Failed to fetch LiveKit token:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchToken()
  }, [])

  if (loading) return <div>Loading LiveKit connection...</div>
  if (error) return <div>Error fetching token: {error}</div>

  return (
    <LiveKitRoom
      token={token}
      serverUrl={WS_URL}
      connect={true}
      controls={true}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
