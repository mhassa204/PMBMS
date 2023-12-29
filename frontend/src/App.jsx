import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@pages/home/Home";
import CreateBazar from "@components/bazar/createBazar";
import ViewCity from "@components/city/ViewCity";
import EditCity from "@components/city/EditCity";
import CityList from "@components/city/CityList";
import CreateCity from "@components/city/CreateCity";
import Sidebar from "@components/navbar/Sidebar";
import ViewZone from "@components/zone/viewZone";
import EditZone from "@components/zone/editZone";
import ZoneList from "@components/zone/zoneList";
import CreateZone from "@components/zone/createZone";
import Dashboard from "@pages/dashboard/Dashboard";
import Settings from "@pages/settings/settings";
import LandingPage from "@pages/LandingPage";
import CreateUserForm from "@components/user/CreateUserForm";
import DeleteUser from "@components/user/DeleteUser";
import EditUserForm from "@components/user/EditUserform";
import ViewUser from "@components/user/ViewUser";
import UserList from "@components/user/UserList";
import StallTypes from "@components/stall/StallTypes";
import StallCategories from "@components/stall/StallCategories";
import Bazars from "@components/bazar/Bazars";
import StallHolder from "@components/stall/StallHolder";
import IncomeCategory from "@components/income/IncomeCategory";
import CancellationReasons from "@components/cancellation/CancellationReasons";

//forms
import CreateStall from "@components/stall/CreateStall";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/create-stall" element={<CreateStall />} />

          <Route path="/admin" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="city-list" element={<CityList />} />
            <Route path="stall-types" element={<StallTypes />} />
            <Route path="stall-categories" element={<StallCategories />} />
            <Route path="bazar-list" element={<Bazars />} />
            <Route
              path="cancellation-reasons"
              element={<CancellationReasons />}
            />
            <Route path="stall-holders" element={<StallHolder />} />
            <Route path="income-category" element={<IncomeCategory />} />
            <Route path="zone" element={<ZoneList />} />
            <Route path="create-user" element={<CreateUserForm />} />
            <Route path="edit-user" element={<EditUserForm />} />
            <Route path="delete-user" element={<DeleteUser />} />
            <Route path="view-user" element={<ViewUser />} />
            <Route path="create-bazar" element={<CreateBazar />} />
            <Route path="create-city" element={<CreateCity />} />
            <Route path="city-list" element={<CityList />} />
            <Route path="city-edit" element={<EditCity />} />
            <Route path="view-city" element={<ViewCity />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="create-zone" element={<CreateZone />} />
            <Route path="zone-list" element={<ZoneList />} />
            <Route path="zone-edit" element={<EditZone />} />
            <Route path="view-zones" element={<ViewZone />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
