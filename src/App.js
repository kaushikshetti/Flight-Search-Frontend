import React, { useState } from "react";
import $ from "jquery";
import "./App.css";  // Add this import

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = process.env.REACT_APP_JWT_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIwODUxNDQ2ZWVlYmI5YmE4MWI3NzAiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzQ2OTY1MzM1LCJleHAiOjE3NDY5Njg5MzV9.jFH4ypNcpvMlNYy3h3XFR6yVYxT7rWOjREcEaksOVok";
  const query = `origin=${origin}&destination=${destination}&departureDate=${departureDate}&passengers=${passengers}`;

  const handleSearch = async () => {
    setLoading(true);
    $.ajax({
      url: `http://localhost:3000/api/search?${query}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (data) => {
        setFlights(data);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching flights:", error);
        alert("Failed to fetch flights.");
      },
      complete: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="container">
      <h2 className="title">✈️ Flight Search</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="input-field"
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          min="1"
          value={passengers}
          placeholder="Passengers"
          onChange={(e) => setPassengers(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearch} className="search-button">
          Search Flights
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading flights...</div>
      ) : flights.length > 0 ? (
        <div className="flights-grid">
          {flights.map((flight, index) => (
            <div key={index} className="flight-card">
              <div className="flight-header">
                <strong>{flight.airline} {flight.airlineCode}-{flight.flightNumber}</strong>
              </div>
              <div className="flight-details">
                <div className="route">
                  {flight.origin} → {flight.destination}
                </div>
                <div className="time-info">
                  <div>
                    <span className="label">Departure:</span>
                    {new Date(flight.departure).toLocaleTimeString()}
                  </div>
                  <div>
                    <span className="label">Arrival:</span>
                    {new Date(flight.arrival).toLocaleTimeString()}
                  </div>
                </div>
                <div className="price">₹{flight.price}</div>
                <div className="seats">
                  Available Seats: {flight.availableSeats}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-flights"></div>
      )}
    </div>
  );
};

export default App;
