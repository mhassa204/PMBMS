import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import ProvinceData from "../../data.json";
import { useLocation } from "react-router-dom";

const CreateZone = () => {
  const methods = useForm();
  const location = useLocation();
  const isEditMode = location.state.edit;
  const [data, setData] = useState({});
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const handleProvinceChange = (selectedValue) => {
    setSelectedProvince(selectedValue);
    setCities([]);
    setSelectedCities([]);
    setSelectedDistrict(null);
    const provinceData = ProvinceData.filter((p) => {
      return p.province === selectedValue.value;
    })[0].districts;
    const dis = provinceData.map((d) => {
      return { label: d.district, value: d.district };
    });
    setDistricts(dis);
  };

  const handleDistrictChange = (selectedValue) => {
    setSelectedDistrict(selectedValue);
    setSelectedCities([]);
    setCities([]);
    const provinceData = ProvinceData.filter((p) => {
      return p.province === selectedProvince.value;
    })[0].districts;
    console.log(provinceData, selectedValue);
    const dis = provinceData.find((d) => {
      return d.district === selectedValue.value;
    });
    const cities = dis.cities.map((c) => {
      return { label: c, value: c };
    });
    setCities(cities);
  };

  const provinces = [
    {
      label: "Punjab",
      value: "Punjab",
    },
    // {
    //   label: "Sindh",
    //   value: "Sindh",
    // },
    // {
    //   label: "Khyber Pakhtunkhawa",
    //   value: "Khyber Pakhtunkhawa",
    // },
    // {
    //   label: "Balochistan",
    //   value: "Balochistan",
    // },
    // {
    //   label: "Gilgit Baltistan",
    //   value: "Gilgit Baltistan",
    // },
    // {
    //   label: "Azad Kashmir",
    //   value: "Azad Kashmir",
    // },
  ];

  const handleChange = (e) => {
    setData((d) => {
      return { ...d, [e.name]: e.value };
    });
  };

  useEffect(() => {}, []);

  const zoneManager = [
    { label: "Zone Manager 1", value: "zone-manager1" },
    { label: "Zone Manager 2", value: "zone-manager2" },
    { label: "Zone Manager 3", value: "zone-manager3" },
    { label: "Zone Manager 4", value: "zone-manager4" },
  ];

  const activeOptions = [
    { value: "not-active", label: "Not Active" },
    { value: "active", label: "Active" },
    { value: "disabled", label: "Disabled" },
  ];

  const breadcrumbItems = [
    { label: "Zone List", path: "/admin/basic/zone-list" },
    { label: isEditMode ? "Update Zone" : "Create Zone" },
  ];

  const onSubmit = (data) => {
    console.log(data);
    setData(data);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Update Zone" : "Create Zone"}
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Zone Name"
              type="text"
              name="zoneName"
              required
              placeholder="Enter Zone Name"
            />
            <Dropdown
              label="Province"
              name="province"
              placeholder="Select Province"
              options={provinces}
              type="basic-single"
              handleChange={handleProvinceChange}
            />
            <Dropdown
              label="Districts"
              name="district"
              placeholder="Select district"
              options={districts}
              type="basic-single"
              handleChange={handleDistrictChange}
            />
            <Dropdown
              label="Cities"
              name="city"
              placeholder="Select Cities"
              options={cities}
              type="basic-multi-select"
              searchable={false}
              handleChange={handleChange}
            />
            <Dropdown
              label="Zone Manager"
              placeholder="Select Zone Manager"
              name="manager"
              options={zoneManager}
              type="basic-single"
              handleChange={handleChange}
            />
            <Dropdown
              label="Active"
              placeholder="Select Status"
              name="active-options"
              options={activeOptions}
              type="basic-single"
              handleChange={handleChange}
            />

            <ButtonComponent
              type={"submit"}
              name={isEditMode ? "Update Zone" : "Create Zone"}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
export default CreateZone;
