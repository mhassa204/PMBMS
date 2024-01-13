import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import DateField from "@components/commonComponents/DateField";
import ImageField from "@components/commonComponents/ImageField";
import Breadcrumb from "@components/commonComponents/Breadcrumb";

export default function CreateStallHolder() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const activeOptions = [
    { value: "Not Active", label: "Not Active" },
    { value: "Active", label: "Active" },
    { value: "Disabled", label: "Disabled" },
  ];

  const breadcrumbItems = [
    { label: "Shop Holder List", path: "/admin/basic/shop-holders" },
    { label: "Create Shop Holder" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">Create Shop Holder</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-4"
          >
            <InputField
              label="Shop Holder Name"
              type="text"
              placeholder="Enter shop Holder Name"
              name="shopHolderName"
              required
            />
            <InputField
              label="Father/Husband Name"
              placeholder="Enter Father/Husband Name"
              type="text"
              name="fatherName"
              required
            />
            <InputField
              label="Email"
              placeholder="Enter Email"
              type="text"
              name="email"
              required="Email is required"
              pattern={{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              }}
            />

            <DateField label="DOB" name="dob" required />
            <InputField
              label="CNIC"
              type="text"
              name="cnic"
              required
              placeholder="Enter CNIC"
            />
            <DateField label="CNIC Expiry" name="expiry" required />

            <Dropdown
              label="Gender"
              name="gender"
              placeholder="Select Gender"
              options={genders}
              type="basic-single"
            />
            <InputField
              label="Permanent Address"
              placeholder="Enter Permanent Address"
              type="text"
              name="permanentAddress"
              required
            />

            <InputField
              label="Temporary Address"
              placeholder="Enter Temporary Address"
              type="text"
              name="temporaryAddress"
              required
            />

            <InputField
              label="Primary Contact"
              placeholder="Enter Primary Contact"
              type="text"
              name="primaryContact"
              required
            />

            <InputField
              label="Secondary Contact"
              placeholder="Enter Secondary Contact"
              type="text"
              name="secondaryContact"
              required
            />
            <InputField
              label="Application Ref #"
              type="text"
              name="refNo"
              placeholder="Enter Application Ref #"
            />

            <InputField
              label="Remarks"
              type="text"
              name="remarks"
              required
              placeholder="Enter Remarks"
            />
            <InputField
              label="Referred By"
              placeholder="Enter Referral"
              type="text"
              name="reference"
              required
            />

            <InputField
              label="Profession "
              placeholder="Enter Profession"
              type="text"
              name="profession"
              required
            />
            <Dropdown
              label="Blacklist"
              name="blacklist"
              options={activeOptions}
              type="basic-single"
            />

            <ImageField label="CNICFrontImage" name="CNICFrontImage" required />
            <ImageField label="CNIC Back Image" name="CNICBackImage" required />
            <ImageField label="Picture" name="Picture" required />
            <ImageField
              label="Biometric Image"
              name="BiometricImage"
              required
            />

            <Dropdown
              label="Active"
              name="active-options"
              placeholder="Select Status"
              options={activeOptions}
              type="basic-single"
            />
            <div className="mt-5">
              <ButtonComponent type={"submit"} name={"Create Zone"} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
