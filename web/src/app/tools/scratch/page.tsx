"use client";
import { useState } from "react";
// https://www.youtube.com/watch?v=0dqDHWGcmeU
export default function Page() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  async function searchFlights() {
    setError("");
    setFlights([]);

    try {
      const res = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, date }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setFlights(data.flights);
    } catch (err) {
      console.error(err);
      setError("Network error or server issue");
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Flight Search</h1>
      <div className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Origin airport code"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Destination airport code"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={searchFlights}
        >
          Search Flights
        </button>

        {error && <div className="text-red-500">{error}</div>}

        <ul className="space-y-2 mt-4">
          {flights.map((flight, idx) => (
            <li key={idx} className="bg-white p-4 rounded shadow">
              <div>
                <strong>Airline:</strong> {flight.airline}
              </div>
              <div>
                <strong>Price:</strong> {flight.price}
              </div>
              <div>
                <strong>Departure Time:</strong> {flight.departureTime}
              </div>
              <div>
                <strong>Arrival Time:</strong> {flight.arrivalTime}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
