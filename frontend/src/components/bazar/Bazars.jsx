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
import profilePic from "@images/me.png";
import bazar from "@images/bazar.jpg";

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
      bazarName: "Ahmed Bazar",
      bazarAddress: "123 Main Street, Lahore",
      Status: "Active",
      defaultRentOfPermanentStall: "₨500",
      totalStalls: 10,
      Prefix: "ABZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Lahore",
      bazarManager: "Ali Ahmed",
      zoneManager: "Zohaib Khan",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "₨300",
      Actions: "",
    },
    {
      bazarName: "Faisalabad Market",
      bazarAddress: "456 Elm Street, Faisalabad",
      Status: "Inactive",
      defaultRentOfPermanentStall: "₨450",
      totalStalls: 8,
      Prefix: "FBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Faisalabad",
      bazarManager: "Farah Naz",
      zoneManager: "Zain Ul Abidin",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "₨250",
      Actions: "",
    },
    {
      bazarName: "Karim Market",
      bazarAddress: "789 Oak Street, Karachi",
      Status: "Pending",
      defaultRentOfPermanentStall: "₨600",
      totalStalls: 12,
      Prefix: "KBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Karachi",
      bazarManager: "Khadija Javed",
      zoneManager: "Bilal Ahmed",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "₨350",
      Actions: "",
    },
    {
      bazarName: "Rahim Market",
      bazarAddress: "101 Pine Street, Rawalpindi",
      Status: "Active",
      defaultRentOfPermanentStall: "₨550",
      totalStalls: 11,
      Prefix: "RBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Rawalpindi",
      bazarManager: "Rukhsar Shah",
      zoneManager: "Tariq Mehmood",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "₨275",
      Actions: "",
    },
    {
      bazarName: "Saima Market",
      bazarAddress: "202 Cedar Street, Islamabad",
      Status: "Inactive",
      defaultRentOfPermanentStall: "₨480",
      totalStalls: 9,
      Prefix: "SBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Islamabad",
      bazarManager: "Saba Malik",
      zoneManager: "Umar Khan",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "₨325",
      Actions: "",
    },
    {
      bazarName: "Gulshan Bazar",
      bazarAddress: "303 Maple Street, Peshawar",
      Status: "Active",
      defaultRentOfPermanentStall: "₨520",
      totalStalls: 13,
      Prefix: "GBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Peshawar",
      bazarManager: "Ghulam Abbas",
      zoneManager: "Tahira Batool",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "₨280",
      Actions: "",
    },
    {
      bazarName: "Iqbal Market",
      bazarAddress: "404 Birch Street, Quetta",
      Status: "Blocked",
      defaultRentOfPermanentStall: "₨490",
      totalStalls: 10,
      Prefix: "IBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Quetta",
      bazarManager: "Imran Khan",
      zoneManager: "Nadia Akhtar",
      temporaryStall: "Yes",
      defaultRentOfTemporaryStall: "₨300",
      Actions: "",
    },
    {
      bazarName: "Zia Bazar",
      bazarAddress: "505 Elm Street, Multan",
      Status: "Expired",
      defaultRentOfPermanentStall: "₨470",
      totalStalls: 8,
      Prefix: "ZBZ",
      bazarImage:
        "https://propakistani.pk/wp-content/uploads/2022/12/Landa-Bazar.jpg",
      City: "Multan",
      bazarManager: "Zainab Ali",
      zoneManager: "Usman Ghani",
      temporaryStall: "No",
      defaultRentOfTemporaryStall: "₨260",
      Actions: "",
    },
  ];

  return (
    <Card className="w-full mt-4 bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <div className="flex items-center">
              {/* <img src={bazar} alt="bazar" className="w-8 h-8 rounded-full" /> */}
              <Typography className="text-start" variant="h5" color="blue-gray">
                Bazars list
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all bazars
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
                navigate("/admin/create-bazar");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new bazar
            </Button>
          </div>
        </div>
        {/* <div className="flex  flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <div className="relative flex w-full flex-wrap items-stretch">
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
