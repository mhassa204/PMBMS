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

export default function IncomeCategories() {
  const navigate = useNavigate();
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isAvailable = useRef(false);
  const [edit, setEdit] = useState(false);
  const [incomeCategoryToEdit, setIncomeCategoryToEdit] = useState({
    id: "",
    name: "",
  });
  const [updateTable, setUpdateTable] = useState(false);

  const columns = [
    { Header: "Income Category", accessor: "incomeCategory" },
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
    setIncomeCategoryToEdit({
      id: data.id,
      name: data.incomeCategory,
    });
  };

  const handleDelete = async (id) => {
    const d = await deleteAPI("income-categories", id);
    if (d.success) {
      setUpdateTable(true);
    } else {
      alert(d.error.response.data.message);
    }
  };

  const handleAddUpdateIncomeCategory = async (data) => {
    if (edit) {
      const d = await updateAPI(
        `income-categories`,
        { name: data.name },
        data.id
      );
      if (d.success) {
        setUpdateTable(true);
        setEdit(false);
        setIncomeCategoryToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    } else {
      const d = await postAPI(`income-categories`, { name: data.name });
      if (d.success) {
        setUpdateTable(true);
        setIncomeCategoryToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const getIncomeCategories = async () => {
      const data = await getPaginatedData("income-categories", currentPage, 15);
      if (data.success) {
        const c = data.data.incomeCategories.map((category) => {
          return {
            incomeCategory: category.name,
            id: category._id,
            actions: "",
          };
        });
        setIncomeCategories(c);
        setTotalPages(data.data.totalPages);
      } else {
        console.log(error.message);
      }
    };
    if (isAvailable.current === false || currentPage || updateTable) {
      getIncomeCategories();
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
              Income Categories
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all income categories
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="flex items-center ">
              <SimpleInputField
                type="text"
                placeholder="Enter income category"
                label="Income Category"
                name="incomeCategory"
                value={incomeCategoryToEdit}
                buttonType="submit"
                buttonName={edit ? "Save" : "Add"}
                handleChange={(val) => {
                  handleAddUpdateIncomeCategory(val);
                }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables
          columns={columns}
          data={incomeCategories}
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
