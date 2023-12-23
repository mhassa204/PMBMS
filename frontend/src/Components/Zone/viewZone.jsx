import React from 'react';
import axios from 'axios';
import './zone.css';

const ViewZone = ({ zoneData, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/zones/${zoneData.id}`);
      console.log('Zone deleted successfully!');
      onDeleteSuccess(); // Notify the parent component
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  return (
    <div className="view-zone-container">
      <h1 className="title">Zone Details</h1>
      <p className="zone-detail"><strong>Name:</strong> {zoneData.name}</p>
      <p className="zone-detail"><strong>Active:</strong> {zoneData.active ? 'Yes' : 'No'}</p>
      <p className="zone-detail">
        <strong>Cities:</strong>
        {zoneData.cities && zoneData.cities.length > 0 ? (
          <ul className="city-list">
            {zoneData.cities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        ) : 'No cities'}
      </p>
      <p className="zone-detail"><strong>Zone Manager:</strong> {zoneData.zoneManager}</p>
      <button onClick={handleDelete} className="delete-button">Delete Zone</button>
    </div>
  );
};

export default ViewZone;