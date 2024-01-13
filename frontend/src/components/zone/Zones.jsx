import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import EditButton from "@components/commonComponents/EditButton";
import DeleteButton from "@components/commonComponents/DeleteButton";
import { useNavigate } from "react-router-dom";
import "@src/styles/tableStyles.css";
import Tables from "@components/commonComponents/Tables";
import { MdLocationCity } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { getPaginatedData } from "@hooks/getPaginatedData";

export default function Zones() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isAvailable = useRef(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getPaginatedData("zones", currentPage, 10);
      if (data.success) {
        const d = data.data.zones.map((zone) => ({
          zoneName: zone.zoneName,
          province: zone.province,
          zoneDistrict: zone.zoneDistrict,
          citiesInZone: zone.citiesInZone,
          zoneManager: zone.zoneManager,
          active: zone.active,
          id: zone._id,
        }));
        setZones(d);
        setTotalPages(data.totalPages);
      } else {
        console.log("Error in fetching the zones. ", data.error);
      }
    };
    if (isAvailable.current === false) {
      getData();
      isAvailable.current = true;
    }
  }, [isAvailable]);

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
                navigate("/admin/basic/create-zone");
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
