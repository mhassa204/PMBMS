import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import DateField from "@components/commonComponents/DateField";
import ImageField from "@components/commonComponents/ImageField";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import { useLocation } from "react-router-dom";
import { formatDate } from "@utils/formatDate";

export default function CreateStallHolder() {
  const methods = useForm();
  const location = useLocation();
  const isEditMode = location.state.edit;
  const data = location.state.data;

  useEffect(() => {
    if (isEditMode) {
      methods.reset(data);
    }
  }, []);

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
    { value: "Blocked", label: "Blocked" },
  ];

  const blacklist = [
    { value: "True", label: "True" },
    { value: "False", label: "False" },
  ];

  const breadcrumbItems = [
    { label: "Shop Holder List", path: "/admin/basic/shop-holders" },
    { label: isEditMode ? "Update Shop Holder" : "Create Shop Holder" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Update Shop Holder" : "Create Shop Holder"}
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-4"
          >
            <InputField
              label="Shop Holder Name"
              type="text"
              placeholder="Enter shop Holder Name"
              name="name"
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

            <DateField
              label="DOB"
              value={formatDate(data.DOB)}
              name="DOB"
              required
            />
            <InputField
              label="CNIC"
              type="text"
              name="cnic"
              required
              placeholder="Enter CNIC"
            />
            <DateField
              label="CNIC Expiry"
              value={formatDate(data.cnicExpiry)}
              name="cnicExpiry"
              required
            />

            <Dropdown
              label="Gender"
              name="gender"
              placeholder="Select Gender"
              options={genders}
              value={
                data && {
                  value: data.gender,
                  label: data.gender,
                }
              }
              type="basic-single"
            />
            <InputField
              label="Permanent Address"
              placeholder="Enter Permanent Address"
              type="text"
              name="address"
              required
            />

            <InputField
              label="Temporary Address"
              placeholder="Enter Temporary Address"
              type="text"
              name="secondaryAddress"
              required
            />

            <InputField
              label="Primary Contact"
              placeholder="Enter Primary Contact"
              type="text"
              name="contactNumber"
              required
            />

            <InputField
              label="Secondary Contact"
              placeholder="Enter Secondary Contact"
              type="text"
              name="secondaryContactNumber"
              required
            />
            <InputField
              label="Application Ref #"
              type="text"
              name="applicationReference"
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
              name="referredBy"
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
              placeholder="Select an option"
              options={blacklist}
              value={
                data && {
                  value: data.blacklist,
                  label: data.blacklist,
                }
              }
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
              label="Status"
              name="status"
              placeholder="Select status"
              options={activeOptions}
              value={
                data && {
                  value: data.status,
                  label: data.status,
                }
              }
              type="basic-single"
            />
            <div className="mt-5">
              <ButtonComponent
                type={"submit"}
                name={isEditMode ? "Update Shop Holder" : "Create Shop Holder"}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
