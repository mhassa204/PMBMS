import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import EditButton from "@components/commonComponents/EditButton";
import DeleteButton from "@components/commonComponents/DeleteButton";
import { useNavigate } from "react-router-dom";
import "@src/styles/tableStyles.css";
import Tables from "@components/commonComponents/Tables";

export default function FinePolicies() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/transaction/create-fine-policies", { state: true });
  };
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const TABLE_HEAD = [
    { Header: "Bazar Name", accessor: "bazarName" },
    { Header: "Income Category", accessor: "incomeCategory" },
    { Header: "Fine % After 10th Date", accessor: "fine10" },
    { Header: "Fine % After 20th Date", accessor: "fine20" },
    { Header: "Fine % After 25th Date", accessor: "fine25" },
    { Header: "Active", accessor: "active" },
    { Header: "User Name", accessor: "username" },
    { Header: "Modify Date", accessor: "modifyDate" },

    {
      Header: "Actions",
      accessor: "Actions",
      Cell: () => (
        <div className="flex gap-2">
          <EditButton
            onClick={() => {
              handleClick();
            }}
          />
          <DeleteButton />
        </div>
      ),
    },
  ];

  const TABLE_ROWS = [
    {
      bazarName: "Bazar A",
      incomeCategory: "Category X",
      fine10: 5,
      fine20: 8,
      fine25: 10,
      active: true,
      username: "userA",
      modifyDate: "2024-01-13",
      Actions: null,
    },
    {
      bazarName: "Bazar B",
      incomeCategory: "Category Y",
      fine10: 3,
      fine20: 6,
      fine25: 9,
      active: false,
      username: "userB",
      modifyDate: "2024-01-14",
      Actions: null,
    },
    {
      bazarName: "Bazar C",
      incomeCategory: "Category Z",
      fine10: 7,
      fine20: 12,
      fine25: 15,
      active: true,
      username: "userC",
      modifyDate: "2024-01-15",
      Actions: null,
    },
    {
      bazarName: "Bazar D",
      incomeCategory: "Category X",
      fine10: 4,
      fine20: 7,
      fine25: 11,
      active: true,
      username: "userD",
      modifyDate: "2024-01-16",
      Actions: null,
    },
    {
      bazarName: "Bazar E",
      incomeCategory: "Category Z",
      fine10: 6,
      fine20: 9,
      fine25: 13,
      active: false,
      username: "userE",
      modifyDate: "2024-01-17",
      Actions: null,
    },
  ];

  return (
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <div className="flex items-center">
              {/* <img src={bazar} alt="bazar" className="w-8 h-8 rounded-full" /> */}
              <Typography className="text-start" variant="h5" color="blue-gray">
                Fine Policy list
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all fine policies
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none "
              size="sm"
              onClick={() => {
                navigate("/admin/transaction/create-fine-policies");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new Fine
              Policy
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Tables columns={TABLE_HEAD} data={TABLE_ROWS} />
      </CardBody>
    </Card>
  );
}
