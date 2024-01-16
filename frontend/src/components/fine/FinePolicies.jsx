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
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { getPaginatedData } from "@hooks/getPaginatedData";
import { deleteAPI } from "@hooks/deleteAPI";
import { formatDate } from "@utils/formatDate";

export default function FinePolicies() {
  const navigate = useNavigate();
  const [finePolicies, setFinePolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isAvailable = useRef(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getPaginatedData("finepolicies", currentPage, 15);
      if (data.success) {
        console.log("data: ", data.data.finepolicies);
        const formatedPolicites = data.data.finepolicies.map((p) => {
          return {
            fineName: p.fineName,
            zone: p.zone.zoneName,
            bazarName: p.bazar.name,
            incomeCategory: p.incomeCategory.name,
            fineAfter10th: p.fineAfter10th,
            fineAfter20th: p.fineAfter20th,
            fineAfter25th: p.fineAfter25th,
            active: p.active,
            modifyDate: formatDate(p.modifyDate),
            bazarId: p.bazar._id,
            incomeCategoryId: p.incomeCategory._id,
            zoneId: p.zone._id,
            id: p._id,
          };
        });
        console.log("formated: ", formatedPolicites);
        setFinePolicies(formatedPolicites);
        setTotalPages(data.data.totalPages);
      } else {
        console.log("Error in getting data. ", data.error);
      }
    };
    if (isAvailable.current === false || currentPage) {
      getData();
      isAvailable.current = true;
    }
  }, [isAvailable, currentPage]);

  const TABLE_HEAD = [
    { Header: "Fine Name", accessor: "fineName" },
    { Header: "Zone", accessor: "zone" },
    { Header: "Bazar Name", accessor: "bazarName" },
    { Header: "Income Category", accessor: "incomeCategory" },
    { Header: "Fine % After 10th Date", accessor: "fineAfter10th" },
    { Header: "Fine % After 20th Date", accessor: "fineAfter20th" },
    { Header: "Fine % After 25th Date", accessor: "fineAfter25th" },
    { Header: "Active", accessor: "active" },
    { Header: "Modify Date", accessor: "modifyDate" },
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
    console.log("edit button clicked: ", data);
    navigate(`/admin/transaction/create-fine-policies`, {
      state: {
        edit: true,
        data: data,
      },
    });
  };

  const handleDelete = async (id) => {
    const d = await deleteAPI("finepolicies", id);
    if (d.success) {
      setFinePolicies(finePolicies.filter((p) => p.id !== id));
    } else {
      console.log("Error in deleting user. ", d.error);
    }
    console.log("delete button clicked: ", id);
  };

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
        <Tables columns={TABLE_HEAD} data={finePolicies} />
      </CardBody>
    </Card>
  );
}
