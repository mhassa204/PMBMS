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

export default function Users() {
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
    "Username",
    "Email",
    "Mobile",
    "City Name",
    "Status",
    "User Type",
    "Actions",
  ];
  const TABLE_ROWS = [
    {
      Username: "JohnDoe",
      Email: "john.doe@example.com",
      Mobile: "123-456-7890",
      CityName: "City A",
      Status: "Active",
      UserType: "Admin",
    },
    {
      Username: "AliceSmith",
      Email: "alice.smith@example.com",
      Mobile: "987-654-3210",
      CityName: "City B",
      Status: "Inactive",
      UserType: "User",
    },
    {
      Username: "BobJohnson",
      Email: "bob.johnson@example.com",
      Mobile: "111-222-3333",
      CityName: "City C",
      Status: "Active",
      UserType: "Admin",
    },
    {
      Username: "EvaWhite",
      Email: "eva.white@example.com",
      Mobile: "555-666-7777",
      CityName: "City D",
      Status: "Inactive",
      UserType: "User",
    },
    {
      Username: "CharlieBrown",
      Email: "charlie.brown@example.com",
      Mobile: "999-888-7777",
      CityName: "City E",
      Status: "Active",
      UserType: "Admin",
    },
    {
      Username: "GraceMiller",
      Email: "grace.miller@example.com",
      Mobile: "444-555-6666",
      CityName: "City F",
      Status: "Inactive",
      UserType: "User",
    },
    {
      Username: "DavidJohnson",
      Email: "david.johnson@example.com",
      Mobile: "777-888-9999",
      CityName: "City G",
      Status: "Active",
      UserType: "Admin",
    },
    {
      Username: "OliviaFoster",
      Email: "olivia.foster@example.com",
      Mobile: "123-987-6543",
      CityName: "City H",
      Status: "Inactive",
      UserType: "User",
    },
  ];

  return (
    <Card className="w-full mt-4 bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              User list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex bg-[#0b6323] rounded-none items-center gap-2"
              size="sm"
              onClick={() => {
                navigate("/admin/create-user");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new user
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
        </div>
      </CardHeader>

      <CardBody className="px-4 ">
        <table className="mt-4 table-scroll w-full h-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-[#2f9149] p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 text-white font-semibold leading-none opacity-"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                { Username, Email, Mobile, CityName, Status, UserType },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index} className="bg-white">
                    {/* Zone Name */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Username}
                      </Typography>
                    </td>
                    {/* Province */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Email}
                      </Typography>
                    </td>
                    {/* Cities in Zone */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Mobile}
                      </Typography>
                    </td>
                    {/* Zone Manager */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        // color="blue-gray"
                        className="font-normal"
                      >
                        {CityName}
                      </Typography>
                    </td>
                    {/* Zone District */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {UserType}
                      </Typography>
                    </td>
                    {/* Actions (Edit and Delete buttons) */}
                    <td className={classes}>
                      <div className="flex gap-2">
                        <EditButton />
                        <DeleteButton />
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 py-4 mb-4 mx-">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
