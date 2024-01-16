import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import ShopTypeDropdown from "@components/commonComponents/ShopTypeDropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import DateField from "@components/commonComponents/DateField";
import Cities from "@src/City.json";
import { postAPI } from "@hooks/postAPI";
import { getAPIData } from "@hooks/getAPIData";
import ImageField from "@components/commonComponents/ImageField";

const activeOptions = [
  { value: "not-active", label: "Not Active" },
  { value: "active", label: "Active" },
  { value: "disabled", label: "Disabled" },
];

// const shopType = [
//   { value: "Outlets", label: "Outlets" },
//   { value: "Stalls", label: "Stalls" },
//   { value: "Masjids", label: "Masjids" },
//   { value: "Foodcourt", label: "Food Courts" },
//   { value: "Joyland", label: "Joy Land" },
// ];

// const zone = [
//   { value: "zone1", label: "Zone 1" },
//   { value: "zone2", label: "Zone 2" },
//   { value: "zone3", label: "Zone 3" },
//   { value: "zone4", label: "Zone 4" },

//   { value: "zone5", label: "Zone 5" },
// ];
const bazaar = [
  { value: "bazaar1", label: "Bazaar 1" },
  { value: "bazaar2", label: "Bazaar 2" },
  { value: "bazaar3", label: "Bazaar 3" },
  { value: "bazaar4", label: "Bazaar 4" },

  { value: "bazaar5", label: "Bazaar 5" },
];
// const supervisor = [
//   { value: "supervisor1", label: "Supervisor 1" },
//   { value: "supervisor2", label: "Supervisor 2" },
//   { value: "supervisor3", label: "Supervisor 3" },
//   { value: "supervisor4", label: "Supervisor 4" },

//   { value: "supervisor5", label: "Supervisor 5" },
// ];

const areaType = [
  { value: "Marla", label: "Marla" },
  { value: "Canal", label: "Canal" },
];

const breadcrumbItems = [
  {
    label: "Allotment List",
    path: "/admin/transaction/allotments",
  },
  { label: "Create Allotment" },
];

const CreateAllotment = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [zone, setZone] = useState([]);
  const [zonesData, setZonesData] = useState([]);
  const isEditMode = location.state;

  useEffect(() => {
    const getZones = async () => {
      const zones = await getAPIData("zones/zone");
      if (zones.success) {
        const zoneData = zones.data.zones.map((zone) => ({
          value: zone.zoneName,
          label: zone.zoneName,
        }));
        setZone(zoneData);
        setZonesData(zones.data.zones);
        // console.log('zones')
      } else {
        console.log("error: ", zones.error);
      }
    };
    getZones();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const d = await getAPIData("users/user");

      getData();
    };
  });
  const onSubmit = (data) => {
    console.log("Allotment Data", data);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl  mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Update Allotment" : "Create Allotment"}
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <DateField label="Allotment Date" name="allotmentDate" required />

              <InputField
                label="Stall Holder Name"
                placeholder="Enter Stall holder"
                name="stallHolder"
                type="text"
                required={"Stall Holder Name is required"}
              />

              <InputField
                label="Father Name"
                placeholder="Enter Father Name"
                name="fatherName"
                type="text"
                required={"Father Name is required"}
              />

              <Dropdown
                label="Shop Type"
                placeholder="Select type"
                name="shopType"
                options={zone}
                required={true}
                type="basic-single"
              />
              <InputField
                label="Stall Rent"
                placeholder="Enter Stall Rent"
                name="rent"
                type="number"
                min={0}
                required={"Stall Rent is required"}
              />

              <Dropdown
                label="Shop Category"
                placeholder="Select category"
                name="shopCategory"
                options={zone}
                required={true}
                type="basic-single"
              />

              <DateField
                label="Agreement Start Date"
                name="agreementStartDate"
                required
              />
              <DateField
                label="Agreement End Date"
                name="agreementEndDate"
                required
              />
              <ImageField
                label="Agreement Copy 1"
                name="agreementCopy1"
                required
              />
              <ImageField
                label="Agreement Copy 2"
                name="agreementCopy2"
                required
              />
              <ImageField
                label="Agreement Copy 3"
                name="agreementCopy3"
                required
              />
            </div>

            <div className="mt-5">
              <ButtonComponent
                type={"submit"}
                name={isEditMode ? "Update Allotment" : "Create Allotment"}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateAllotment;
