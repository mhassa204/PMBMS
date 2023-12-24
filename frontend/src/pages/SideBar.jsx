import React, { useState, useEffect } from "react";
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
import "@pages/home/home.css";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [open, setOpen] = useState(0);
  const [active, setActive] = useState("");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      setActive("dashboard");
    }
    // } else if (window.location.pathname === "/admin/companies") {
    //   setActive("AdminCompanies");
    // } else if (window.location.pathname === "/admin/jobs") {
    //   setActive("AdminJobs");
    // } else if (window.location.pathname === "/admin/settings") {
    //   setActive("AdminSettings");
    // }
  }, []);

  const handleNavigations = (path) => {
    setOpen(false);
    switch (path) {
      case "":
        setActive("dashboard");
        break;
      case "dashboard":
        setActive("dashboard");
        break;
      default:
        break;
    }
  };

  const styles = {
    prefixIcon: "h-5 h-5 me-2",
    listItem: "hover:bg-blue-100 hover:text-blue-900 h-[45px]",
    list: "p-0 flex flex-column",
    selectedListItem: "bg-blue-200 hover:text-blue-0 hover:bg-blue-200",
  };

  return (
    <Card className="h-full sidebar w-[260px] flex flex-column border-r-2 border-gray-100">
      <List className={"flex flex-column"}>
        <Link to="/dashboard">
          <ListItem
            onClick={() => setActive("Dashboard")}
            className={`${styles.listItem} ${
              active === "Dashboard" ? styles.selectedListItem : ""
            } `}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className={`${styles.prefixIcon}`} />
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
            <PresentationChartBarIcon className={`${styles.prefixIcon}`} />
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
                <PresentationChartBarIcon className={`${styles.prefixIcon}`} />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
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
              <Typography color="blue-gray" className="mr-auto font-normal">
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
        <ListItem
          onClick={() => setActive("Settings")}
          className={`${styles.listItem} ${
            active === "Settings" ? styles.selectedListItem : ""
          } `}
        >
          <ListItemPrefix>
            <Cog6ToothIcon className={`${styles.prefixIcon}`} />
          </ListItemPrefix>
          Settings
        </ListItem>
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
  );
}
