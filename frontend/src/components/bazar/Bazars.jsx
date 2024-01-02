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

export default function Bazars() {
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

  const TABLE_HEAD = [
    { Header: "Bazar Name", accessor: "bazarName" },
    { Header: "Bazar Address", accessor: "bazarAddress" },
    { Header: "Status", accessor: "Status" },
    {
      Header: "Default Rent of Permanent Stall",
      accessor: "defaultRentOfPermanentStall",
    },
    { Header: "Total Stalls", accessor: "totalStalls" },
    { Header: "Prefix", accessor: "Prefix" },
    { Header: "Bazar Image", accessor: "bazarImage" },
    { Header: "City", accessor: "City" },
    { Header: "Bazar Manager", accessor: "bazarManager" },
    { Header: "Zone Manager", accessor: "zoneManager" },
    { Header: "Temporary Stall", accessor: "temporaryStall" },
    {
      Header: "Default Rent of Temporary Stall",
      accessor: "defaultRentOfTemporaryStall",
    },
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

  const TABLE_ROWS = [
    {
      bazarName: "John Michael",
      bazarAddress: "123 Main Street",
      Status: "Active",
      defaultRentOfPermanentStall: "$500",
      totalStalls: 10,
      Prefix: "BZ",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      City: "New York",
      bazarManager: "Alice Doe",
      zoneManager: "Bob Smith",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "$300",
      Actions: "",
    },
    {
      bazarName: "Alexa Liras",
      bazarAddress: "456 Elm Street",
      Status: "Inactive",
      defaultRentOfPermanentStall: "$450",
      totalStalls: 8,
      Prefix: "BA",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      City: "Los Angeles",
      bazarManager: "Charlie Brown",
      zoneManager: "David Johnson",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "$250",
      Actions: "",
    },
    {
      bazarName: "Laurent Perrier",
      bazarAddress: "789 Oak Street",
      Status: "Pending",
      defaultRentOfPermanentStall: "$600",
      totalStalls: 12,
      Prefix: "LP",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      City: "Chicago",
      bazarManager: "Eva White",
      zoneManager: "Frank Adams",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "$350",
      Actions: "",
    },
    {
      bazarName: "Michael Levi",
      bazarAddress: "101 Pine Street",
      Status: "Active",
      defaultRentOfPermanentStall: "$550",
      totalStalls: 11,
      Prefix: "ML",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      City: "Houston",
      bazarManager: "Grace Miller",
      zoneManager: "Henry Clark",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "$275",
      Actions: "",
    },
    {
      bazarName: "Richard Gran",
      bazarAddress: "202 Cedar Street",
      Status: "Inactive",
      defaultRentOfPermanentStall: "$480",
      totalStalls: 9,
      Prefix: "RG",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      City: "San Francisco",
      bazarManager: "Ivy Turner",
      zoneManager: "Jack Turner",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "$325",
      Actions: "",
    },
    {
      bazarName: "Alice Doe",
      bazarAddress: "303 Maple Street",
      Status: "Active",
      defaultRentOfPermanentStall: "$520",
      totalStalls: 13,
      Prefix: "AD",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      City: "Miami",
      bazarManager: "Kevin Baker",
      zoneManager: "Laura Evans",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "$280",
      Actions: "",
    },
    {
      bazarName: "Charlie Brown",
      bazarAddress: "404 Birch Street",
      Status: "Blocked",
      defaultRentOfPermanentStall: "$490",
      totalStalls: 10,
      Prefix: "CB",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      City: "Seattle",
      bazarManager: "Mia Garcia",
      zoneManager: "Nick Carter",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "$300",
      Actions: "",
    },
    {
      bazarName: "David Johnson",
      bazarAddress: "505 Elm Street",
      Status: "Expired",
      defaultRentOfPermanentStall: "$470",
      totalStalls: 8,
      Prefix: "DJ",
      bazarImage:
        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      City: "Denver",
      bazarManager: "Olivia Foster",
      zoneManager: "Paul Taylor",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "$260",
      Actions: "",
    },
  ];

  return (
    <Card className="w-full mt-4 bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Bazars list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all bazars
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
              size="sm"
              onClick={() => {
                navigate("/admin/create-bazar");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new bazar
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

      <CardBody className="px-4 ">
        <Tables columns={TABLE_HEAD} data={TABLE_ROWS} />
      </CardBody>
    </Card>
  );
}
