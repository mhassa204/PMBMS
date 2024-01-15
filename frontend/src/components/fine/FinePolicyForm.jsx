import React, { useEffect, useRef, useState } from "react";
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

export default function FinePolicyForm() {
  const methods = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [zones, setZones] = useState([]);
  const [tempBazars, setTempBazars] = useState([]);
  const [bazars, setBazars] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedBazar, setSelectedBazar] = useState("");
  const isAvailable = useRef(false);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const isEditMode = location?.state?.edit;
  const data = location?.state?.data;

  const onSubmit = async (data) => {
    if (isEditMode) {
      const res = await updateAPI(
        "finepolicies",
        {
          fineName: data.fineName,
          zone: data.zoneId,
          bazar: data.bazarId,
          incomeCategory: data.incomeCategoryId,
          fineAfter10th: data.fineAfter10th,
          fineAfter20th: data.fineAfter20th,
          fineAfter25th: data.fineAfter25th,
          active: data.active,
          modifiedBy: userId,
        },
        data.id
      );
      if (res.success) {
        navigate("/admin/transaction/fine-policies");
      } else {
        console.log("error: ", res.error);
      }
    } else {
      const res = await postAPI("finepolicies", {
        ...data,
        modifiedBy: userId,
        createdBy: userId,
      });
      if (res.success) {
        navigate("/admin/transaction/fine-policies");
      } else {
        console.log("error: ", res.error);
      }
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await getAPIData("income-categories/categories");
      if (res.success) {
        const formated = res.data.incomeCategories.map((c) => {
          return {
            label: c.name,
            value: c.name,
          };
        });
        setIncomeCategories(formated);
      } else {
        console.log("error: ", res.error);
      }
    };

    const getZonesBazars = async () => {
      const res = await getAPIData("common/zone-bazar");
      if (res.success) {
        const formatedZone = res.data.zones.map((zone) => {
          return {
            label: zone.zoneName,
            value: zone._id,
          };
        });
        setZones(formatedZone);
        setTempBazars(res.data.bazars);
      } else {
        console.log("error: ", res.error);
      }
    };
    if (!isAvailable.current) {
      getCategories();
      getZonesBazars();
      isAvailable.current = true;
    }
  }, [isAvailable]);

  const handleChange = (e) => {
    setSelectedZone(e.value);
    const bazar = tempBazars.filter((bazar) => {
      return bazar.zoneId === e.value;
    });
    const formatedBazar = bazar.map((b) => {
      return {
        label: b.bazarName,
        value: b.bazarId,
      };
    });
    setBazars(formatedBazar);
  };

  const handleChange1 = (e) => {
    setSelectedBazar(e.value);
  };

  useEffect(() => {
    if (isEditMode) {
      methods.reset(data);
      setSelectedBazar(data.bazarId);
      methods.setValue("bazarName", {
        label: data.bazarName,
        value: data.bazarId,
      });
      handleChange(data.zoneId);
    }
  }, []);

  const breadcrumbItems = [
    {
      label: "Fine Policy List",
      path: "/admin/transaction/fine-policies",
    },
    { label: isEditMode ? "Update Fine Policy" : "Create Fine Policy" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-md mx-auto my-10 p-6 bg-white border-2 rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? "Update Fine Policy" : "Create Fine Policy"}
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              label="Fine Name"
              name="fineName"
              type="text"
              required={true}
              placeholder="Enter fine name"
            />
            <Dropdown
              label="Zone"
              name="zone"
              type="basic-select"
              options={zones}
              required={true}
              defaultValue={
                data && {
                  label: data.zone,
                  value: data.zoneId,
                }
              }
              handleChange={handleChange}
              placeholder="Select a zone"
            />
            <Dropdown
              label="Bazar"
              name="bazar"
              type="basic-select"
              options={bazars}
              required={true}
              defaultValue={
                data && {
                  label: data.bazarName,
                  value: data.bazarId,
                }
              }
              handleChange={handleChange1}
              placeholder="Select a bazar"
            />
            <Dropdown
              label="Income Category"
              name="incomeCategory"
              type="basic-select"
              options={incomeCategories}
              required={true}
              defaultValue={
                data && {
                  label: data.incomeCategory,
                  value: data.incomeCategoryId,
                }
              }
              placeholder="Select an income category"
            />
            <Dropdown
              label="Shop Status"
              name="active"
              type="basic-select"
              options={stallStatus}
              required={true}
              defaultValue={
                data && {
                  label: data.active,
                  value: data.active,
                }
              }
              placeholder="Select a shop status"
            />

            <InputField
              label="Fine % After 10th Date"
              name="fineAfter10th"
              type="number"
              required={true}
              placeholder="Enter fine % after 10th date"
            />
            <InputField
              label="Fine % After 20th Date"
              name="fineAfter20th"
              type="number"
              required={true}
              placeholder="Enter fine % after 20th date"
            />
            <InputField
              label="Fine % After 25th Date"
              name="fineAfter25th"
              type="number"
              required={true}
              placeholder="Enter fine % after 25th date"
            />

            <ButtonComponent
              name={isEditMode ? "Update" : "Submit"}
              type="submit"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
