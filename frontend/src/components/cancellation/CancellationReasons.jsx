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
import SimpleInputField from "@components/commonComponents/SimpleInputField";
import { updateAPI } from "@hooks/updateAPI";
import { postAPI } from "@hooks/postAPI";
import { deleteAPI } from "@hooks/deleteAPI";
import { getPaginatedData } from "@hooks/getPaginatedData";

export default function CancellationReasons() {
  const navigate = useNavigate();
  const [cancellationReasons, setCancellationReasons] = useState([]);
  const isAvailable = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [edit, setEdit] = useState(false);
  const [reasonToEdit, setReasonToEdit] = useState({
    id: "",
    name: "",
  });
  const [updateTable, setUpdateTable] = useState(false);

  const columns = [
    { Header: "Reason", accessor: "reason" },
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
    setReasonToEdit({
      id: data.id,
      name: data.reason,
    });
  };

  const handleDelete = async (id) => {
    const d = await deleteAPI("cancellationreasons", id);
    if (d.success) {
      setUpdateTable(true);
    } else {
      alert(d.error.response.data.message);
    }
  };

  const handleAddUpdateReason = async (data) => {
    if (edit) {
      const d = await updateAPI(
        `cancellationreasons`,
        { reason: data.name },
        data.id
      );
      if (d.success) {
        setUpdateTable(true);
        setEdit(false);
        setReasonToEdit({
          id: "",
          name: "",
        });
      } else {
        alert(d.error.response.data.message);
      }
    } else {
      const d = await postAPI(`cancellationreasons`, { reason: data.name });
      if (d.success) {
        setUpdateTable(true);
        setReasonToEdit({
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
      const data = await getAPIData("cancellationreasons");
      if (data.success) {
        console.log("data: ", data);
        const c = data.data.map((category) => {
          return {
            reason: category.reason,
            id: category._id,
            actions: "",
          };
        });
        setCancellationReasons(c);
      } else {
        console.log(error.message);
      }
    };
    if (isAvailable.current === false || updateTable) {
      getIncomeCategories();
      isAvailable.current = true;
      setUpdateTable(false);
    }
  }, [isAvailable, updateTable]);

  return (
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Canellation Reasons
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all cancellation reasons
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="flex items-center ">
              <SimpleInputField
                type="text"
                placeholder="Enter reason"
                label="Cancellation Reason"
                name="reason"
                value={reasonToEdit}
                buttonType="submit"
                buttonName={edit ? "Save" : "Add"}
                handleChange={(val) => {
                  handleAddUpdateReason(val);
                }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables
          columns={columns}
          data={cancellationReasons}
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
