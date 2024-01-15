import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import ProvinceData from "../../data.json";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI } from "@hooks/postAPI";
import { getAPIData } from "@hooks/getAPIData";
import activeOptions from "@data/active.json";
import { updateAPI } from "@hooks/updateAPI";

const CreateZone = () => {
  const methods = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location?.state?.edit;
  const [data, setData] = useState({});
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [zoneManagers, setZoneManagers] = useState([]);
  const isAvailable = useRef(false);
  const data1 = location?.state?.data;
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [districtModified, setDistrictModified] = useState(false);
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
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);

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
    console.log(selectedValue, districtModified);
    setSelectedDistrict(selectedValue);
    setSelectedCities([]);
    setCities([]);
    methods.setValue("citiesInZone", []);
    if (
      data1 &&
      data1.zoneDistrict &&
      selectedValue.value !== data1.zoneDistrict
    ) {
      setDistrictModified(true);
    }

    const provinceData = ProvinceData.filter((p) => {
      return p.province === selectedProvince.value;
    })[0].districts;
    const dis = provinceData.find((d) => {
      return d.district === selectedValue.value;
    });
    const cities = dis.cities.map((c) => {
      return { label: c, value: c };
    });
    setCities(cities);
  };

  const handleChange = (e) => {
    setData((d) => {
      return { ...d, [e.name]: e.value };
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAPIData("common/shop-types-categories-zones-users");
      if (data.success) {
        const zoneManagers = data.data.users.filter((user) => {
          return user.userType === "ZoneManager";
        });
        const zoneManagerOptions = zoneManagers.map((user) => {
          return { label: user.userName, value: user._id };
        });
        setZoneManagers(zoneManagerOptions);
      } else {
        console.log("error: ", data.error);
      }
    };

    if (isAvailable.current === false) {
      getData();
      isAvailable.current = true;
    }
  });

  const breadcrumbItems = [
    { label: "Zone List", path: "/admin/basic/zone-list" },
    { label: isEditMode ? "Update Zone" : "Create Zone" },
  ];

  const onSubmit = async (data) => {
    console.log(data, data1);
    if (isEditMode) {
      const res = await updateAPI("zones", data, data.id);
      if (res.success) {
        navigate("/admin/basic/zone-list");
      } else {
        console.log("error: ", res.error);
      }
    } else {
      const res = await postAPI("zones", data);
      if (res.success) {
        navigate("/admin/basic/zone-list");
      } else {
        console.log("error: ", res.error);
      }
    }
  };
  useEffect(() => {
    if (districtModified) {
      methods.setValue("citiesInZone", []);
    }
  }, [methods, districtModified]);

  useEffect(() => {
    if (isEditMode && data1) {
      methods.reset(data1);
      setSelectedProvince(data1.province);
      setSelectedDistrict(data1.zoneDistrict);
      setSelectedCities(data1.citiesInZone);
      setSelectedProvince(
        data1.province && { label: data1.province, value: data1.province }
      );
      setSelectedDistrict(
        data1.zoneDistrict && {
          label: data1.zoneDistrict,
          value: data1.zoneDistrict,
        }
      );

      handleProvinceChange({ label: data1.province, value: data1.province });
      handleDistrictChange(
        data1.zoneDistrict && {
          label: data1.zoneDistrict,
          value: data1.zoneDistrict,
        }
      );
    }
  }, [isEditMode, data1, methods.reset]);

  console.log(districtModified, data1.citiesInZone);

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
              defaultValue={
                data1 && { label: data1.province, value: data1.province }
              }
            />
            <Dropdown
              label="Districts"
              name="zoneDistrict"
              placeholder="Select district"
              options={districts}
              type="basic-single"
              searchable={true}
              defaultValue={
                data1 && {
                  label: data1.zoneDistrict,
                  value: data1.zoneDistrict,
                }
              }
              handleChange={handleDistrictChange}
            />
            <Dropdown
              label="Cities"
              name="citiesInZone"
              placeholder="Select Cities"
              options={cities}
              type="basic-multi-select"
              searchable={false}
              handleChange={handleChange}
              defaultValue={
                data1 &&
                data1.citiesInZone.map((city) => {
                  return { label: city, value: city };
                })
              }
            />
            <Dropdown
              label="Zone Manager"
              placeholder="Select Zone Manager"
              name="zoneManager"
              options={zoneManagers}
              type="basic-single"
              handleChange={handleChange}
              defaultValue={
                data1 && {
                  label: data1.zoneManager,
                  value: data1.zoneManager,
                }
              }
            />
            <Dropdown
              label="Active"
              placeholder="Select Status"
              name="active"
              options={activeOptions}
              type="basic-single"
              handleChange={handleChange}
              defaultValue={
                data1 && { label: data1.active, value: data1.active }
              }
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
