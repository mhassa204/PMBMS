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
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-3xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl text-start font-semibold mb-4">Create Stall</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Stall Name"
              placeholder="Enter stall name"
              type="text"
              name="name"
              required
            />
            <InputField
              label="Stall Code"
              placeholder="Enter stall code"
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
              label="Stall Category"
              name="category"
              options={category}
              type="basic-single"
              searchable={false}
              placeholder="Select a stall category"
              required
            />
            <Dropdown
              label="Stall Type"
              name="type"
              options={stallType}
              type="basic-multi-select"
              searchable={false}
              placeholder="Select a stall type"
              required
            />
            <InputField
              label="Stall Size"
              placeholder="Enter stall size"
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
            <ButtonComponent type={"submit"} name={"Create Stall"} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateStall;
