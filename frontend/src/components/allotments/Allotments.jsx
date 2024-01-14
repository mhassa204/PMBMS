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

export default function Allotments() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/transaction/create-allotments", { state: true });
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
    { Header: "Allotment Date", accessor: "allotmentDate" },
    { Header: "Stall ID", accessor: "stallId" },
    { Header: "Stall Holder Name", accessor: "stallHolderName" },
    { Header: "CNIC", accessor: "cnic" },
    { Header: "Monthly Rent", accessor: "monthlyRent" },
    { Header: "Face Image", accessor: "faceImage" },
    { Header: "CNIC Front Image", accessor: "cnicFrontImage" },
    { Header: "CNIC Back Image", accessor: "cnicBackImage" },
    { Header: "Agreement Start Date", accessor: "agreementStartDate" },
    { Header: "Agreement End Date", accessor: "agreementEndDate" },

    { Header: "Paid Security Voucher", accessor: "paidSecurityVoucher" },
    { Header: "Paid Security Date", accessor: "paidSecurityDate" },
    { Header: "Security Amount(Refundable)", accessor: "securityRefundable" },
    { Header: "Agreement Copy 1", accessor: "agreementCopy1" },
    { Header: "Agreement Copy 2", accessor: "agreementCopy2" },
    { Header: "Agreement Copy 3", accessor: "agreementCopy3" },

    {
      Header: "Print Agreement",
      accessor: "print",
      Cell: () => (
        <div className="flex gap-2">
          <p>Print Agreement </p>
        </div>
      ),
    },
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
      allotmentDate: "2024-01-13",
      stallId: "S101",
      stallHolderName: "John Doe",
      cnic: "12345-6789012-3",
      monthlyRent: 500,
      faceImage: "face_image_1.jpg",
      cnicFrontImage: "cnic_front_1.jpg",
      cnicBackImage: "cnic_back_1.jpg",
      agreementStartDate: "2024-01-14",
      agreementEndDate: "2024-06-14",
      paidSecurityVoucher: "PSV001",
      paidSecurityDate: "2024-01-15",
      securityRefundable: 300,
      agreementCopy1: "agreement_copy_1.pdf",
      agreementCopy2: "agreement_copy_2.pdf",
      agreementCopy3: "agreement_copy_3.pdf",
    },
    {
      allotmentDate: "2024-01-16",
      stallId: "S102",
      stallHolderName: "Jane Smith",
      cnic: "98765-4321098-7",
      monthlyRent: 700,
      faceImage: "face_image_2.jpg",
      cnicFrontImage: "cnic_front_2.jpg",
      cnicBackImage: "cnic_back_2.jpg",
      agreementStartDate: "2024-01-17",
      agreementEndDate: "2024-07-17",
      paidSecurityVoucher: "PSV002",
      paidSecurityDate: "2024-01-18",
      securityRefundable: 400,
      agreementCopy1: "agreement_copy_4.pdf",
      agreementCopy2: "agreement_copy_5.pdf",
      agreementCopy3: "agreement_copy_6.pdf",
    },
    {
      allotmentDate: "2024-01-19",
      stallId: "S103",
      stallHolderName: "Bob Johnson",
      cnic: "34567-8901234-5",
      monthlyRent: 600,
      faceImage: "face_image_3.jpg",
      cnicFrontImage: "cnic_front_3.jpg",
      cnicBackImage: "cnic_back_3.jpg",
      agreementStartDate: "2024-01-20",
      agreementEndDate: "2024-08-20",
      paidSecurityVoucher: "PSV003",
      paidSecurityDate: "2024-01-21",
      securityRefundable: 350,
      agreementCopy1: "agreement_copy_7.pdf",
      agreementCopy2: "agreement_copy_8.pdf",
      agreementCopy3: "agreement_copy_9.pdf",
    },
    {
      allotmentDate: "2024-01-22",
      stallId: "S104",
      stallHolderName: "Alice Williams",
      cnic: "67890-1234567-8",
      monthlyRent: 800,
      faceImage: "face_image_4.jpg",
      cnicFrontImage: "cnic_front_4.jpg",
      cnicBackImage: "cnic_back_4.jpg",
      agreementStartDate: "2024-01-23",
      agreementEndDate: "2024-09-23",
      paidSecurityVoucher: "PSV004",
      paidSecurityDate: "2024-01-24",
      securityRefundable: 450,
      agreementCopy1: "agreement_copy_10.pdf",
      agreementCopy2: "agreement_copy_11.pdf",
      agreementCopy3: "agreement_copy_12.pdf",
    },
    {
      allotmentDate: "2024-01-25",
      stallId: "S105",
      stallHolderName: "Charlie Brown",
      cnic: "23456-7890123-4",
      monthlyRent: 550,
      faceImage: "face_image_5.jpg",
      cnicFrontImage: "cnic_front_5.jpg",
      cnicBackImage: "cnic_back_5.jpg",
      agreementStartDate: "2024-01-26",
      agreementEndDate: "2024-10-26",
      paidSecurityVoucher: "PSV005",
      paidSecurityDate: "2024-01-27",
      securityRefundable: 380,
      agreementCopy1: "agreement_copy_13.pdf",
      agreementCopy2: "agreement_copy_14.pdf",
      agreementCopy3: "agreement_copy_15.pdf",
    },
    {
      allotmentDate: "2024-01-28",
      stallId: "S106",
      stallHolderName: "Eva Davis",
      cnic: "45678-9012345-6",
      monthlyRent: 900,
      faceImage: "face_image_6.jpg",
      cnicFrontImage: "cnic_front_6.jpg",
      cnicBackImage: "cnic_back_6.jpg",
      agreementStartDate: "2024-01-29",
      agreementEndDate: "2024-11-29",
      paidSecurityVoucher: "PSV006",
      paidSecurityDate: "2024-01-30",
      securityRefundable: 500,
      agreementCopy1: "agreement_copy_16.pdf",
      agreementCopy2: "agreement_copy_17.pdf",
      agreementCopy3: "agreement_copy_18.pdf",
    },
    {
      allotmentDate: "2024-01-31",
      stallId: "S107",
      stallHolderName: "David White",
      cnic: "78901-2345678-9",
      monthlyRent: 650,
      faceImage: "face_image_7.jpg",
      cnicFrontImage: "cnic_front_7.jpg",
      cnicBackImage: "cnic_back_7.jpg",
      agreementStartDate: "2024-02-01",
      agreementEndDate: "2024-12-01",
      paidSecurityVoucher: "PSV007",
      paidSecurityDate: "2024-02-02",
      securityRefundable: 420,
      agreementCopy1: "agreement_copy_19.pdf",
      agreementCopy2: "agreement_copy_20.pdf",
      agreementCopy3: "agreement_copy_21.pdf",
    },
    {
      allotmentDate: "2024-02-03",
      stallId: "S108",
      stallHolderName: "Grace Taylor",
      cnic: "89012-3456789-0",
      monthlyRent: 750,
      faceImage: "face_image_8.jpg",
      cnicFrontImage: "cnic_front_8.jpg",
      cnicBackImage: "cnic_back_8.jpg",
      agreementStartDate: "2024-02-04",
      agreementEndDate: "2025-02-04",
      paidSecurityVoucher: "PSV008",
      paidSecurityDate: "2024-02-05",
      securityRefundable: 470,
      agreementCopy1: "agreement_copy_22.pdf",
      agreementCopy2: "agreement_copy_23.pdf",
      agreementCopy3: "agreement_copy_24.pdf",
    },
    {
      allotmentDate: "2024-02-06",
      stallId: "S109",
      stallHolderName: "Frank Martin",
      cnic: "90123-4567890-1",
      monthlyRent: 450,
      faceImage: "face_image_9.jpg",
      cnicFrontImage: "cnic_front_9.jpg",
      cnicBackImage: "cnic_back_9.jpg",
      agreementStartDate: "2024-02-07",
      agreementEndDate: "2025-02-07",
      paidSecurityVoucher: "PSV009",
      paidSecurityDate: "2024-02-08",
      securityRefundable: 320,
      agreementCopy1: "agreement_copy_25.pdf",
      agreementCopy2: "agreement_copy_26.pdf",
      agreementCopy3: "agreement_copy_27.pdf",
    },
    {
      allotmentDate: "2024-02-09",
      stallId: "S110",
      stallHolderName: "Olivia Anderson",
      cnic: "12345-6789012-3",
      monthlyRent: 850,
      faceImage: "face_image_10.jpg",
      cnicFrontImage: "cnic_front_10.jpg",
      cnicBackImage: "cnic_back_10.jpg",
      agreementStartDate: "2024-02-10",
      agreementEndDate: "2025-02-10",
      paidSecurityVoucher: "PSV010",
      paidSecurityDate: "2024-02-11",
      securityRefundable: 490,
      agreementCopy1: "agreement_copy_28.pdf",
      agreementCopy2: "agreement_copy_29.pdf",
      agreementCopy3: "agreement_copy_30.pdf",
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
                Allotment list
              </Typography>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all allotments
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
                navigate("/admin/transaction/create-allotments");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new
              Allotment
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
