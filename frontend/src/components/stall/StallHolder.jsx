import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import DateField from "@components/commonComponents/DateField";
import ImageField from "@components/commonComponents/ImageField";

export default function StallHolder() {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const activeOptions = [
    { value: "not-active", label: "Not Active" },
    { value: "active", label: "Active" },
  ];

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
      <h2 className="text-2xl font-semibold mb-4">Create Stall Holder</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <InputField
            label="Stall Holder Name"
            type="text"
            name="stallHolderName"
            required
          />
          <InputField
            label="Father/Husband Name"
            type="text"
            name="fatherName"
            required
          />
          <InputField
            label="Email"
            type="text"
            name="email"
            required="Email is required"
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            }}
          />

          <DateField label="DOB" name="dob" required />
          <InputField label="CNIC" type="text" name="cnic" required />
          <DateField label="CNIC Expiry" name="expiry" required />

          <Dropdown
            label="Gender"
            name="gender"
            options={genders}
            type="basic-single"
          />
          <InputField
            label="Permanent Address"
            type="text"
            name="permanentAddress"
            required
          />

          <InputField
            label="Temporary Address"
            type="text"
            name="temporaryAddress"
            required
          />

          <InputField
            label="Primary Contact"
            type="text"
            name="primaryContact"
            required
          />

          <InputField
            label="Secondary Contact"
            type="text"
            name="secondaryContact"
            required
          />
          <InputField label="Application Ref #" type="text" name="refNo" />

          <InputField label="Remarks" type="text" name="remarks" required />
          <InputField
            label="Referred By"
            type="text"
            name="reference"
            required
          />

          <InputField
            label="Profession "
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
          <ImageField label="Biometric Image" name="BiometricImage" required />

          <Dropdown
            label="Active"
            name="active-options"
            options={activeOptions}
            type="basic-single"
          />
          <div className="mt-8">
            <ButtonComponent type={"submit"} name={"Create Zone"} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
