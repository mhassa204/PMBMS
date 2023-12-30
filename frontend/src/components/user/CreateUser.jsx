import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
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
  { label: "Create user" },
];

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-md mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">Create User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border p-2 rounded"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border p-2 rounded"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be greater than 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="userType"
            >
              User Type
            </label>
            <Select
              id="userType"
              options={userTypes}
              {...register("userType", { required: "User Type is required" })}
              onChange={(selectedOption) => {
                setValue("userType", selectedOption);
                trigger("userType");
              }}
              className="text-start"
            />
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userType.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="city"
            >
              City
            </label>

            <Select
              id="city"
              options={cities}
              {...register("city", { required: "City is required" })}
              onChange={(selectedOption) => {
                setValue("city", selectedOption);
                trigger("city");
              }}
              className="text-start"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border p-2 rounded"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="w-full border p-2 rounded"
              {...register("mobileNumber", {
                required: "Mobile Number is required",
              })}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="active"
            >
              Active
            </label>
            <Select
              id="active"
              options={activeOptions}
              {...register("active", { required: "Active status is required" })}
              onChange={(selectedOption) => {
                setValue("active", selectedOption);
                trigger("active");
              }}
              className="text-start"
            />
            {errors.active && (
              <p className="text-red-500 text-sm mt-1">
                {errors.active.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
