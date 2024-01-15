import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import DateInput from "@components/commonComponents/DateInput";

export default function VoucherCreation() {
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

  const months = [
    {
      label: "January",
      value: "January",
    },
    {
      label: "February",
      value: "February",
    },
    {
      label: "March",
      value: "March",
    },
    {
      label: "April",
      value: "April",
    },
    {
      label: "May",
      value: "May",
    },
    {
      label: "June",
      value: "June",
    },
    {
      label: "July",
      value: "July",
    },
    {
      label: "August",
      value: "August",
    },
    {
      label: "September",
      value: "September",
    },
    {
      label: "October",
      value: "October",
    },
    {
      label: "November",
      value: "November",
    },
    {
      label: "December",
      value: "December",
    },
  ];

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
  const duplicate = [
    {
      label: "True",
      value: "True",
    },
    {
      label: "False",
      value: "False",
    },
  ];

  return (
    // <div className="max-w-3xl mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
    //   <h1 className="text-2xl font-bold textBlue">Voucher Creation</h1>
    //   <FormProvider {...methods}>
    //     <form onSubmit={methods.handleSubmit(onSubmit)}>
    //       <div
    //         className="grid
    //         grid-cols-2
    //         gap-4"
    //       >
    //         <InputField
    //           label="Voucher Name"
    //           type="text"
    //           name="voucherName"
    //           placeholder="Voucher Name"
    //           required
    //         />
    //         <InputField
    //           label="Voucher Code"
    //           type="text"
    //           name="voucherCode"
    //           placeholder="Voucher Code"
    //           required
    //         />
    //       </div>
    //       <InputField
    //         label="Voucher Value"
    //         type="number"
    //         name="voucherValue"
    //         placeholder="Voucher Value"
    //         required
    //       />
    //       <InputField
    //         label="Voucher Quantity"
    //         type="number"
    //         name="voucherQuantity"
    //         placeholder="Voucher Quantity"
    //         required
    //       />
    //     </form>
    //   </FormProvider>
    // </div>
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Voucher Creation</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h4 className="text-md text-start font-semibold mb-3">
            1. Date & Amount Information
          </h4>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            {/* <InputField
              label="Voucher Type"
              type="text"
              name="voucherType"
              placeholder="Enter voucher type"
              required
            /> */}
            <Dropdown
              label="Month"
              name="month"
              options={months}
              placeholder="Select a month"
              required
            />
            <DateInput
              label="Start Date"
              name="startDate"
              placeholder="Select start date"
              required
            />
            <DateInput
              label="Due Date"
              name="dueDate"
              placeholder="Select end date"
              required
            />
          </div>
          <h4 className="text-md text-start font-semibold mb-3">
            2. Shop & Shop Holder Information
          </h4>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <Dropdown
              label="Zone"
              name="zone"
              options={incomeCategory}
              placeholder="Select a zone"
              required
            />
            <Dropdown
              label="Bazar"
              name="bazar"
              options={incomeCategory}
              placeholder="Select a bazar"
              required
            />
            <Dropdown
              label="Shop"
              name="shop"
              options={incomeCategory}
              placeholder="Select a shop"
              required
            />
            <Dropdown
              label="Shop Holder"
              name="shopHolder"
              options={incomeCategory}
              placeholder="Select a shop holder"
              required
            />
            <Dropdown
              label="Income Category"
              name="incomeCategory"
              options={incomeCategory}
              placeholder="Select an income category"
              required
            />
            <Dropdown
              label="Shop Type"
              name="shopType"
              options={stallType}
              placeholder="Select a shop type"
              required
            />
          </div>
          <h4 className="text-md text-start font-semibold mb-3">
            3. Account & Fine Information
          </h4>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <InputField
              label="Amount"
              type="number"
              name="amount"
              placeholder="Enter an amount"
              required
            />
            <InputField
              label="Waiver"
              type="number"
              name="waiver"
              placeholder="Enter a waiver"
              required
            />
          </div>
          <h4 className="text-md text-start font-semibold mb-3">
            4. Payment Information
          </h4>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <InputField
              label="Bank Voucher Number"
              type="text"
              name="bankVoucherNumber"
              placeholder="Enter bank voucher number"
              required
            />
            <DateInput
              label="Paid Date"
              name="paidDate"
              placeholder="Select a paid date"
              required
            />
            <InputField
              label="Paid Amount"
              type="number"
              name="paidAmount"
              placeholder="Enter paid amount"
              required
            />
            <Dropdown
              label="Duplicate"
              name="duplicate"
              options={duplicate}
              placeholder="Select a duplicate"
              required
            />
            <InputField
              label="Reconsile"
              type="text"
              name="reconsile"
              placeholder="Enter reconsile"
              required
            />
            <InputField
              label="Narration"
              type="text"
              name="narration"
              placeholder="Enter narration"
              required
            />
          </div>
          <ButtonComponent name="Submit" type="submit" />
        </form>
      </FormProvider>
    </div>
  );
}
