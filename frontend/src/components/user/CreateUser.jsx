import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import PasswordField from "@components/commonComponents/PasswordField";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import City from "../../City.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postAPI } from "@hooks/postAPI";

const userTypes = [
  { value: "SuperAdmin", label: "Super Admin" },
  { value: "Admin", label: "Admin" },
  { value: "ZoneManager", label: "Zone Manager" },
  { value: "BazarManager", label: "Bazar Manager" },
  { value: "Supervisor", label: "Supervisor" },
];
const activeOptions = [
  { value: "inactive", label: "Not Active" },
  { value: "active", label: "Active" },
  { value: "disabled", label: "Disabled" },
];

const breadcrumbItems = [
  { label: "User List", path: "/admin/user-list" },
  { label: "Create User" },
];

const CreateUser = ({ pageTitle }) => {
  const navigate = useNavigate();
  const methods = useForm();
  const [pageTitle1, setPageTitle] = useState(pageTitle || "Create User");

  const onSubmit = async (data) => {
    const d = await postAPI("users", data);
    if (d.success) {
      navigate("/admin/user-list");
    } else {
      console.log("Error in creating user. ", d.error);
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-3xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">Create User</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-4"
          >
            <InputField
              label="Email"
              type="text"
              name="email"
              placeholder="Enter Email"
              required="Email is required"
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              }}
            />
            <InputField
              label="Username"
              type="text"
              name="userName"
              placeholder="Enter username"
              required
            />
            <PasswordField
              label="Password"
              name="password"
              placeholder="Enter Password"
              required
              minLength={6}
              maxLength={20}
            />
            <Dropdown
              label="City"
              name="city"
              placeholder="Select City"
              options={City}
              searchable={true}
              type="basic-single"
            />
            <InputField
              label=" Mobile Number"
              placeholder="Enter Mobile Number"
              type="text"
              name="mobileNumber"
              required
            />
            <Dropdown
              label="User Type"
              placeholder="Select User Type"
              name="userType"
              options={userTypes}
              type="basic-single"
            />
            <Dropdown
              label="Active"
              placeholder="Select Status"
              name="status"
              options={activeOptions}
              type="basic-single"
            />
            <div className="mt-5">
              <ButtonComponent type={"submit"} name={"Create User"} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateUser;
