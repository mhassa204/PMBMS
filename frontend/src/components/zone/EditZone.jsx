import React, { useState, useEffect } from "react";
import axios from "axios";

const EditZone = ({ initialData, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    id: initialData.id,
    name: initialData.name,
    active: initialData.active,
    cities: initialData.cities || [""],
    zoneManager: initialData.zoneManager,
  });

  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cities");
        setCityList(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (name === "cities") {
      const newCities = [...formData.cities];
      newCities[index] = value;
      setFormData((prevData) => ({ ...prevData, cities: newCities }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleAddCity = () => {
    setFormData((prevData) => ({
      ...prevData,
      cities: [...prevData.cities, ""],
    }));
  };

  const handleRemoveCity = (index) => {
    const newCities = [...formData.cities];
    newCities.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      cities: newCities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/zones/${formData.id}`, formData);
      console.log("Zone updated successfully!");
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating zone:", error);
    }
  };

  const getAvailableCities = () => {
    return cityList.filter(
      (city) => !formData.cities.includes(city.name) && city.name !== ""
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form-label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Active:
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={(e) => handleChange(e)}
          className="form-checkbox"
        />
      </label>

      {formData.cities.map((city, index) => (
        <div key={index} className="city-container">
          <label className="form-label">
            City {index + 1}:
            <select
              name="cities"
              value={city}
              onChange={(e) => handleChange(e, index)}
              required
              className="form-input"
            >
              <option value="">Select a city</option>
              {getAvailableCities().map((cityOption) => (
                <option key={cityOption.id} value={cityOption.name}>
                  {cityOption.name}
                </option>
              ))}
              {city &&
                !getAvailableCities().some(
                  (cityOption) => cityOption.name === city
                ) && (
                  <option key={city} value={city}>
                    {city}
                  </option>
                )}
            </select>
          </label>
          <button
            type="button"
            onClick={() => handleRemoveCity(index)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddCity} className="add-button">
        Add City
      </button>

      <label className="form-label">
        Zone Manager:
        <input
          type="text"
          name="zoneManager"
          value={formData.zoneManager}
          onChange={(e) => handleChange(e)}
          required
          className="form-input"
        />
      </label>

      <button type="submit" className="submit-button">
        Update Zone
      </button>
    </form>
  );
};

export default EditZone;
