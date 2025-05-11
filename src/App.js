import React, { useState } from "react";

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ2OTQ0MDA4LCJleHAiOjE3NDY5NDc2MDh9.LqA_XEnRIIznDpdbpx9uNKXif46ZXZarg1GRmn7R9ew"
      const query = `origin=${origin}&destination=${destination}&departureDate=${departureDate}&passengers=${passengers}`;
      const response = await fetch(`http://localhost:3000/api/search?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flight Search</h2>
      <div>
        <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
        <input type="number" min="1" value={passengers} placeholder="Passengers" onChange={(e) => setPassengers(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading flights...</p>
      ) : (
        flights.length > 0 ? (
          <ul>
            {flights.map((flight, index) => (
              <li key={index} style={{ margin: "20px 0" }}>
                <strong>{flight.airline} {flight.airlineCode}-{flight.flightNumber}</strong><br />
                {flight.origin} → {flight.destination}<br />
                Departure: {new Date(flight.departure).toLocaleTimeString()}<br />
                Arrival: {new Date(flight.arrival).toLocaleTimeString()}<br />
                Price: ₹{flight.price}<br />
                Available Seats: {flight.availableSeats}
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )
      )}
    </div>
  );
};

export default App;
