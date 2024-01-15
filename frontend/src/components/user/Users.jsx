import { UserPlusIcon } from "@heroicons/react/24/solid";
import { BrowserRouter as Router } from "react-router-dom";
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
import ViewButton from "@components/commonComponents/ViewButton";
import { useNavigate } from "react-router-dom";
import "@src/styles/tableStyles.css";
import Tables from "@components/commonComponents/Tables";

export default function Users() {
  const navigate = useNavigate();
  const TABS = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Supervisor",
      value: "supervisor",
    },
    {
      label: "Bazar Manager",
      value: "bazar-manager",
    },
  ];
  const columns = [
    { Header: "Username", accessor: "Username" },
    { Header: "Email", accessor: "Email" },
    { Header: "Mobile", accessor: "Mobile" },
    { Header: "City Name", accessor: "CityName" },
    { Header: "Status", accessor: "Status" },
    { Header: "User Type", accessor: "UserType" },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <ViewButton
            handleClick={() => {
              console.log(row.original);
              const user = row.original;
              navigate("/admin/view-user", { state: { user } });
              console.log("view button clicked");
            }}
          />
          <EditButton />
          <DeleteButton />
        </div>
      ),
    },
  ];

  const data = [
    {
      Username: "JohnDoe",
      Email: "john.doe@example.com",
      Mobile: "123-456-7890",
      CityName: "City A",
      Status: "Active",
      UserType: "Admin",
      Actions: "",
      id: 1,
    },
    {
      Username: "AliceSmith",
      Email: "alice.smith@example.com",
      Mobile: "987-654-3210",
      CityName: "City B",
      Status: "Inactive",
      UserType: "User",
      Actions: "",
      id: 2,
    },
    {
      Username: "BobJohnson",
      Email: "bob.johnson@example.com",
      Mobile: "111-222-3333",
      CityName: "City C",
      Status: "Active",
      UserType: "Admin",
      Actions: "",
      id: 3,
    },
    {
      Username: "EvaWhite",
      Email: "eva.white@example.com",
      Mobile: "555-666-7777",
      CityName: "City D",
      Status: "Inactive",
      UserType: "User",
      Actions: "",
      id: 4,
    },
    {
      Username: "CharlieBrown",
      Email: "charlie.brown@example.com",
      Mobile: "999-888-7777",
      CityName: "City E",
      Status: "Active",
      UserType: "Admin",
      Actions: "",
      id: 5,
    },
    {
      Username: "GraceMiller",
      Email: "grace.miller@example.com",
      Mobile: "444-555-6666",
      CityName: "City F",
      Status: "Inactive",
      UserType: "User",
      Actions: "",
      id: 6,
    },
    {
      Username: "DavidJohnson",
      Email: "david.johnson@example.com",
      Mobile: "777-888-9999",
      CityName: "City G",
      Status: "Active",
      UserType: "Admin",
      Actions: "",
      id: 7,
    },
    {
      Username: "OliviaFoster",
      Email: "olivia.foster@example.com",
      Mobile: "123-987-6543",
      CityName: "City H",
      Status: "Inactive",
      UserType: "User",
      Actions: "",
      id: 8,
    },
  ];

  return (
    <Card className="w-full mt-4 bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                dataSlot="icon"
                className="w-6 h-6 me-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              <Typography
                className="text-start m-0 text-2xl"
                variant="h5"
                color="blue-gray"
              >
                User list
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
              size="sm"
              onClick={() => {
                navigate("/admin/create-user");
              }}
            >
              <UserPlusIcon className="h-5 w-5" />
              Add new user
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab className="text-nowrap" key={value} value={value}>
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

      <CardBody className="px-4">
        <Tables columns={columns} data={data} />
      </CardBody>
    </Card>
  );
}
