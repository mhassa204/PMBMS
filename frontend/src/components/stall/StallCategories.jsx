import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import "@src/styles/tableStyles.css";
import Tables from "@components/commonComponents/Tables";
import EditButton from "@components/commonComponents/EditButton";
import DeleteButton from "@components/commonComponents/DeleteButton";
import { useEffect, useRef, useState } from "react";
import { getPaginatedData } from "@hooks/getPaginatedData";
import SimpleInputField from "@components/commonComponents/SimpleInputField";
import { updateAPI } from "@hooks/updateAPI";
import { postAPI } from "@hooks/postAPI";
import { deleteAPI } from "@hooks/deleteAPI";

export default function StallCategories() {
  const [shopCategories, setShopCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isAvailable = useRef(false);
  const [edit, setEdit] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({
    id: "",
    name: "",
  });
  const [updateTable, setUpdateTable] = useState(false);

  const columns = [
    { Header: "Shop Category", accessor: "StallCategory" },
    { Header: "Editable", accessor: "Editable" },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <EditButton
            onClick={() => {
              setEdit(true);
              handleEdit(row.original);
            }}
          />
          <DeleteButton
            onClick={() => {
              handleDelete(row.original.id);
            }}
          />
        </div>
      ),
    },
  ];

  const handleEdit = (data) => {
    setCategoryToEdit({
      id: data.id,
      name: data.StallCategory,
    });
  };

  const handleDelete = async (id) => {
    const d = await deleteAPI("shops/shop-categories", id);
    if (d.success) {
      setUpdateTable(true);
    } else {
      alert(d.error.response.data.message);
    }
  };

  const handleAddUpdateCategory = async (data) => {
    if (edit) {
      const d = await updateAPI(
        `shops/shop-categories`,
        { name: data.name },
        data.id
      );
      if (d.success) {
        setUpdateTable(true);
        setEdit(false);
        setCategoryToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    } else {
      const d = await postAPI(`shops/shop-categories`, { name: data.name });
      if (d.success) {
        setUpdateTable(true);
        setCategoryToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await getPaginatedData(
        "shops/shop-categories",
        currentPage,
        15
      );
      if (data.success) {
        const c = data.data.categories.map((category) => {
          return {
            StallCategory: category.name,
            id: category._id,
            Editable: category.editable ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ),
            actions: "",
          };
        });
        setShopCategories(c);
        setTotalPages(data.data.totalPages);
      } else {
        console.log(error.message);
      }
    };
    if (isAvailable.current === false || currentPage || updateTable) {
      getCategories();
      isAvailable.current = true;
      setUpdateTable(false);
    }
  }, [isAvailable, currentPage, updateTable]);

  return (
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Shop Categories
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all shop categories
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="flex items-center ">
              <SimpleInputField
                type="text"
                placeholder="Enter shop category"
                label="Shop Category"
                name="shopCategory"
                value={categoryToEdit}
                buttonType="submit"
                buttonName={edit ? "Save" : "Add"}
                handleChange={(val) => {
                  handleAddUpdateCategory(val);
                }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables
          columns={columns}
          data={shopCategories}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardBody>
    </Card>
  );
}
