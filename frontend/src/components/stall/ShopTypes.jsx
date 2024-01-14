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

export default function ShopTypes() {
  const navigate = useNavigate();
  const [shopTypes, setShopTypes] = useState([]);
  const isAvailable = useRef(false);

  const columns = [
    { Header: "Shop Type", accessor: "ShopTypes" },
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
    console.log("edit button clicked", data);
  };

  const handleDelete = (id) => {
    console.log("delete button clicked: ", id);
  };

  useEffect(() => {
    const getTypes = async () => {
      const data = await getAPIData("shops/shop-types");
      if (data.success) {
        const c = data.data.shopTypes.map((type) => {
          return {
            ShopTypes: type.name,
            actions: "",
            id: type._id,
          };
        });
        setShopTypes(c);
      } else {
        console.log(error.message);
      }
    };
    if (isAvailable.current === false) {
      getTypes();
      isAvailable.current = true;
    }
  }, [isAvailable]);

  return (
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Shop Types
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all shop types
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
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new type
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables
          columns={columns}
          data={shopTypes}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </CardBody>
    </Card>
  );
}
