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

export default function CancellationReasons() {
  const navigate = useNavigate();
  const [cancellationReasons, setCancellationReasons] = useState([]);
  const isAvailable = useRef(false);

  const columns = [
    { Header: "Reason", accessor: "reason" },
    // { Header: "Editable", accessor: "Editable" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => (
        <div className="flex gap-2">
          <EditButton />
          <DeleteButton />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getIncomeCategories = async () => {
      const data = await getAPIData("cancellationreasons");
      if (data.success) {
        console.log("data: ", data);
        const c = data.data.map((category) => {
          return {
            reason: category.reason,
            actions: "",
          };
        });
        setCancellationReasons(c);
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
              Canellation Reasons
            </Typography>
            <Typography color="gray" className="mt-1 text-start font-normal">
              See information about all cancellation reasons
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
              reason
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Tables columns={columns} data={cancellationReasons} />
      </CardBody>
    </Card>
  );
}
