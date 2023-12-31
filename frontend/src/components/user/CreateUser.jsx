import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import PasswordField from "@components/commonComponents/PasswordField";
import Breadcrumb from "@components/commonComponents/Breadcrumb";

const cities = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];

const userTypes = [
  { value: "supervisor", label: "Supervisor" },
  { value: "bazar-manager", label: "Bazar Manager" },
  { value: "admin", label: "Admin" },
  { value: "super-admin", label: "Super Admin" },
  { value: "zone-manager", label: "Zone Manager" },
];

const activeOptions = [
  { value: "not-active", label: "Not Active" },
  { value: "active", label: "Active" },
];

const breadcrumbItems = [
  { label: "User List", path: "/admin/user-list" },
  { label: "Create User" },
];

const CreateUser = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
              label="User Type"
              placeholder="Select User Type"
              name="userType"
              options={cities}
              type="basic-single"
            />

            <Dropdown
              label="City"
              name="city"
              placeholder="Select City"
              options={cities}
              type="basic-single"
            />
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
              label=" Mobile Number"
              placeholder="Enter Mobile Number"
              type="text"
              name="mobileNumber"
              required
            />
            <Dropdown
              label="Active"
              placeholder="Select Status"
              name="active-options"
              options={activeOptions}
              type="basic-single"
            />
            <div className="mt-5">
              <ButtonComponent type={"submit"} name={"Create Bazaar"} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateUser;
