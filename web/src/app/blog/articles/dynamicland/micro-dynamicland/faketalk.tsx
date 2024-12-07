"use client"
import { useState } from 'react'


//we can all figure out dynamicland from scratch with eli5 to diagram
//worrydream gambled 15 years on dynamicladn and it might not have worked
//but as of 2022 it was the coolest demo ive ever seen!!!
//this is something i want to work in every office home and neighborhood


//if we use this to explain concepts in robotics and biotech 
//it may make them more foolproof and safe :p
export default function Input() {
  const [inputValue, setInputValue] = useState('')

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const response = await fetch('/api/generate-diagram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: inputValue })
        })
        const data = await response.json()
        // Handle the Three.js diagram data here
      } catch (error) {
        console.error('Error generating diagram:', error)
      }
    }
  }

  return <>
    <label>faketalk</label>
    <input 
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  </>
}


