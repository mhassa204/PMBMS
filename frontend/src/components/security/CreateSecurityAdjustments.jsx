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
    label: "Security Adjustment List",
    path: "/admin/transaction/security-adjustments",
  },
  { label: "Create Security Adjustment" },
];

const CreateSecurityAdjustments = () => {
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
    console.log("Security adjustment data: ", data);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl  mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode
            ? "Update Security Adjustment"
            : "Create Security Adjustment"}
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <DateField
                label="Security Adjustment Date"
                name="securityAdjustmentDate"
                required
              />
              <Dropdown
                label="Zone"
                placeholder="Select a zone"
                name="zone"
                options={zone}
                required={true}
                handleChange={(e) => {
                  console.log("hi: ", e, zonesData);
                }}
                type="basic-single"
              />
              <Dropdown
                label="Bazar"
                placeholder="Select a bazar"
                name="bazar"
                options={bazaar}
                required={true}
                type="basic-single"
              />
              <Dropdown
                label="Stall Holder Name"
                placeholder="Select a stall holder"
                name="stallHolder"
                options={zone}
                required={true}
                type="basic-single"
              />
              <Dropdown
                label="Arrear Vouchers"
                placeholder="Select voucher"
                name="arrearVoucher"
                options={zone}
                required={true}
                type="basic-single"
              />
              <InputField
                label="Arrear Voucher Amount"
                placeholder="Arrear Voucher Amount"
                name="arrearVoucherAmount"
                type="text"
                required={"Arrear Voucher Amount is required"}
              />
              <InputField
                label="Cash Refund Amount"
                placeholder="Cash Refund Amount"
                name="cashRefundAmount"
                type="text"
                required={"Cash Refund Amount is required"}
              />
            </div>

            <div className="mt-5">
              <ButtonComponent
                type={"submit"}
                name={
                  isEditMode
                    ? "Update Security Adjustment"
                    : "Create Security Adjustment"
                }
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateSecurityAdjustments;
