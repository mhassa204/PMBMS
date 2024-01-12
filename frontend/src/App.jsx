import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "@pages/home/Home";
import Dashboard from "@pages/dashboard/Dashboard";
import Settings from "@pages/settings/settings";
import LandingPage from "@pages/LandingPage";
//Basic Setup
import ViewZone from "@components/zone/viewZone";
import EditZone from "@components/zone/editZone";
import CreateZone from "@components/zone/createZone";
import CreateUser from "@components/user/CreateUser";
import CreateBazaar from "@components/bazar/CreateBazaar";
import ViewUser from "@components/user/ViewUser";
import StallTypes from "@components/stall/StallTypes";
import StallCategories from "@components/stall/StallCategories";
import Bazars from "@components/bazar/Bazars";
import StallHolder from "@components/stall/StallHolder";
import IncomeCategory from "@components/income/IncomeCategory";
import CancellationReasons from "@components/cancellation/CancellationReasons";
import Zones from "@components/zone/Zones";

//Transaction
import VoucherGeneration from "@components/voucher/VoucherGeneration";
import VoucherCreation from "@components/voucher/VoucherCreation";
import StallList from "@components/stall/StallList";
import FinePolicyForm from "@components/fine/FinePolicyForm";
import CreatePolicyForm from "@components/fine/FinePolicyForm";
import Vouchers from "@components/voucher/Voucher";
import Allotments from "@components/allotments/Allotments";
import SecurityAdjustiment from "@components/security/SecurityAdjustments";
import FinePolicies from "@components/fine/FinePolicies";
import VoucherGenerations from "@components/voucher/VoucherGenerations";
import AdminVouchers from "@components/voucher/AdminVouchers";

//forms
import CreateStall from "@components/stall/CreateStall";
import Users from "@components/user/Users";
import CreateStallHolder from "@components/stall/CreateStallHolder";
import Login from "@pages/authentication/Login";
// import Signup from "@pages/authentication/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          {/* Temporary routes for form */}
          <Route path="/create-zone" element={<CreateZone />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-bazar" element={<CreateBazaar />} />
          <Route path="/generate-voucher" element={<VoucherGeneration />} />
          <Route path="/create-stall" element={<CreateStall />} />
          <Route path="/create-stallHolder" element={<CreateStallHolder />} />
          <Route path="/create-policy" element={<CreatePolicyForm />} />
          <Route path="/create-voucher" element={<VoucherCreation />} />
          <Route path="/fine-policy" element={<FinePolicyForm />} />

          {/* Actual routes  */}
          <Route path="/admin" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />

            {/* Basic Steps Routes */}
            <Route path="basic/zone-list" element={<Zones />} />
            <Route path="basic/create-zone" element={<CreateZone />} />
            <Route path="basic/zone-edit" element={<EditZone />} />
            <Route path="basic/view-zones" element={<ViewZone />} />

            <Route path="basic/user-list" element={<Users />} />
            <Route path="basic/create-user" element={<CreateUser />} />
            {/* <Route path="edit-user" element={<EditUserForm />} /> */}
            <Route path="basic/view-user" element={<ViewUser />} />

            <Route
              path="basic/stall-categories"
              element={<StallCategories />}
            />
            <Route path="basic/income-category" element={<IncomeCategory />} />
            <Route path="basic/stall-holders" element={<StallHolder />} />
            <Route path="basic/stall-types" element={<StallTypes />} />
            <Route
              path="basic/cancellation-reasons"
              element={<CancellationReasons />}
            />

            <Route path="basic/bazar-list" element={<Bazars />} />
            <Route path="basic/create-bazar" element={<CreateBazaar />} />

            {/* Transaction Section Routes */}
            <Route path="transaction/create-stall" element={<CreateStall />} />
            <Route
              path="transaction/generate-voucher"
              element={<VoucherGeneration />}
            />

            <Route
              path="transaction/create-stallHolder"
              element={<CreateStallHolder />}
            />
            <Route
              path="transaction/create-policy"
              element={<CreatePolicyForm />}
            />
            <Route
              path="transaction/create-voucher"
              element={<VoucherCreation />}
            />

            <Route path="transaction/stall-list" element={<StallList />} />
            <Route
              path="transaction/security-adjustments"
              element={<SecurityAdjustiment />}
            />
            <Route path="transaction/vouchers" element={<Vouchers />} />
            <Route path="transaction/allotments" element={<Allotments />} />
            <Route
              path="transaction/fine-policies"
              element={<FinePolicies />}
            />
            <Route
              path="transaction/voucher-generations"
              element={<VoucherGenerations />}
            />
            <Route
              path="transaction/admin-vouchers"
              element={<AdminVouchers />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
