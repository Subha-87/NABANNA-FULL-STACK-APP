"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../tab.css";
import UserComplain from "./UserComplain";
import UserDetails from "./UserDetails";
import PCreport from "./PCreport";
import NoAmc from "./NoAmc";
import Dashboard from "./Dashboard";
import "../../tab.css"


const PCTab = () => {
  const dashboard = [
    "User-Complain",
    "System Dashboard",
    "User-Machine Details",
    "Machine Repair",
    "Work-Report",
  ];
  return (
    <Tabs defaultActiveKey="System Dashboard" className="custom-tabs" fill>
      {dashboard.map((page, i) => (
        <Tab eventKey={page} title={page} key={i}>
          {page === "User-Complain" && <UserComplain />}
          {page === "System Dashboard" && <Dashboard/>}
          {page === "User-Machine Details" && <UserDetails />}
          {page === "Machine Repair" && <NoAmc />}
          {page === "Work-Report" && <PCreport />}

        </Tab>
      ))}
    </Tabs>
  );
};
export default PCTab;
