import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './city.css';

const ViewCity = ({ city, onClose }) => {
  const cityId = city.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cities/${cityId}`);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching city:', error.message);
        setError('An error occurred while fetching the city.');
        setLoading(false);
      }
    };

    fetchCity();
  }, [cityId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="view-city-container">
        <p>{error}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="view-city-container">
      <button className="close-button" onClick={onClose}>
        &#x2715; {/* Unicode for the 'x' character */}
      </button>
      <h1 className="title">City Details</h1>
      <div className="city-details">
        <p>Name: {city.name}</p>
        <p>District: {city.district}</p>
        <p>Province: {city.province}</p>
        <p>Prefix: {city.prefix}</p>
      </div>
    </div>
  );
};

export default ViewCity;
