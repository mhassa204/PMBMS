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

export default function SecurityAdjustiment() {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isAvailable = useRef(false);

  const handleClick = () => {
    navigate("/admin/transaction/create-security-adjustments", { state: true });
  };

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
    { Header: "Bazar Name", accessor: "bazarName" },
    { Header: "Stall", accessor: "stall" },
    { Header: "Stall Holder Name", accessor: "stallHolderName" },
    { Header: "Date", accessor: "date" },
    { Header: "Security Voucher #", accessor: "securityVoucher" },
    { Header: "Security Deposit Amount", accessor: "securityDepositAmount" },
    { Header: "Security Deposit Date", accessor: "securityDepositDate" },
    { Header: "Arrear Unique Vchr.ID", accessor: "arrearUniqueVchr" },
    { Header: "Arrear Vchr Amt", accessor: "arrearVchrAmt" },
    { Header: "Cash Refund Amt", accessor: "cashRefundAmt" },
    { Header: "Balance Amt", accessor: "balanceAmt" },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: () => (
        <div className="flex gap-2">
          <EditButton
            onClick={() => {
              handleClick();
            }}
          />
          <DeleteButton />
        </div>
      ),
    },
  ];
  const TABLE_ROWS = [
    {
      bazarName: "Bazar 1",
      stall: "Stall 101",
      stallHolderName: "John Doe",
      date: "2024-01-13",
      securityVoucher: "SV001",
      securityDepositAmount: 500,
      securityDepositDate: "2024-01-14",
      arrearUniqueVchr: "AV001",
      arrearVchrAmt: 200,
      cashRefundAmt: 50,
      balanceAmt: 150,
    },
    {
      bazarName: "Bazar 2",
      stall: "Stall 102",
      stallHolderName: "Jane Smith",
      date: "2024-01-15",
      securityVoucher: "SV002",
      securityDepositAmount: 700,
      securityDepositDate: "2024-01-16",
      arrearUniqueVchr: "AV002",
      arrearVchrAmt: 300,
      cashRefundAmt: 100,
      balanceAmt: 200,
    },
    {
      bazarName: "Bazar 3",
      stall: "Stall 103",
      stallHolderName: "Bob Johnson",
      date: "2024-01-17",
      securityVoucher: "SV003",
      securityDepositAmount: 600,
      securityDepositDate: "2024-01-18",
      arrearUniqueVchr: "AV003",
      arrearVchrAmt: 150,
      cashRefundAmt: 75,
      balanceAmt: 75,
    },
    {
      bazarName: "Bazar 4",
      stall: "Stall 104",
      stallHolderName: "Alice Williams",
      date: "2024-01-19",
      securityVoucher: "SV004",
      securityDepositAmount: 800,
      securityDepositDate: "2024-01-20",
      arrearUniqueVchr: "AV004",
      arrearVchrAmt: 250,
      cashRefundAmt: 120,
      balanceAmt: 130,
    },
    {
      bazarName: "Bazar 5",
      stall: "Stall 105",
      stallHolderName: "Charlie Brown",
      date: "2024-01-21",
      securityVoucher: "SV005",
      securityDepositAmount: 550,
      securityDepositDate: "2024-01-22",
      arrearUniqueVchr: "AV005",
      arrearVchrAmt: 180,
      cashRefundAmt: 60,
      balanceAmt: 120,
    },
    {
      bazarName: "Bazar 6",
      stall: "Stall 106",
      stallHolderName: "Eva Davis",
      date: "2024-01-23",
      securityVoucher: "SV006",
      securityDepositAmount: 900,
      securityDepositDate: "2024-01-24",
      arrearUniqueVchr: "AV006",
      arrearVchrAmt: 400,
      cashRefundAmt: 200,
      balanceAmt: 200,
    },
    {
      bazarName: "Bazar 7",
      stall: "Stall 107",
      stallHolderName: "David White",
      date: "2024-01-25",
      securityVoucher: "SV007",
      securityDepositAmount: 650,
      securityDepositDate: "2024-01-26",
      arrearUniqueVchr: "AV007",
      arrearVchrAmt: 300,
      cashRefundAmt: 100,
      balanceAmt: 200,
    },
    {
      bazarName: "Bazar 8",
      stall: "Stall 108",
      stallHolderName: "Grace Taylor",
      date: "2024-01-27",
      securityVoucher: "SV008",
      securityDepositAmount: 750,
      securityDepositDate: "2024-01-28",
      arrearUniqueVchr: "AV008",
      arrearVchrAmt: 120,
      cashRefundAmt: 80,
      balanceAmt: 40,
    },
    {
      bazarName: "Bazar 9",
      stall: "Stall 109",
      stallHolderName: "Frank Martin",
      date: "2024-01-29",
      securityVoucher: "SV009",
      securityDepositAmount: 450,
      securityDepositDate: "2024-01-30",
      arrearUniqueVchr: "AV009",
      arrearVchrAmt: 100,
      cashRefundAmt: 50,
      balanceAmt: 50,
    },
    {
      bazarName: "Bazar 10",
      stall: "Stall 110",
      stallHolderName: "Olivia Anderson",
      date: "2024-01-31",
      securityVoucher: "SV010",
      securityDepositAmount: 850,
      securityDepositDate: "2024-02-01",
      arrearUniqueVchr: "AV010",
      arrearVchrAmt: 220,
      cashRefundAmt: 110,
      balanceAmt: 110,
    },
    {
      bazarName: "Bazar 11",
      stall: "Stall 111",
      stallHolderName: "Henry Thomas",
      date: "2024-02-02",
      securityVoucher: "SV011",
      securityDepositAmount: 620,
      securityDepositDate: "2024-02-03",
      arrearUniqueVchr: "AV011",
      arrearVchrAmt: 180,
      cashRefundAmt: 70,
      balanceAmt: 110,
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
                Security Adjustments List
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all security adjustments
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
              size="sm"
              onClick={() => {
                navigate("/admin/transaction/create-security-adjustments");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new
              Security Adjustment
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Tables columns={TABLE_HEAD} data={TABLE_ROWS} />
      </CardBody>
    </Card>
  );
}
