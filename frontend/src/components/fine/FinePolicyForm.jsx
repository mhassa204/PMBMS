import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";

export default function FinePolicyForm() {
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

  const IncomeCategory = [
    {
      label: "Outlet",
      value: "Outlet",
    },
    {
      label: "Stall",
      value: "Stall",
    },
    {
      label: "Bazar",
      value: "Bazar",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Create Stall</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            label="Bazar Name"
            name="bazarName"
            type="text"
            required={true}
            placeholder="Enter bazar name"
          />
          <Dropdown
            label="Income Category"
            name="incomeCategory"
            type="basic-select"
            options={IncomeCategory}
            required={true}
            placeholder="Select an income category"
          />
          <InputField
            label="Fine Name"
            name="name"
            type="text"
            required={true}
            placeholder="Enter fine name"
          />
          <InputField
            label="Fine % After 10th Date"
            name="fine-10th"
            type="number"
            required={true}
            // minLength={1}
            // maxLength={100}
            placeholder="Enter fine % after 10th date"
          />
          <InputField
            label="Fine % After 20th Date"
            name="fine-20th"
            type="number"
            required={true}
            // minLength={1}
            // maxLength={100}
            placeholder="Enter fine % after 20th date"
          />
          <InputField
            label="Fine % After 25th Date"
            name="fine-25th"
            type="number"
            required={true}
            // minLength={1}
            // maxLength={100}
            placeholder="Enter fine % after 25th date"
          />
          <Dropdown
            label="Stall Status"
            name="stallStatus"
            type="basic-select"
            options={stallStatus}
            required={true}
            placeholder="Select a stall status"
          />
          <ButtonComponent name="Submit" type="submit" />
        </form>
      </FormProvider>
    </div>
  );
}
