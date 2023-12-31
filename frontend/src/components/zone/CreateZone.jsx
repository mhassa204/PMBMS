// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./zone.css";

// const CreateZone = ({ onCreate }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     active: false,
//     cities: [""],
//     zoneManager: "",
//   });

//   const [cityList, setCityList] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/cities")
//       .then((response) => setCityList(response.data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   const handleChange = (e, index) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "cities") {
//       const newCities = [...formData.cities];
//       newCities[index] = value;

//       const updatedSelectedCities = [...selectedCities];
//       updatedSelectedCities[index] = value;

//       setFormData({ ...formData, cities: newCities });
//       setSelectedCities(updatedSelectedCities);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "checkbox" ? checked : value,
//       });
//     }
//   };

//   const handleAddCity = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       cities: [...prevData.cities, ""],
//     }));
//   };

//   const handleRemoveCity = (index) => {
//     setFormData((prevData) => {
//       const newCities = [...prevData.cities];
//       const updatedSelectedCities = [...selectedCities];

//       newCities.splice(index, 1);
//       updatedSelectedCities.splice(index, 1);

//       return { ...prevData, cities: newCities };
//     });

//     setSelectedCities((prevSelectedCities) => {
//       const updatedSelectedCities = [...prevSelectedCities];
//       updatedSelectedCities.splice(index, 1);
//       return updatedSelectedCities;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/zones",
//         formData
//       );
//       console.log("Zone created successfully!");

//       onCreate(response.data);

//       setFormData({
//         name: "",
//         active: false,
//         cities: [""],
//         zoneManager: "",
//       });

//       // Reset the selected cities
//       setSelectedCities([]);
//     } catch (error) {
//       console.error("Error creating zone:", error);
//     }
//   };

//   const getAvailableCities = () => {
//     return cityList.filter((city) => !selectedCities.includes(city.name));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <label className="form-label">
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={(e) => handleChange(e)}
//           required
//           className="form-input"
//         />
//       </label>

//       <label className="form-label">
//         Active:
//         <input
//           type="checkbox"
//           name="active"
//           checked={formData.active}
//           onChange={(e) => handleChange(e)}
//           className="form-checkbox"
//         />
//       </label>

//       {formData.cities.map((city, index) => (
//         <div key={index} className="city-container">
//           <label className="form-label">
//             City {index + 1}:
//             <select
//               name="cities"
//               value={city}
//               onChange={(e) => handleChange(e, index)}
//               required
//               className="form-input"
//             >
//               <option value="" disabled>
//                 Select a city
//               </option>
//               {getAvailableCities().map((cityOption) => (
//                 <option key={cityOption.id} value={cityOption.name}>
//                   {cityOption.name}
//                 </option>
//               ))}
//               {city &&
//                 !getAvailableCities().some(
//                   (cityOption) => cityOption.name === city
//                 ) && (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 )}
//             </select>
//           </label>
//           <button
//             type="button"
//             onClick={() => handleRemoveCity(index)}
//             className="remove-button"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <button type="button" onClick={handleAddCity} className="add-button">
//         Add City
//       </button>

//       <label className="form-label">
//         Zone Manager:
//         <input
//           type="text"
//           name="zoneManager"
//           value={formData.zoneManager}
//           onChange={(e) => handleChange(e)}
//           required
//           className="form-input"
//         />
//       </label>

//       <button type="submit" className="submit-button">
//         Create Zone
//       </button>
//     </form>
//   );
// };

// export default CreateZone;

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";

const CreateZone = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const provinces = [
    {
      label: "Punjab",
      value: "Punjab",
    },
    {
      label: "Sindh",
      value: "Sindh",
    },
    {
      label: "Khyber Pakhtunkhwa",
      value: "KPK",
    },
    {
      label: "Balochistan",
      value: "Balochistan",
    },
    {
      label: "Gilgit-Baltistan",
      value: "GB",
    },
    {
      label: "Azad Jammu and Kashmir",
      value: "AJK",
    },
  ];

  const activeOptions = [
    { value: "not-active", label: "Not Active" },
    { value: "active", label: "Active" },
  ];

  const breadcrumbItems = [
    { label: "Zone List", path: "/admin/zone-list" },
    { label: "Create Zone" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">Create Zone</h2>

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
              placeholder="Select Province "
              options={provinces}
              type="basic-single"
            />
            <Dropdown
              label="Cities"
              name="city"
              placeholder="Select Cities"
              options={provinces}
              type="basic-multi-select"
              searchable={false}
            />
            <Dropdown
              label="Zone Manager"
              placeholder="Select Zone Manager"
              name="manager"
              options={provinces}
              type="basic-single"
            />

            <Dropdown
              label="Active"
              placeholder="Select Status"
              name="active-options"
              options={activeOptions}
              type="basic-single"
            />

            <ButtonComponent type={"submit"} name={"Create Zone"} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
export default CreateZone;
