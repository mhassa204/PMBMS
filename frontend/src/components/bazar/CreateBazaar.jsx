import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import ImageField from "@components/commonComponents/ImageField";
import Breadcrumb from "@components/commonComponents/Breadcrumb";

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
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl  mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">Create Bazaar</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-4"
          >
            <InputField
              label="Bazaar Name"
              type="text"
              placeholder="Enter Bazaar Name"
              name="bazaarName"
              required
            />
            <InputField
              label="Bazaar Address"
              placeholder="Enter Bazaar Address"
              type="text"
              name="bazaarAddress"
              required
            />
            <Dropdown
              label="City"
              placeholder="Select City"
              name="city"
              options={cities}
              type="basic-single"
            />
            <InputField
              label="Approved Shops"
              type="number"
              placeholder="Enter number of approved shops"
              name="approvedShops"
              required="Number of approved shops is required"
              min={0}
            />
            <Dropdown
              label="Shop Type"
              placeholder="Select shop type"
              name="shopType"
              options={activeOptions}
              type="basic-single"
            />
            <div className="grid grid-cols-2 gap-x-4">
              <InputField
                label="Total Shops"
                placeholder="Enter total number of shops"
                type="number"
                name="totalShops"
                required="Total shops is required"
              />
              <InputField
                label="Base Rent"
                placeholder="Enter base rent"
                type="number"
                name="baseRent"
                required="Base rent is required"
              />
            </div>
            <InputField
              label="Prefix "
              type="text"
              name="prefix"
              required
              placeholder="Enter Prefix"
            />
            <Dropdown
              label="Zone"
              placeholder="Select a zone"
              name="zone"
              options={activeOptions}
              type="basic-single"
            />
            <InputField
              label="Zone Manager"
              placeholder="Zone manager"
              name="zoneManager"
              type="text"
              disabled={true}
            />
            <Dropdown
              label="Bazaar Manager"
              placeholder="Select Bazaar Manager"
              name="bazaarManager"
              options={activeOptions}
              type="basic-single"
            />
            <Dropdown
              label="Supervisor"
              placeholder="Select Supervisor"
              name="supervisor"
              options={activeOptions}
              type="basic-single"
            />

            <Dropdown
              label="Active"
              placeholder="Select Status"
              name="active-options"
              options={activeOptions}
              type="basic-single"
            />
            <ImageField label="Bazaar Image" name="bazaarImage" required />
            <div className="mt-5">
              <ButtonComponent type={"submit"} name={"Create Bazaar"} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateBazaar;
