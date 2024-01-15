import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@components/commonComponents/InputField";
import ButtonComponent from "@components/commonComponents/ButtonComponent";
import Dropdown from "@components/commonComponents/Dropdown";
import Breadcrumb from "@components/commonComponents/Breadcrumb";
import stallStatus from "@data/active.json";
import { getAPIData } from "@hooks/getAPIData";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI } from "@hooks/postAPI";
import { updateAPI } from "@hooks/updateAPI";

const CreateStall = () => {
  const methods = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [shopCategories, setShopCategories] = useState([]);
  const [shopTypes, setShopTypes] = useState([]);
  const [bazars, setBazars] = useState([]);
  const isAvailable = useRef(false);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [shopType, setShopType] = useState("");
  const [shopCategory, setShopCategory] = useState("");

  const isEditMode = location?.state?.edit;
  const data = location?.state?.data;

  const onSubmit = async (data) => {
    if (isEditMode) {
      const res = await updateAPI(
        "shops/shop",
        {
          shopCategory: shopCategory,
          shopID: data.shopID,
          shopName: data.shopName,
          vacant: data.vacant,
          monthlyRent: data.monthlyRent,
          shopType: shopType,
          bazar: data.bazarId,
          shopWidth: data.shopWidth && data.shopWidth,
          shopLength: data.shopLength && data.shopLength,
          modifiedBy: userId,
        },
        data.id
      );
      if (res.success) {
        navigate("/admin/transaction/shop-list");
      } else {
        console.log("error: ", res.error);
      }
    } else {
      // const res = await postAPI("shops/shop", {
      //   shopCategory: data.shopCategory && data.shopCategoryId,
      //   shopID: data.shopID,
      //   shopName: data.shopName,
      //   vacant: data.vacant,
      //   monthlyRent: data.monthlyRent,
      //   shopType: data.shopType && data.shopTypeId,
      //   bazar: data.bazarId,
      //   shopWidth: data.shopWidth && data.shopWidth,
      //   shopLength: data.shopLength && data.shopLength,
      //   modifiedBy: userId,
      //   createdBy: userId,
      // });
      // if (res.success) {
      //   navigate("/admin/transaction/shop-list");
      // } else {
      //   console.log("error: ", res.error);
      // }
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await getAPIData("common/shop-type-category");
      if (res.success) {
        const formated = res.data.shopCategories.map((c) => {
          return {
            label: c.name,
            value: c._id,
          };
        });
        setShopCategories(formated);
        const formatedTypes = res.data.shopTypes.map((c) => {
          return {
            label: c.name,
            value: c._id,
          };
        });
        setShopTypes(formatedTypes);
      } else {
        console.log("error: ", res.error);
      }
    };

    const getBazarNames = async () => {
      const res = await getAPIData("common/bazar-names");
      if (res.success) {
        const formatedBazars = res.data.bazars.map((b) => {
          return {
            label: b.name,
            value: b._id,
          };
        });
        setBazars(formatedBazars);
      } else {
        console.log("error: ", res.error);
      }
    };
    if (!isAvailable.current) {
      getCategories();
      getBazarNames();
      isAvailable.current = true;
    }
  }, [isAvailable]);

  useEffect(() => {
    if (isEditMode) {
      console.log("d is: ", data);
      methods.reset(data);
    }
  }, []);
  console.log("types and categories are: ", shopCategories, shopTypes);

  const breadcrumbItems = [
    { label: "Shop List", path: "/admin/transaction/shop-list" },
    { label: "Create Shop" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl text-start font-semibold mb-4">Create Shop</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-4">
              <InputField
                label="Shop Name"
                placeholder="Enter shop name"
                type="text"
                name="shopName"
                required
              />

              {!isEditMode && (
                <Dropdown
                  label="Bazar"
                  name="bazar"
                  type="basic-select"
                  options={bazars}
                  required={true}
                  defaultValue={
                    data && {
                      label: data.bazar,
                      value: data.bazarId,
                    }
                  }
                  placeholder="Select a bazar"
                />
              )}
              <Dropdown
                label="Shop Category"
                name="category"
                options={shopCategories}
                type="basic-single"
                searchable={false}
                handleChange={(e) => {
                  setShopCategory(e.value);
                }}
                defaultValue={
                  data && {
                    label: data.shopCategory,
                    value: data.shopCategoryId,
                  }
                }
                placeholder="Select a shop category"
                required
              />
              <Dropdown
                label="Shop Type"
                name="type"
                options={shopTypes}
                type="basic-single"
                searchable={false}
                handleChange={(e) => {
                  setShopType(e.value);
                }}
                defaultValue={
                  data && {
                    label: data.shopType,
                    value: data.shopTypeId,
                  }
                }
                placeholder="Select a shop type"
                required
              />
              <InputField
                label="Shop Width"
                placeholder="Enter shop width"
                type="text"
                name="shopWidth"
                required
              />
              <InputField
                label="Shop Length"
                placeholder="Enter shop length"
                type="text"
                name="shopLength"
                required
              />
              <Dropdown
                label="Vacant"
                name="vacant"
                options={stallStatus}
                searchable={true}
                type="basic-single"
                defaultValue={
                  data && {
                    label: data.status ? "Active" : "Inactive" || data.vacant,
                    value: data.status ? "Active" : "Inactive" || data.vacant,
                  }
                }
                placeholder="Select a status"
                required
              />
              <InputField
                name="monthlyRent"
                placeholder="Enter monthly rent"
                label="Monthly Rent"
                type="number"
                required
              />
            </div>
            <ButtonComponent type={"submit"} name={"Create Shop"} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateStall;
