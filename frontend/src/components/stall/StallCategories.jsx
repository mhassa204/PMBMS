import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import "@src/styles/tableStyles.css";
import Tables from "@components/commonComponents/Tables";
import EditButton from "@components/commonComponents/EditButton";
import DeleteButton from "@components/commonComponents/DeleteButton";
import { useEffect, useRef, useState } from "react";
import { getPaginatedData } from "@hooks/getPaginatedData";
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
    editable: "",
  });
  const [updateTable, setUpdateTable] = useState(false);

  const columns = [
    { Header: "Shop Category", accessor: "StallCategory" },
    { Header: "Editable", accessor: "editable" },
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
      editable: data.editable,
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
        { name: data.name, editable: data.editable },
        data.id
      );
      if (d.success) {
        setUpdateTable(true);
        setEdit(false);
        setCategoryToEdit({
          id: "",
          name: "",
          editable: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    } else {
      const d = await postAPI(`shops/shop-categories`, {
        name: data.name,
        editable: data.editable,
      });
      if (d.success) {
        setUpdateTable(true);
        setCategoryToEdit({
          id: "",
          name: "",
          editable: "",
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
            editable: category.editable,
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

  const handleSelectChange = (e) => {
    setCategoryToEdit({ ...categoryToEdit, editable: e.target.value });
  };

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
              <select
                value={categoryToEdit.editable}
                onChange={handleSelectChange}
                className="ml-2 outline-none border-1 border-dark px-1 h-[40px] me-2 rounded "
              >
                <option value={""}>Select Editable</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
              <input
                type={"text"}
                name={"shopCategory"}
                value={categoryToEdit.name}
                placeholder={"Enter shop category"}
                onChange={(e) => {
                  e.preventDefault();
                  setCategoryToEdit({
                    ...categoryToEdit,
                    name: e.target.value,
                  });
                }}
                className={`w-full h-[40px] border-1 border-gray-900 ring-0 outline-none p-2 rounded-md `}
              />
              <button
                type={"submit"}
                onClick={(e) => handleAddUpdateCategory(categoryToEdit)}
                className="bg-[#0b6323] ms-2 h-[40px] hover:bg-darkblue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                {edit ? "Save" : "Add"}
              </button>
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
