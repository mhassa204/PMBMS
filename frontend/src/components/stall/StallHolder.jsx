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

export default function StallHolder() {
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
  const columns = [
    { Header: "Prefix", accessor: "Prefix" },
    { Header: "Stall Holder Name", accessor: "StallHolderName" },
    { Header: "Father/Husband Name", accessor: "FatherHusbandName" },
    { Header: "DOB", accessor: "DOB" },
    { Header: "CNIC", accessor: "CNIC" },
    { Header: "CNIC Expiry", accessor: "CNICExpiry" },
    { Header: "Gender", accessor: "Gender" },
    { Header: "Primary Contact", accessor: "PrimaryContact" },
    { Header: "CNIC Front Image", accessor: "CNICFrontImage" },
    { Header: "CNIC Back Image", accessor: "CNICBackImage" },
    { Header: "Face Picture", accessor: "FacePicture" },
    { Header: "Biometric Image", accessor: "BiometricImage" },
    { Header: "Status", accessor: "Status" },
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

  const data = [
    {
      Prefix: "SH001",
      StallHolderName: "John Doe",
      FatherHusbandName: "Michael Doe",
      DOB: "1990-05-15",
      CNIC: "12345-6789012-3",
      CNICExpiry: "2025-05-15",
      Gender: "Male",
      PrimaryContact: "+1 123 456 7890",
      CNICFrontImage: "https://i.imgur.com/12345.jpg",
      CNICBackImage: "https://i.imgur.com/67890.jpg",
      FacePicture: "https://i.imgur.com/abcde.jpg",
      BiometricImage: "https://i.imgur.com/uvwxy.jpg",
      Status: "Active",
      Actions: "",
    },
    {
      Prefix: "SH002",
      StallHolderName: "Alice Johnson",
      FatherHusbandName: "David Johnson",
      DOB: "1985-08-20",
      CNIC: "98765-4321098-7",
      CNICExpiry: "2024-08-20",
      Gender: "Female",
      PrimaryContact: "+1 987 654 3210",
      CNICFrontImage: "https://i.imgur.com/fghij.jpg",
      CNICBackImage: "https://i.imgur.com/klmno.jpg",
      FacePicture: "https://i.imgur.com/pqrst.jpg",
      BiometricImage: "https://i.imgur.com/uvwxy.jpg",
      Status: "Inactive",
      Actions: "",
    },
    {
      Prefix: "SH003",
      StallHolderName: "Bob Smith",
      FatherHusbandName: "Charlie Smith",
      DOB: "1988-12-10",
      CNIC: "56789-0123456-8",
      CNICExpiry: "2023-12-10",
      Gender: "Male",
      PrimaryContact: "+1 567 890 1234",
      CNICFrontImage: "https://i.imgur.com/uvwxy.jpg",
      CNICBackImage: "https://i.imgur.com/ijklm.jpg",
      FacePicture: "https://i.imgur.com/nopqr.jpg",
      BiometricImage: "https://i.imgur.com/xyzab.jpg",
      Status: "Active",
      Actions: "",
    },
    {
      Prefix: "SH004",
      StallHolderName: "Eva White",
      FatherHusbandName: "Frank White",
      DOB: "1992-03-25",
      CNIC: "34567-8901234-5",
      CNICExpiry: "2026-03-25",
      Gender: "Female",
      PrimaryContact: "+1 345 678 9012",
      CNICFrontImage: "https://i.imgur.com/12345.jpg",
      CNICBackImage: "https://i.imgur.com/67890.jpg",
      FacePicture: "https://i.imgur.com/abcde.jpg",
      BiometricImage: "https://i.imgur.com/ijklm.jpg",
      Status: "Active",
      Actions: "",
    },
    {
      Prefix: "SH005",
      StallHolderName: "Grace Miller",
      FatherHusbandName: "Henry Miller",
      DOB: "1987-07-08",
      CNIC: "87654-3210987-6",
      CNICExpiry: "2022-07-08",
      Gender: "Female",
      PrimaryContact: "+1 876 543 2109",
      CNICFrontImage: "https://i.imgur.com/fghij.jpg",
      CNICBackImage: "https://i.imgur.com/klmno.jpg",
      FacePicture: "https://i.imgur.com/pqrst.jpg",
      BiometricImage: "https://i.imgur.com/xyzab.jpg",
      Status: "Inactive",
      Actions: "",
    },
    {
      Prefix: "SH006",
      StallHolderName: "Frank Adams",
      FatherHusbandName: "George Adams",
      DOB: "1995-11-18",
      CNIC: "23456-7890123-4",
      CNICExpiry: "2027-11-18",
      Gender: "Male",
      PrimaryContact: "+1 234 567 8901",
      CNICFrontImage: "https://i.imgur.com/nopqr.jpg",
      CNICBackImage: "https://i.imgur.com/ijklm.jpg",
      FacePicture: "https://i.imgur.com/pqrst.jpg",
      BiometricImage: "https://i.imgur.com/xyzab.jpg",
      Status: "Active",
      Actions: "",
    },
    {
      Prefix: "SH007",
      StallHolderName: "Mia Garcia",
      FatherHusbandName: "Nick Garcia",
      DOB: "1989-02-14",
      CNIC: "45678-9012345-6",
      CNICExpiry: "2023-02-14",
      Gender: "Female",
      PrimaryContact: "+1 456 789 0123",
      CNICFrontImage: "https://i.imgur.com/12345.jpg",
      CNICBackImage: "https://i.imgur.com/67890.jpg",
      FacePicture: "https://i.imgur.com/abcde.jpg",
      BiometricImage: "https://i.imgur.com/uvwxy.jpg",
      Status: "Inactive",
      Actions: "",
    },
    {
      Prefix: "SH008",
      StallHolderName: "Olivia Foster",
      FatherHusbandName: "Paul Foster",
      DOB: "1993-09-30",
      CNIC: "67890-1234567-8",
      CNICExpiry: "2028-09-30",
      Gender: "Female",
      PrimaryContact: "+1 678 901 2345",
      CNICFrontImage: "https://i.imgur.com/fghij.jpg",
      CNICBackImage: "https://i.imgur.com/klmno.jpg",
      FacePicture: "https://i.imgur.com/pqrst.jpg",
      BiometricImage: "https://i.imgur.com/xyzab.jpg",
      Status: "Active",
      Actions: "",
    },
  ];

  return (
    <Card className="w-full mt-4 bazar-list">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography className="text-start" variant="h5" color="blue-gray">
              Stall holder list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all stall holders
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex bg-[#0b6323] rounded-none items-center gap-2"
              size="sm"
              onClick={() => {
                navigate("/admin/create-stallHolder");
              }}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add new stall
              holder
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
        <Tables columns={columns} data={data} />
      </CardBody>
    </Card>
  );
}
