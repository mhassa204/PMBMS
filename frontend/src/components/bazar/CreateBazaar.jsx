import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import ImageField from "@components/commonComponents/ImageField";

const cities = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];

const activeOptions = [
  { value: "not-active", label: "Not Active" },
  { value: "active", label: "Active" },
];

const CreateBazaar = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Create Bazaar</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <InputField
            label="Bazaar Name"
            type="text"
            name="bazaarName"
            required
          />
          <InputField
            label="Bazaar Address"
            type="text"
            name="bazaarAddress"
            required
          />

          <Dropdown
            label="City"
            name="city"
            options={cities}
            type="basic-single"
          />
          <InputField
            label="Permanent Base Rent"
            type="text"
            name="permanentBaseRent"
            required="Permanent Base Rent is required"
            pattern={{
              value: /\d+/,
              message: "Base rent can only be in numbers",
            }}
          />

          <InputField label="Prefix " type="text" name="prefix" required />

          <InputField
            label="Total Stalls"
            type="text"
            name="totalStalls"
            required="Total Stalls is required"
            pattern={{
              value: /\d+/,
              message: "Total Stalls can only be in numbers",
            }}
          />
          <Dropdown
            label="Zone Manager"
            name="zoneManager"
            options={activeOptions}
            type="basic-single"
          />
          <Dropdown
            label="Bazaar Manager"
            name="bazaarManager"
            options={activeOptions}
            type="basic-single"
          />
          <Dropdown
            label="Supervisor"
            name="supervisor"
            options={activeOptions}
            type="basic-single"
          />

          <Dropdown
            label="Active"
            name="active-options"
            options={activeOptions}
            type="basic-single"
          />

          <ImageField label="Bazaar Image" name="bazaarImage" required />
          <div className="mt-8">
            <ButtonComponent type={"submit"} name={"Create Bazaar"} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateBazaar;
