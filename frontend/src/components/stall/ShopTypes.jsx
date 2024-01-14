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

export default function ShopTypes() {
  const [shopTypes, setShopTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isAvailable = useRef(false);
  const [edit, setEdit] = useState(false);
  const [typeToEdit, setTypeToEdit] = useState({
    id: "",
    name: "",
  });
  const [updateTable, setUpdateTable] = useState(false);

  const columns = [
    { Header: "Shop Type", accessor: "ShopTypes" },
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
    setTypeToEdit({
      id: data.id,
      name: data.ShopTypes,
    });
  };

  const handleDelete = async (id) => {
    const d = await deleteAPI("shops/shop-types", id);
    if (d.success) {
      setUpdateTable(true);
    } else {
      alert(d.error.response.data.message);
    }
  };

  const handleAddUpdateType = async (data) => {
    if (edit) {
      const d = await updateAPI(
        `shops/shop-types`,
        { name: data.name },
        data.id
      );
      if (d.success) {
        setUpdateTable(true);
        setEdit(false);
        setTypeToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    } else {
      const d = await postAPI(`shops/shop-types`, { name: data.name });
      if (d.success) {
        setUpdateTable(true);
        setTypeToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const getTypes = async () => {
      const data = await getPaginatedData("shops/shop-types", currentPage, 15);
      if (data.success) {
        const c = data.data.shopTypes.map((type) => {
          return {
            ShopTypes: type.name,
            actions: "",
            id: type._id,
          };
        });
        setShopTypes(c);
        setTotalPages(data.data.totalPages);
      } else {
        console.log(error.message);
      }
    };
    if (isAvailable.current === false || currentPage || updateTable) {
      getTypes();
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
              Shop Types
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all shop types
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="flex items-center ">
              <SimpleInputField
                type="text"
                placeholder="Enter shop type"
                label="Shop Type"
                name="shopType"
                value={typeToEdit}
                buttonType="submit"
                buttonName={edit ? "Save" : "Add"}
                handleChange={(val) => {
                  handleAddUpdateType(val);
                }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables
          columns={columns}
          data={shopTypes}
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
