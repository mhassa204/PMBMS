import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";

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

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Create Stall</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField label="Stall Name" type="text" name="name" required />
          <InputField label="Stall Code" type="text" name="code" required />
          <InputField name="bazar" label="Bazar Name" type="text" required />
          <Dropdown
            label="Stall Category"
            name="category"
            options={category}
            type="basic-single"
            required
          />
          <Dropdown
            label="Stall Type"
            name="type"
            options={stallType}
            type="basic-multi-select"
            searchable={false}
            required
          />
          <InputField label="Stall Size" type="text" name="size" required />
          <Dropdown
            label="Status"
            name="status"
            options={stallStatus}
            searchable={true}
            required
          />
          <Dropdown name="fine" label="Fine" options={fine} required />
          <InputField name="rent" label="Monthly Rent" type="number" required />
          <ButtonComponent type={"submit"} name={"Create Stall"} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStall;
