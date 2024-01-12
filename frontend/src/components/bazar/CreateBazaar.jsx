import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import ImageField from "@components/commonComponents/ImageField";
import ShopTypeDropdown from "@components/commonComponents/ShopTypeDropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI } from "@hooks/postAPI";
import DateInput from "@components/commonComponents/DateInput";
import DateField from "@components/commonComponents/DateField";
import Select from "react-select";

const cities = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];

const activeOptions = [
  { value: "not-active", label: "Not Active" },
  { value: "active", label: "Active" },
  { value: "disabled", label: "Disabled" },
];

const shopType = [
  { value: "Outlets", label: "Outlets" },
  { value: "Stalls", label: "Stalls" },
  { value: "Masjids", label: "Masjids" },
  { value: "Foodcourt", label: "Food Courts" },
  { value: "Joyland", label: "Joy Land" },
];

const zone = [
  { value: "zone1", label: "Zone 1" },
  { value: "zone2", label: "Zone 2" },
  { value: "zone3", label: "Zone 3" },
  { value: "zone4", label: "Zone 4" },

  { value: "zone5", label: "Zone 5" },
];
const bazaarManager = [
  { value: "bazaarManager1", label: "Bazaar Manager 1" },
  { value: "bazaarManager2", label: "Bazaar Manager 2" },
  { value: "bazaarManager3", label: "Bazaar Manager 3" },
  { value: "bazaarManager4", label: "Bazaar Manager 4" },

  { value: "bazaarManager5", label: "Bazaar Manager 5" },
];
const supervisor = [
  { value: "supervisor1", label: "Supervisor 1" },
  { value: "supervisor2", label: "Supervisor 2" },
  { value: "supervisor3", label: "Supervisor 3" },
  { value: "supervisor4", label: "Supervisor 4" },

  { value: "supervisor5", label: "Supervisor 5" },
];

const areaType = [
  { value: "Marla", label: "Marla" },
  { value: "Canal", label: "Canal" },
];

const breadcrumbItems = [
  { label: "Bazar List", path: "/admin/bazar-list" },
  { label: "Create Bazar" },
];

const CreateBazaar = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state;
  const [remainingShops, setRemainingShops] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [shopData, setShopData] = useState([
    {
      shopType: "Shops",
      totalShops: 0,
      baseRent: 0,
    },
  ]);

  const handleShopTypeChange = (selectedOptions, index) => {
    setShopData((prevShopData) => {
      const updatedShopData = [...prevShopData];
      updatedShopData[index].shopType = selectedOptions
        ? selectedOptions.value
        : "";
      return updatedShopData;
    });
  };

  const handleTotal = (value, index) => {
    const totalShops = value ? parseInt(value, 10) : 0;
    setShopData((prevShopData) => {
      const updatedShopData = [...prevShopData];
      updatedShopData[index].totalShops = totalShops;
      return updatedShopData;
    });
  };

  const handleBaseRent = (value, index) => {
    setShopData((prevShopData) => {
      const updatedShopData = [...prevShopData];
      updatedShopData[index].baseRent = parseInt(value, 10);
      return updatedShopData;
    });
  };

  const handlePlusClick = () => {
    setShopData((prevShopData) => [
      ...prevShopData,
      {
        shopType: "Shops",
        totalShops: 0,
        baseRent: 0,
      },
    ]);
  };

  const calculateRemainingShops = () => {
    const approvedShopsValue = methods.watch("approvedShops");
    const approvedShops = approvedShopsValue
      ? parseInt(approvedShopsValue, 10)
      : 0;
    return shopData.reduce(
      (remaining, shop) => remaining - shop.totalShops,
      approvedShops
    );
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl  mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Update Bazaar" : "Create Bazaar"}
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h4 className="text-md text-start font-semibold mb-3">
              1. Basic Bazar Information
            </h4>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
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
                required
              />
              <InputField
                label="Prefix "
                type="text"
                name="prefix"
                required
                placeholder="Enter Prefix"
              />
              <Dropdown
                label="Area Unit"
                placeholder="Select a unit"
                name="areaType"
                options={areaType}
                type="basic-single"
                required={true}
              />
              <InputField
                label="Total Area"
                placeholder="Enter total area"
                type="number"
                name="area"
                required="Total area is required"
              />
              <DateField
                label="Date of Establishment"
                name="dateEstablished"
                required
              />
              <Dropdown
                label="Active"
                placeholder="Select Status"
                name="active-options"
                options={activeOptions}
                type="basic-single"
                required={true}
              />
            </div>
            <h4 className="text-md text-start font-semibold mb-3">
              2. Shops Information
            </h4>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Approved Shops"
                type="number"
                placeholder="Enter number of approved shops"
                name="approvedShops"
                required="Number of approved shops is required"
                min={0}
                onChange={(e) =>
                  methods.setValue("approvedShops", e.target.value)
                }
              />
              <div>
                <label className="block text-red-900 text-sm font-bold mb-2 text-start">
                  Remaining shops
                </label>
                <input
                  type="number"
                  disabled
                  value={calculateRemainingShops()}
                  readOnly
                  className="w-full h-[40px] border border-gray-900  p-2 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              {shopData.map((shop, index) => (
                <React.Fragment key={index}>
                  {/* <Dropdown
                  label={Shop Type}
                  placeholder={Select shop type}
                  name={shopType${index}}
                  options={shopType}
                  type="basic-single"
                  onChange={(selectedOptions) =>
                    handleShopTypeChange(selectedOptions, index)
                  }
                /> */}
                  <ShopTypeDropdown
                    label={"Shop Type"}
                    placeholder={"Select shop type"}
                    name={`shopType${index}`}
                    options={shopType}
                    handleChange={(selectedOptions) =>
                      handleShopTypeChange(selectedOptions, index)
                    }
                  />

                  <div className="flex gap-x-2">
                    <InputField
                      label={`Total ${shop.shopType}`}
                      placeholder={"Enter total number of shops"}
                      type="number"
                      name={`totalShops${index}`}
                      required={"Total shops is required"}
                      onChange={(e) => handleTotal(e.target.value, index)}
                    />
                    <InputField
                      label={"Base Rent"}
                      placeholder={"Enter base rent"}
                      type="number"
                      name={`baseRent${index}`}
                      required={"Base rent is required"}
                      onChange={(e) => handleBaseRent(e.target.value, index)}
                    />
                  </div>
                </React.Fragment>
              ))}

              <div className="flex items-center">
                <div
                  className="border h-[39px] w-[38px] mt-[3px] rounded flex items-center justify-center hover:bg-gray-200 "
                  onClick={handlePlusClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    dataSlot="icon"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h4 className="text-md text-start font-semibold mb-3">
              3. Management Information
            </h4>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <Dropdown
                label="Zone"
                placeholder="Select a zone"
                name="zone"
                options={zone}
                required={true}
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
                options={bazaarManager}
                type="basic-single"
                required={true}
              />
              <Dropdown
                label="Supervisor"
                placeholder="Select Supervisor"
                name="supervisor"
                options={supervisor}
                type="basic-single"
                required={true}
              />
            </div>
            <ImageField label="Bazaar Image" name="bazaarImage" required />

            <div className="mt-5">
              <ButtonComponent
                type={"submit"}
                name={isEditMode ? "Update Bazaar" : "Create Bazaar"}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateBazaar;
