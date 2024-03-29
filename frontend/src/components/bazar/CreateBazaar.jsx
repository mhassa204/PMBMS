import React, { useEffect, useRef, useState } from "react";
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
import activeOptions from "@data/active.json";

const CreateBazaar = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location?.state?.edit;
  const data = location?.state?.data;
  const [zoneManager, setZoneManager] = useState("");
  const [bazarManagers, setBazarManagers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [zone, setZone] = useState([]);
  const [zonesData, setZonesData] = useState([]);
  const [shopType, setShopType] = useState([]);
  const isAvailable = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("prefix", data.prefix);
      setValue("address", data.address);
      setValue("city", data.city);
      setValue("areaUnit", data.areaUnit);
      setValue("area", data.area);
      setValue("dateOfEstablishment", data.dateOfEstablishment);
      setValue("active", data.active);
      setValue("totalShops", data.totalShops);
      setValue("zone", data.zone);
      setValue("bazarManager", data.bazarManager);
      setValue("supervisor", data.supervisor);
      setValue("zoneManager", data.zoneManager);
    }
  }, [setValue, data]);

  const [shopData, setShopData] = useState([
    {
      shopType: "Shops",
      totalShops: 0,
      baseRent: 0,
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAPIData("common/shop-types-categories-zones-users");
      console.log("data from common end point: ", data);
      if (data.success) {
        const bazarManagers = data.data.users
          .filter((user) => user.userType === "BazarManager")
          .map((u) => {
            return {
              value: u.userName,
              label: u.userName,
            };
          });
        const supervisors = data.data.users
          .filter((user) => user.userType === "Supervisor")
          .map((u) => {
            return {
              value: u.userName,
              label: u.userName,
            };
          });
        setBazarManagers(bazarManagers);
        setSupervisors(supervisors);
        const zoneData = data.data.zones.map((zone) => ({
          value: zone.zoneName,
          label: zone.zoneName,
        }));
        setZone(zoneData);
        setZonesData(data.data.zones);
        const shopTypeData = data.data.shopTypes.map((shopType) => {
          return {
            value: shopType.name,
            label: shopType.name,
          };
        });
        setShopType(shopTypeData);
      } else {
        console.log("error: ", data.error);
      }
    };

    if (isAvailable.current === false) {
      getData();
      isAvailable.current = true;
    }
  });

  const handleShopTypeChange = (selectedOptions, index) => {
    let newShopsTypes = [...shopType];
    if (selectedOptions) {
      const newShopsType = newShopsTypes.filter(
        (shop) => shop.value !== selectedOptions.value
      );
      setShopType(newShopsType);
    }

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

    const updatedShopData = [...shopData];
    updatedShopData[index].totalShops = totalShops;

    const updatedRemainingShops = updatedShopData.reduce(
      (remaining, shop) => remaining - shop.totalShops,
      methods.watch("approvedShops")
    );

    if (updatedRemainingShops < 0 && updatedRemainingShops > totalShops) {
      alert("Total shops cannot exceed the approved shops.");
      return;
    }
    setShopData(updatedShopData);
  };

  const handleBaseRent = (value, index) => {
    setShopData((prevShopData) => {
      const updatedShopData = [...prevShopData];
      updatedShopData[index].baseRent = parseInt(value, 10);
      return updatedShopData;
    });
  };

  const handlePlusClick = () => {
    const remainingShopsValue = calculateRemainingShops();
    if (remainingShopsValue <= 0) {
      alert("No remaining shops available.");
      return;
    }

    setShopData((prevShopData) => [
      ...prevShopData,
      {
        shopType: "Shops",
        totalShops: 0,
        baseRent: 0,
      },
    ]);
  };

  const handleMinusClick = (index) => {
    setShopData((prevShopData) => {
      const updatedShopData = [...prevShopData];
      updatedShopData.splice(index, 1);
      return updatedShopData;
    });
  };

  const calculateRemainingShops = () => {
    const approvedShopsValue = methods.watch("totalShops");
    const approvedShops = approvedShopsValue
      ? parseInt(approvedShopsValue, 10)
      : 0;
    return shopData.reduce(
      (remaining, shop) => remaining - shop.totalShops,
      approvedShops
    );
  };

  const onSubmit = async (data) => {
    const updatedData = {
      name: data.name,
      prefix: data.prefix,
      address: data.address,
      city: data.city,
      areaUnit: data.areaUnit,
      area: data.area,
      dateOfEstablishment: data.dateOfEstablishment,
      active: data.active,
      totalShops: data.totalShops,
      zone: data.zone,
      bazarManager: data.bazarManager,
      supervisor: data.supervisor,
      zoneManager: zoneManager,
      shops: { approvedShops: data.totalShops, shops: shopData },
    };

    const response = await postAPI("bazars", updatedData);
    if (response.success) {
      console.log("Bazar created successfully.");
      navigate("/admin/basic/bazar-list");
    } else {
      console.log("Bazar creation failed.");
    }
    console.log("Bazar data: ", updatedData);
  };

  const areaType = [
    { value: "Marla", label: "Marla" },
    { value: "Canal", label: "Canal" },
  ];

  const breadcrumbItems = [
    { label: "Bazar List", path: "/admin/basic/bazar-list" },
    { label: isEditMode ? "Update Bazar" : "Create Bazar" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl  mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Update Bazar" : "Create Bazar"}
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h4 className="text-md text-start font-semibold mb-3">
              1. Basic Bazar Information
            </h4>
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <InputField
                label="Bazar Name"
                type="text"
                placeholder="Enter Bazar Name"
                name="name"
                required
              />
              <InputField
                label="Bazar Address"
                placeholder="Enter Bazar Address"
                type="text"
                name="address"
                required
              />
              <Dropdown
                label="City"
                placeholder="Select City"
                name="city"
                options={Cities}
                searchable={true}
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
                name="areaUnit"
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
                name="dateOfEstablishment"
                required
              />
              <Dropdown
                label="Active"
                placeholder="Select Status"
                name="active"
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
                name="totalShops"
                required="Number of approved shops is required"
                min={0}
                onChange={(e) => methods.setValue("totalShops", e.target.value)}
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
            <div>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                {shopData.map((shop, index) => (
                  <React.Fragment key={index}>
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
                        // max={20}
                        // min={0}
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
                      <div key={index} className="flex items-center">
                        <button
                          className="border h-[39px] w-[38px] mt-[3px] rounded flex items-center justify-center hover:bg-gray-200"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMinusClick(index);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18 12H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex mb-2 items-center justify-end">
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
                handleChange={(e) => {
                  const zoneManager = zonesData.find(
                    (zone) => zone.zoneName === e.value
                  ).zoneManager;
                  setZoneManager(zoneManager.userName);
                }}
                type="basic-single"
              />
              <InputField
                label="Zone Manager"
                placeholder="Zone manager"
                name="zoneManager"
                type="text"
                value={zoneManager}
                disabled={true}
              />
              <Dropdown
                label="Bazar Manager"
                placeholder="Select Bazaar Manager"
                name="bazarManager"
                options={bazarManagers}
                type="basic-single"
                required={true}
              />

              <Dropdown
                label="Supervisor"
                placeholder="Select Supervisor"
                name="supervisor"
                options={supervisors}
                type="basic-single"
                required={true}
              />
            </div>
            {/* <ImageField label="Bazaar Image" name="bazaarImage" required /> */}

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
