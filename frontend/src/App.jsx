import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBazar from "./components/bazar/createBazar";
import ViewCity from "./components/city/ViewCity";
import EditCity from "./components/city/EditCity";
import CityList from "./components/city/CityList";
import CreateCity from "./components/city/CreateCity";
import Sidebar from "./components/navbar/Sidebar";
import ViewZone from "./components/zone/viewZone";
import EditZone from "./components/zone/editZone";
import ZoneList from "./components/zone/zoneList";
import CreateZone from "./components/zone/createZone";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-bazar" element={<CreateBazar />} />
          <Route path="/create-city" element={<CreateCity />} />
          <Route path="/city-list" element={<CityList />} />
          <Route path="/city-edit" element={<EditCity />} />
          <Route path="/view-city" element={<ViewCity />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/create-zone" element={<CreateZone />} />
          <Route path="/zone-list" element={<ZoneList />} />
          <Route path="/zone-edit" element={<EditZone />} />
          <Route path="/view-zones" element={<ViewZone />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
