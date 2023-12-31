import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@pages/home/Home";
import ViewZone from "@components/zone/viewZone";
import EditZone from "@components/zone/editZone";
import CreateZone from "@components/zone/createZone";
import Dashboard from "@pages/dashboard/Dashboard";
import Settings from "@pages/settings/settings";
import LandingPage from "@pages/LandingPage";
import CreateUser from "@components/user/CreateUser";
import CreateBazaar from "@components/bazar/CreateBazaar";
import EditUserForm from "@components/user/EditUserform";
import ViewUser from "@components/user/ViewUser";
import StallTypes from "@components/stall/StallTypes";
import StallCategories from "@components/stall/StallCategories";
import Bazars from "@components/bazar/Bazars";
import StallHolder from "@components/stall/StallHolder";
import IncomeCategory from "@components/income/IncomeCategory";
import CancellationReasons from "@components/cancellation/CancellationReasons";
import Zones from "@components/zone/Zones";
import VoucherGeneration from "@components/voucher/VoucherGeneration";

//forms
import CreateStall from "@components/stall/CreateStall";
import CreatePolicyForm from "@components/fine/FinePolicyForm";
import VoucherCreation from "@components/voucher/VoucherCreation";
import Users from "@components/user/Users";
import StallList from "@components/stall/StallList";
import CreateStallHolder from "@components/stall/CreateStallHolder";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/landing-page" element={<LandingPage />} />

          <Route path="/admin" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />

            {/* Basic Steps Routes */}
            <Route path="zone-list" element={<Zones />} />
            <Route path="create-zone" element={<CreateZone />} />
            <Route path="zone-edit" element={<EditZone />} />
            <Route path="view-zones" element={<ViewZone />} />

            <Route path="user-list" element={<Users />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="edit-user" element={<EditUserForm />} />
            <Route path="view-user" element={<ViewUser />} />

            <Route path="stall-categories" element={<StallCategories />} />
            <Route path="income-category" element={<IncomeCategory />} />
            <Route path="stall-holders" element={<StallHolder />} />
            <Route path="stall-types" element={<StallTypes />} />
            <Route
              path="cancellation-reasons"
              element={<CancellationReasons />}
            />

            <Route path="bazar-list" element={<Bazars />} />
            <Route path="create-bazar" element={<CreateBazaar />} />

            <Route path="generate-voucher" element={<VoucherGeneration />} />

            {/* Transaction Section Routes */}
            <Route path="stall-list" element={<StallList />} />
            <Route path="create-stall" element={<CreateStall />} />
            <Route path="create-stallHolder" element={<CreateStallHolder />} />

            <Route path="create-policy" element={<CreatePolicyForm />} />
            <Route path="create-voucher" element={<VoucherCreation />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
