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
import { MdLocationCity } from "react-icons/md";
import { useEffect, useState } from "react";
import { getPaginatedData } from "@hooks/getPaginatedData";

export default function Zones() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const data = await getPaginatedData("zones", currentPage, 10);
      if (data.success) {
        console.log("zones are: ", data.data);

        const d = data.data.zones.map((zone) => ({
          zoneName: zone.zoneName,
          province: zone.province,
          zoneDistrict: zone.zoneDistrict,
          citiesInZone: zone.citiesInZone,
          zoneManager: zone.zoneManager,
          active: zone.active,
        }));
        console.log("zones are: ", d);
        setZones(d);
        setTotalPages(data.totalPages);
      } else {
        console.log("Error in fetching the zones. ", data.error);
      }
    };
    getData();
  }, []);

  const TABLE_HEAD = [
    { Header: "Zone Name", accessor: "zoneName" },
    { Header: "Province", accessor: "province" },
    { Header: "Zone District", accessor: "zoneDistrict" },
    { Header: "Cities in Zone", accessor: "citiesInZone" },
    { Header: "Zone Manager", accessor: "zoneManager" },
    { Header: "Active", accessor: "active" },
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
    <Card className="w-full bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <div className="flex items-center">
              <MdLocationCity className="h-6 w-6" />
              <Typography className="text-start m-0 ms-1 text-2xl" variant="h5">
                Zone list
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all zones
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
              size="sm"
              onClick={() => {
                navigate("/admin/create-zone");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new zone
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Tables columns={TABLE_HEAD} data={zones} />
      </CardBody>
    </Card>
  );
}
