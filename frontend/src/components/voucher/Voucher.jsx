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

export default function Voucher() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/transaction/create-voucher", { state: true });
  };
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
    { Header: "Voucher", accessor: "voucher" },
    { Header: "Income Category", accessor: "incomeCategory" },
    { Header: "Shop Type Name", accessor: "shopTypeName" },
    { Header: "Shop", accessor: "shop" },
    { Header: "Shop Holder Name", accessor: "shopHolderName" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Due Date", accessor: "dueDate" },
    { Header: "Late Fine", accessor: "lateFine" },
    { Header: "Voucher For M/O", accessor: "voucherMonth" },
    { Header: "Bank Voucher", accessor: "bankVoucher" },
    { Header: "Paid Amount", accessor: "paidAmout" },
    { Header: "Paid Date", accessor: "paidDate" },
    { Header: "Waiver Amount", accessor: "waiverAmount" },
    { Header: "Balance", accessor: "balance" },

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
      voucher: "V001",
      incomeCategory: "Category A",
      shopTypeName: "Type X",
      shop: "Shop 101",
      shopHolderName: "John Doe",
      amount: 5000,
      dueDate: "2024-01-20",
      lateFine: 100,
      voucherMonth: "January",
      bankVoucher: "BV001",
      paidAmout: 4500,
      paidDate: "2024-01-21",
      waiverAmount: 0,
      balance: 500,
      Actions: null,
    },
    {
      voucher: "V002",
      incomeCategory: "Category B",
      shopTypeName: "Type Y",
      shop: "Shop 102",
      shopHolderName: "Jane Doe",
      amount: 7000,
      dueDate: "2024-01-22",
      lateFine: 150,
      voucherMonth: "January",
      bankVoucher: "BV002",
      paidAmout: 6900,
      paidDate: "2024-01-23",
      waiverAmount: 0,
      balance: 100,
      Actions: null,
    },
    {
      voucher: "V003",
      incomeCategory: "Category C",
      shopTypeName: "Type Z",
      shop: "Shop 103",
      shopHolderName: "Alice",
      amount: 6000,
      dueDate: "2024-01-25",
      lateFine: 120,
      voucherMonth: "January",
      bankVoucher: "BV003",
      paidAmout: 5900,
      paidDate: "2024-01-26",
      waiverAmount: 0,
      balance: 100,
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
                Vouchers
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all vouchers
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
                navigate("/admin/transaction/create-voucher");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new
              Voucher
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
