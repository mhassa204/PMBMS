import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";

const CreateStall = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const stallStatus = [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Inactive",
      value: "Inactive",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Suspended",
      value: "Suspended",
    },
    {
      label: "Deleted",
      value: "Deleted",
    },
    {
      label: "Rejected",
      value: "Rejected",
    },
    {
      label: "Blocked",
      value: "Blocked",
    },
    {
      label: "Approved",
      value: "Approved",
    },
    {
      label: "Expired",
      value: "Expired",
    },
    {
      label: "Cancelled",
      value: "Cancelled",
    },
    {
      label: "Completed",
      value: "Completed",
    },
  ];

  const category = [
    {
      label: "Food",
      value: "Food",
    },
    {
      label: "Clothing",
      value: "Clothing",
    },
    {
      label: "Electronics",
      value: "Electronics",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];

  const fine = [
    {
      label: "True",
      value: "True",
    },
    {
      label: "False",
      value: "False",
    },
  ];

  const stallType = [
    {
      label: "Permanent",
      value: "Permanent",
    },
    {
      label: "Temporary",
      value: "Temporary",
    },
  ];

  const breadcrumbItems = [
    { label: "Stall List", path: "/admin/stall-list" },
    { label: "Create Stall" },
  ];

  return (
    <div className="p-4">
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl text-start font-semibold mb-4">Create Shop</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Shop Name"
              placeholder="Enter shop name"
              type="text"
              name="name"
              required
            />
            <InputField
              label="Shop Code"
              placeholder="Enter shop code"
              type="text"
              name="code"
              required
            />
            <InputField
              name="bazar"
              placeholder="Enter bazar name"
              label="Bazar Name"
              type="text"
              required
            />
            <Dropdown
              label="Shop Category"
              name="category"
              options={category}
              type="basic-single"
              searchable={false}
              placeholder="Select a shop category"
              required
            />
            <Dropdown
              label="Shop Type"
              name="type"
              options={stallType}
              type="basic-multi-select"
              searchable={false}
              placeholder="Select a shop type"
              required
            />
            <InputField
              label="Shop Size"
              placeholder="Enter shop size"
              type="text"
              name="size"
              required
            />
            <Dropdown
              label="Status"
              name="status"
              options={stallStatus}
              searchable={true}
              placeholder="Select a status"
              required
            />
            <Dropdown
              name="fine"
              placeholder="Select a fine"
              label="Fine"
              options={fine}
              required
            />
            <InputField
              name="rent"
              placeholder="Enter monthly rent"
              label="Monthly Rent"
              type="number"
              required
            />
            <ButtonComponent type={"submit"} name={"Create Shop"} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateStall;
