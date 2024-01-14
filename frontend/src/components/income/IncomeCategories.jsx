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
import { getAPIData } from "@hooks/getAPIData";

export default function IncomeCategories() {
  const navigate = useNavigate();
  const [incomeCategories, setIncomeCategories] = useState([]);
  const isAvailable = useRef(false);

  const columns = [
    { Header: "Income Category", accessor: "incomeCategory" },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <EditButton onClick={() => handleEdit(row.original)} />
          <DeleteButton onClick={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];

  const handleEdit = (data) => {
    console.log("delete button clicked: ", data);
  };

  const handleDelete = (id) => {
    console.log("delete button clicked: ", id);
  };

  useEffect(() => {
    const getIncomeCategories = async () => {
      const data = await getAPIData("income-categories");
      if (data.success) {
        const c = data.data.incomeCategories.map((category) => {
          return {
            incomeCategory: category.name,
            id: category._id,
            actions: "",
          };
        });
        setIncomeCategories(c);
      } else {
        console.log(error.message);
      }
    };
    if (isAvailable.current === false) {
      getIncomeCategories();
      isAvailable.current = true;
    }
  }, [isAvailable]);

  return (
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Income Categories
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all income categories
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
              size="sm"
              onClick={() => {
                navigate("/admin/basic/create-shop");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new
              category
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables
          columns={columns}
          data={incomeCategories}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </CardBody>
    </Card>
  );
}
