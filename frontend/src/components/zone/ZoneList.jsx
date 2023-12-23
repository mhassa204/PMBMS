import React, { useState, useEffect } from "react";
import axios from "axios";
import EditZone from "./EditZone";
import ViewZone from "./ViewZone";
import CreateZone from "./CreateZone";
import "./zone.css";

const ZoneList = () => {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [mode, setMode] = useState("view");
  const [cityList, setCityList] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const response = await axios.get("http://localhost:8000/zones");
      setZones(response.data);
    } catch (error) {
      console.error("Error fetching zones:", error);
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

  const handleCreate = async (newZone) => {
    try {
      await axios.post("http://localhost:8000/zones", newZone);
      console.log("Zone created successfully!");
      setCreating(false);
      fetchZones();
    } catch (error) {
      console.error("Error creating zone:", error);
    }
  };

  const handleView = async (zone) => {
    if (selectedZone === zone) {
      setSelectedZone(null);
    } else {
      setSelectedZone(zone);
    }
    setMode("view");
  };
  const handleEdit = async ({ zone, onUpdateSuccess }) => {
    try {
      await fetchCities();

      setSelectedZone(zone);
      setMode("edit");

      onUpdateSuccess();
    } catch (error) {
      console.error("Error fetching cities for editing:", error);
    }
  };

  const onUpdateSuccess = async () => {
    try {
      await fetchZones();
      console.log("Zone updated successfully!");
    } catch (error) {
      console.error("Error fetching updated zones:", error);
    }
    setSelectedZone(null);
    setMode("view");
  };

  const handleDelete = async (zone) => {
    try {
      await axios.delete(`http://localhost:8000/zones/${zone.id}`);
      console.log("Zone deleted successfully!");
      setZones(zones.filter((z) => z.id !== zone.id));
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };

  const handleUpdateSuccess = async () => {
    try {
      await fetchZones();
      console.log("Zone updated successfully!");
    } catch (error) {
      console.error("Error fetching updated zones:", error);
    }
    setSelectedZone(null);
    setMode("view");
  };

  return (
    <div className="zone-list-container">
      <h1 className="title">Zone List</h1>
      {zones.map((zone) => (
        <div key={zone.id} className="zone-item">
          <h2 className="zone-name">{zone.name}</h2>
          <button onClick={() => handleView(zone)} className="view-button">
            View
          </button>
          <button
            onClick={() => handleEdit(zone, onUpdateSuccess)}
            className="edit-button"
          >
            Edit
          </button>
          <button onClick={() => handleDelete(zone)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
      {creating ? (
        <CreateZone onCreate={handleCreate} />
      ) : (
        <button onClick={() => setCreating(true)}>Create Zone</button>
      )}
      {mode === "view" && selectedZone && (
        <ViewZone zoneData={selectedZone} onDeleteSuccess={fetchZones} />
      )}
      {mode === "edit" && selectedZone && (
        <EditZone
          initialData={selectedZone}
          onUpdateSuccess={handleUpdateSuccess}
          cityList={cityList} // Pass the latest city list to EditZone
        />
      )}
    </div>
  );
};

export default ZoneList;
