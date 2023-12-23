import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateCity from "./CreateCity";
import ViewCity from "./ViewCity";
import EditCity from "./EditCity";
import "./city.css";

const CityList = () => {
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedEditCity, setSelectedEditCity] = useState(null);
  const [isCreateCityOpen, setIsCreateCityOpen] = useState(false);
  const [isEditCityOpen, setIsEditCityOpen] = useState(false);

  const handleCreateCity = (city) => {
    setCityList([...cityList, city]);
    setIsCreateCityOpen(false);
  };

  const handleViewCity = (city) => {
    setSelectedCity(city);
  };

  const handleEditCity = () => {
    setIsEditCityOpen(true);
  };

  const handleDeleteCity = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cities/${id}`);
      const filteredCityList = cityList.filter((city) => city.id !== id);
      setCityList(filteredCityList);
      setSelectedCity(null); // Clear the selected city after deletion
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cities");
      setCityList(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="city-container">
      <button onClick={() => setIsCreateCityOpen(true)}>Create City</button>
      {isCreateCityOpen && <CreateCity onCreateCity={handleCreateCity} />}

      {selectedCity && (
        <ViewCity
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
          onEdit={handleEditCity}
          onDelete={() => handleDeleteCity(selectedCity.id)}
        />
      )}

      {isEditCityOpen && (
        <EditCity
          city={selectedEditCity}
          onEditCity={(updatedCity) => {
            const updatedCityList = cityList.map((c) =>
              c.id === updatedCity.id ? updatedCity : c
            );
            setCityList(updatedCityList);
            setIsEditCityOpen(false);
          }}
          onClose={() => setIsEditCityOpen(false)}
        />
      )}

      <table className="city-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cityList.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>
                <button onClick={() => handleViewCity(city)}>View</button>
                <button
                  onClick={() => {
                    setSelectedEditCity(city);
                    setIsEditCityOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteCity(city.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityList;
