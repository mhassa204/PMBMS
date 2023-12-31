import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import PasswordField from "@components/commonComponents/PasswordField";

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

const CreateUser = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Create User</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <InputField label="User Name" type="text" name="userName" required />
          <PasswordField
            label="Password"
            name="password"
            required
            minLength={6}
            maxLength={20}
          />
          <Dropdown
            label="User Type"
            name="userType"
            options={cities}
            type="basic-single"
          />

          <Dropdown
            label="City"
            name="city"
            options={cities}
            type="basic-single"
          />
          <InputField
            label="Email"
            type="text"
            name="email"
            required="Email is required"
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            }}
          />

          <InputField
            label=" Mobile Number"
            type="text"
            name="mobileNumber"
            required
          />
          <Dropdown
            label="Active"
            name="active-options"
            options={activeOptions}
            type="basic-single"
          />

          <ButtonComponent type={"submit"} name={"Create Bazaar"} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateUser;
