import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const cities = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];

const activeOptions = [
  { value: "not-active", label: "Not Active" },
  { value: "active", label: "Active" },
];
const breadcrumbItems = [
  { label: "Bazar List", path: "/admin/bazar-list" },
  { label: "Create Bazar" },
];

const CreateBazaar = () => {
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
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white border textBlue">
        <h2 className="text-2xl text- m font-semibold mb-5">Create Bazaar</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="bazarName"
            >
              Bazaar Name
            </label>
            <input
              type="text"
              id="bazarName"
              className="w-full border p-2 rounded"
              {...register("bazarName", {
                required: "Bazaar Name is required",
              })}
            />
            {errors.bazarName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bazarName.message}
              </p>
            )}
          </div>
          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="bazaarAddress"
            >
              Bazaar Address
            </label>
            <input
              type="text"
              id="bazaarAddress"
              className="w-full border p-2 rounded"
              {...register("bazaarAddress", {
                required: "Bazaar Address is required",
              })}
            />
            {errors.bazaarAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bazaarAddress.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
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

          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="baseRent"
            >
              Permanent Base Rent
            </label>
            <input
              type="text"
              id="baseRent"
              className="w-full border p-2 rounded"
              {...register("baseRent", {
                required: "Base Rent is required",
                pattern: {
                  value: /\d+/,
                  message: "Base rent can only be in numbers",
                },
              })}
            />
            {errors.baseRent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.baseRent.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="prefix"
            >
              Prefix
            </label>
            <input
              type="text"
              id="prefix"
              className="w-full border p-2 rounded"
              {...register("prefix", {
                required: "Prefix is required",
              })}
            />
            {errors.prefix && (
              <p className="text-red-500 text-sm mt-1">
                {errors.prefix.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="totalStalls"
            >
              Total Stalls
            </label>
            <input
              type="text"
              id="totalStalls"
              className="w-full border p-2 rounded"
              {...register("totalStalls", {
                required: "Total Stalls is required",
                pattern: {
                  value: /\d+/,
                  message: "Total Stalls can only be in numbers",
                },
              })}
            />
            {errors.totalStalls && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalStalls.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="zoneManager"
            >
              Zone Manager
            </label>

            <Select
              id="zoneManager"
              options={cities}
              {...register("zoneManager", {
                required: "Zone Manager is required",
              })}
              onChange={(selectedOption) => {
                setValue("zoneManager", selectedOption);
                trigger("zoneManager");
              }}
              className="text-start"
            />
            {errors.zoneManager && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zoneManager.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="bazaarManager"
            >
              Bazaar Manager
            </label>

            <Select
              id="bazaarManager"
              options={cities}
              {...register("bazaarManager", {
                required: "Bazaar Manager is required",
              })}
              onChange={(selectedOption) => {
                setValue("bazaarManager", selectedOption);
                trigger("bazaarManager");
              }}
              className="text-start"
            />
            {errors.bazaarManager && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bazaarManager.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start textBlue"
              htmlFor="supervisor"
            >
              Supervisor
            </label>

            <Select
              id="supervisor"
              options={cities}
              {...register("supervisor", {
                required: "Supervisor is required",
              })}
              onChange={(selectedOption) => {
                setValue("supervisor", selectedOption);
                trigger("supervisor");
              }}
              className="text-start"
            />
            {errors.supervisor && (
              <p className="text-red-500 text-sm mt-1">
                {errors.supervisor.message}
              </p>
            )}
          </div>

          <div className=" col-span-2 lg:col-span-1">
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

          <div className=" col-span-2 mt-[-19px] flex justify-center">
            <ButtonComponent name={"Create Bazar"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBazaar;
