import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import DateInput from "@components/commonComponents/DateInput";
import Dropdown from "@components/commonComponents/Dropdown";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Breadcrumb from "@components/commonComponents/Breadcrumb";

export default function VoucherGeneration() {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const incomeCategory = [
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

  //   const breadcrumbItems = [
  //     { label: "Bazar List", path: "/admin/bazar-list" },
  //     { label: "Voucher Generation" },
  //   ];

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Voucher Generation</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DateInput
            label="Voucher Month"
            name="voucherMonth"
            placeholder="Select voucher month"
            required={true}
          />
          <Dropdown
            label="Income Category"
            name="incomeCategory"
            options={incomeCategory}
            placeholder="Select an income category"
            required
          />
          <Dropdown
            label="Stall Type"
            name="stallType"
            options={stallType}
            placeholder="Select a stall type"
            required
          />
          <DateInput
            label="Due Date"
            name="dueDate"
            placeholder="Select due date"
            required
          />
          <ButtonComponent name="Submit" label="Generate Voucher" />
        </form>
      </FormProvider>
    </div>
  );
}
