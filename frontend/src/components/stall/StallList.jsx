import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import EditButton from "@components/commonComponents/EditButton";
import DeleteButton from "@components/commonComponents/DeleteButton";
import { useNavigate } from "react-router-dom";
import "@src/styles/tableStyles.css";
import Tables from "@components/commonComponents/Tables";

export default function StallList() {
  const navigate = useNavigate();
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

  const columns = [
    { Header: "Stall ID", accessor: "StallID" },
    { Header: "Stall Code", accessor: "StallCode" },
    { Header: "Size", accessor: "Size" },
    { Header: "Bazar Name", accessor: "BazarName" },
    { Header: "Stall Category", accessor: "StallCategory" },
    { Header: "Stall Type", accessor: "StallType" },
    { Header: "Status", accessor: "Status" },
    { Header: "Late Fine", accessor: "LateFine" },
    { Header: "Monthly Rent", accessor: "MonthlyRent" },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: () => (
        <div className="flex gap-2">
          <EditButton />
          <DeleteButton />
        </div>
      ),
    },
  ];

  const data = [
    {
      StallID: "1",
      StallCode: "SC001",
      Size: "Medium",
      BazarName: "Central Bazar",
      StallCategory: "General",
      StallType: "Permanent",
      Status: "Active",
      LateFine: "$10",
      MonthlyRent: "$500",
      Actions: "",
    },
    {
      StallID: "2",
      StallCode: "SC002",
      Size: "Small",
      BazarName: "Eastern Bazar",
      StallCategory: "Premium",
      StallType: "Temporary",
      Status: "Inactive",
      LateFine: "$5",
      MonthlyRent: "$300",
      Actions: "",
    },
    {
      StallID: "3",
      StallCode: "SC003",
      Size: "Large",
      BazarName: "Western Bazar",
      StallCategory: "General",
      StallType: "Permanent",
      Status: "Active",
      LateFine: "$15",
      MonthlyRent: "$600",
      Actions: "",
    },
    {
      StallID: "4",
      StallCode: "SC004",
      Size: "Medium",
      BazarName: "Northern Bazar",
      StallCategory: "Premium",
      StallType: "Temporary",
      Status: "Inactive",
      LateFine: "$8",
      MonthlyRent: "$450",
      Actions: "",
    },
    {
      StallID: "5",
      StallCode: "SC005",
      Size: "Small",
      BazarName: "Southern Bazar",
      StallCategory: "General",
      StallType: "Permanent",
      Status: "Active",
      LateFine: "$12",
      MonthlyRent: "$550",
      Actions: "",
    },
    {
      StallID: "6",
      StallCode: "SC006",
      Size: "Large",
      BazarName: "Central-East Bazar",
      StallCategory: "Premium",
      StallType: "Temporary",
      Status: "Inactive",
      LateFine: "$7",
      MonthlyRent: "$400",
      Actions: "",
    },
    {
      StallID: "7",
      StallCode: "SC007",
      Size: "Medium",
      BazarName: "South-West Bazar",
      StallCategory: "General",
      StallType: "Permanent",
      Status: "Active",
      LateFine: "$11",
      MonthlyRent: "$520",
      Actions: "",
    },
    {
      StallID: "8",
      StallCode: "SC008",
      Size: "Small",
      BazarName: "North-West Bazar",
      StallCategory: "Premium",
      StallType: "Temporary",
      Status: "Inactive",
      LateFine: "$6",
      MonthlyRent: "$380",
      Actions: "",
    },
  ];

  return (
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Stall list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all stalls
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
              size="sm"
              onClick={() => {
                navigate("/admin/create-stall");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new stall
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full mb-[-20px] md:w-72">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />

              <button className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}
      </CardHeader>

      <CardBody>
        <Tables columns={columns} data={data} />
      </CardBody>
    </Card>
  );
}
