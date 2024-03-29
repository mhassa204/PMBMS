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
import profilePic from "@images/me.png";
import bazar from "@images/bazar.jpg";
import { useEffect, useRef, useState } from "react";
import { getPaginatedData } from "@hooks/getPaginatedData";

export default function Bazars() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bazars, setBazars] = useState([]);
  const isAvailable = useRef(false);

  const TABLE_HEAD = [
    { Header: "Bazar Name", accessor: "name" },
    { Header: "Bazar Address", accessor: "address" },
    { Header: "Active", accessor: "active" },
    { Header: "Total Stalls", accessor: "totalShops" },
    { Header: "Prefix", accessor: "prefix" },
    { Header: "Bazar Image", accessor: "bazarImage" },
    { Header: "City", accessor: "city" },
    { Header: "Bazar Manager", accessor: "bazarManager" },
    { Header: "Zone", accessor: "zone" },
    { Header: "Zone Manager", accessor: "zoneManager" },
    { Header: "Supervisor", accessor: "supervisor" },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <EditButton onClick={() => handleEdit(row.original)} />
          <DeleteButton onClick={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];

  const handleEdit = (data) => {
    navigate(`/admin/basic/create-bazar`, {
      state: {
        edit: true,
        data: data,
      },
    });
  };

  const handleDelete = (id) => {
    console.log("delete button clicked: ", id);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getPaginatedData("bazars", currentPage, 10);
      if (data.success) {
        setBazars(data.data.bazars);
        setTotalPages(data.data.totalPages);
      } else {
        console.log(data.error);
      }
    };
    if (isAvailable.current === false || currentPage) {
      getData();
      isAvailable.current = true;
    }
  }, [isAvailable, currentPage]);

  return (
    <Card className="w-full bazar-list">
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
                navigate("/admin/basic/create-bazar");
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

      <CardBody>
        <Tables
          columns={TABLE_HEAD}
          data={bazars}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardBody>
    </Card>
  );
}
