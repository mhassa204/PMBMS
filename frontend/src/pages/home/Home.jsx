import React, { useState, useRef, useEffect } from "react";
import SideBar from "../SideBar";
import { BellIcon } from "@heroicons/react/24/solid";
import profilePic from "@images/me.png";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import "@pages/home/home.css";
import { Outlet, Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [open, setOpen] = useState(0);
  const [active, setActive] = useState("dashboard");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const styles = {
    prefixIcon: "h-5 h-5 me-2",
    listItem: "hover:bg-blue-100 font-semibold hover:text-blue-900 h-[45px]",
    list: "p-0 flex flex-column",
    selectedListItem: "bg-blue-200 hover:text-blue-0 hover:bg-blue-200",
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/dashboard" || "/admin/dashboard") {
      setActive("dashboard");
    } else if (window.location.pathname === "/admin/settings") {
      setActive("settings");
    }
    // } else if (window.location.pathname === "/admin/companies") {
    //   setActive("AdminCompanies");
    // } else if (window.location.pathname === "/admin/jobs") {
    //   setActive("AdminJobs");
    // } else if (window.location.pathname === "/admin/settings") {
    //   setActive("AdminSettings");
    // }
  }, []);

  return (
    <div className="main">
      <div className="">
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute  top-12 right-10 w-40 bg-white shadow-lg rounded py-2 z-10"
          >
            <button className="block w-full drops bg-transparent px-4 py-2 border-none hover:bg-indigo-500">
              Settings
            </button>
            <button className="block w-full  bg-white px-4 py-2 hover:bg-blue-500 ">
              Logout
            </button>
          </div>
        )}

        <div
          className={`w-full h-14 bg- border-b-2 border-gray-100 flex items-center justify-between `}
        >
          <div className=" flex items-center w-[260px] ">
            <button className=" flex items-center ms-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                dataSlot="icon"
                className="w-8 h-8 me-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                />
              </svg>
              <h5 className="font-bold text-[20px] m-0">GovBazar</h5>
            </button>
          </div>
          <div className=" flex items-center justify-between px-[2%] relative">
            <div className="flex">
              <button
                onClick={() => {
                  setShowSearchInput(!showSearchInput);
                }}
                className=" me-3"
              >
                <FaSearch className="w-5 h-5" />
              </button>
              <button className=" me-3">
                <BellIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex gap-2 bg-transparent items-center border-none"
              >
                <img
                  src={profilePic}
                  alt="brand"
                  className="h-10 w-10 border-1 rounded-full"
                />
                <p className="m-0 text-[15px] font-bold">Ahmad</p>
                <FaAngleDown className="h-5 w-6" />
              </button>

              {/* <button
                  className="admin-head"
                  style={{ marginRight: "3%" }}
                  onClick={() => setOpen(true)}
                >
                  <Bars3Icon className="h-7 w-7" />
                </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex main-body ">
        <div className=" w-[260px] min-h-[90vh]">
          <Card className="h-full sidebar w-[260px] flex flex-column border-r-2 border-gray-100">
            <List className={"flex flex-column"}>
              <Link
                to="dashboard"
                className="text-decoration-none "
                style={{ color: "#0d1130" }}
                onClick={() => {
                  setActive("dashbaord");
                }}
              >
                <ListItem
                  className={`${styles.listItem} ${
                    active === "dashboard" ? styles.selectedListItem : ""
                  } `}
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon
                      className={`${styles.prefixIcon}`}
                    />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </Link>
              <ListItem
                onClick={() => setActive("Basic Info")}
                className={`${styles.listItem} ${
                  active === "Basic Info" ? styles.selectedListItem : ""
                } `}
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon
                    className={`${styles.prefixIcon}`}
                  />
                </ListItemPrefix>
                Basic Info
              </ListItem>

              <Accordion
                open={open === 1}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto  h-4 w-4 transition-transform ${
                      open === 1 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0 " selected={open === 1}>
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className={`p-3 border-none ${styles.listItem}`}
                  >
                    <ListItemPrefix>
                      <PresentationChartBarIcon
                        className={`${styles.prefixIcon}`}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-semibold"
                    >
                      Dashboard
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1 ">
                  <List className={`${styles.list}`}>
                    <ListItem className={`${styles.listItem}`}>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className={`${styles.prefixIcon}`}
                        />
                      </ListItemPrefix>
                      Analytics
                    </ListItem>
                    <ListItem className={`${styles.listItem}`}>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className={`${styles.prefixIcon}`}
                        />
                      </ListItemPrefix>
                      Reporting
                    </ListItem>
                    <ListItem className={`${styles.listItem}`}>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className={`${styles.prefixIcon}`}
                        />
                      </ListItemPrefix>
                      Projects
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 2 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className={`p-3 border-none ${styles.listItem}`}
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className={`${styles.prefixIcon}`} />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-semibold"
                    >
                      E-Commerce
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className={`${styles.list}`}>
                    <ListItem className={`${styles.listItem}`}>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className={`${styles.prefixIcon}`}
                        />
                      </ListItemPrefix>
                      Orders
                    </ListItem>
                    <ListItem className={`${styles.listItem}`}>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className={`${styles.prefixIcon}`}
                        />
                      </ListItemPrefix>
                      Products
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <ListItem className={`${styles.listItem}`}>
                <ListItemPrefix>
                  <InboxIcon className={`${styles.prefixIcon}`} />
                </ListItemPrefix>
                Inbox
              </ListItem>
              <ListItem
                onClick={() => setActive("Profile")}
                className={`${styles.listItem} ${
                  active === "Profile" ? styles.selectedListItem : ""
                } `}
              >
                <ListItemPrefix>
                  <UserCircleIcon className={`${styles.prefixIcon}`} />
                </ListItemPrefix>
                Profile
              </ListItem>
              <Link
                to="settings"
                className="text-decoration-none "
                style={{ color: "#0d1130" }}
                onClick={() => {
                  setActive("settings");
                }}
              >
                <ListItem
                  // onClick={() => setActive("Settings")}
                  className={`${styles.listItem} ${
                    active === "settings" ? styles.selectedListItem : ""
                  } `}
                >
                  <ListItemPrefix>
                    <Cog6ToothIcon className={`${styles.prefixIcon}`} />
                  </ListItemPrefix>
                  Settings
                </ListItem>
              </Link>
              <ListItem
                onClick={() => setActive("Logout")}
                className={`${styles.listItem} ${
                  active === "Logout" ? styles.selectedListItem : ""
                } `}
              >
                <ListItemPrefix>
                  <PowerIcon className={`${styles.prefixIcon}`} />
                </ListItemPrefix>
                Logout
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="sidebar w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
