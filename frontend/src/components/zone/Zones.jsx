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

export default function Zones() {
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
    { Header: "Zone Name", accessor: "ZoneName" },
    { Header: "Province", accessor: "Province" },
    { Header: "Cities in Zone", accessor: "CitiesInZone" },
    { Header: "Zone Manager", accessor: "ZoneManager" },
    { Header: "Zone District", accessor: "ZoneDistrict" },
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
      ZoneName: "Central Zone",
      Province: "Central",
      CitiesInZone: ["City A", "City B", "City C"],
      ZoneManager: "Alice Doe",
      ZoneDistrict: "District X",
      Actions: "",
    },
    {
      ZoneName: "Eastern Zone",
      Province: "Eastern",
      CitiesInZone: ["City D", "City E", "City F"],
      ZoneManager: "Bob Smith",
      ZoneDistrict: "District Y",
      Actions: "",
    },
    {
      ZoneName: "Western Zone",
      Province: "Western",
      CitiesInZone: ["City G", "City H", "City I"],
      ZoneManager: "Charlie Brown",
      ZoneDistrict: "District Z",
      Actions: "",
    },
    {
      ZoneName: "Northern Zone",
      Province: "Northern",
      CitiesInZone: ["City J", "City K", "City L"],
      ZoneManager: "David Johnson",
      ZoneDistrict: "District W",
      Actions: "",
    },
    {
      ZoneName: "Southern Zone",
      Province: "Southern",
      CitiesInZone: ["City M", "City N", "City O"],
      ZoneManager: "Eva White",
      ZoneDistrict: "District V",
      Actions: "",
    },
    {
      ZoneName: "Central-East Zone",
      Province: "Central-East",
      CitiesInZone: ["City P", "City Q", "City R"],
      ZoneManager: "Frank Adams",
      ZoneDistrict: "District U",
      Actions: "",
    },
    {
      ZoneName: "South-West Zone",
      Province: "South-West",
      CitiesInZone: ["City S", "City T", "City U"],
      ZoneManager: "Grace Miller",
      ZoneDistrict: "District T",
      Actions: "",
    },
    {
      ZoneName: "North-West Zone",
      Province: "North-West",
      CitiesInZone: ["City V", "City W", "City X"],
      ZoneManager: "Henry Clark",
      ZoneDistrict: "District S",
      Actions: "",
    },
  ];

  return (
    <Card className="w-full mt-4 bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Zone list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all zones
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex bg-[#0b6323] rounded-none items-center gap-2"
              size="sm"
              onClick={() => {
                navigate("/admin/create-zone");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new zone
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
        {/* <table className="mt-4 table-scroll w-full h-full table-auto text-left">
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
                {
                  bazarName,
                  bazarAddress,
                  Status,
                  defaultRentOfPermanentStall,
                  totalStalls,
                  Prefix,
                  bazarImage,
                  City,
                  bazarManager,
                  zoneManager,
                  temporaryStall,
                  defaultRentOfTemporaryStall,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index} className="bg-white">
                    <td className={classes}>
                      <div className="flex items-center min-w-[200px] gap-3">
                        <Avatar
                          src={bazarImage}
                          alt={bazarName}
                          size=""
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {bazarName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {bazarAddress}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {bazarManager}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {zoneManager}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={Status}
                          color={Status === "Active" ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {defaultRentOfPermanentStall}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {totalStalls}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Prefix}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {City}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {temporaryStall}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {defaultRentOfTemporaryStall}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {zoneManager}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {temporaryStall}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {defaultRentOfTemporaryStall}
                      </Typography>
                    </td>

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
        </table> */}
        <Tables columns={TABLE_HEAD} data={TABLE_ROWS} />
      </CardBody>
    </Card>
  );
}
