"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import IPdetails from "./IPdetails";
import NetWork from "./NetWork";
import Complain from "./Complain";
import Maintenance from "./Maintenance";
import SolvedReqNet from "./SolvedReqNet";
import "../../tab.css";
import { useState } from "react";

const NetWorkTab = () => {
  const dashboard = [
    "Network Complain",
    "Incoming-Requisition",
    "Completed Requisition",
    "Resolved-Case-Report",
    "Nabanna IP-Details",
  ];
  const [complainData, setComplainData] = useState([]);
  const [networkData, setNetworkData] = useState([]);

  // ✅ pending count logic
  const getPendingCount = (data) => {
    //console.log(data)
    const pendingData = data.filter((item) => item.status === "Pending");
    return pendingData.length;
  };
  return (
    <Tabs defaultActiveKey="Network Complain" className="custom-tabs" fill>
      {dashboard.map((page, i) => (
        <Tab
          eventKey={page}
          key={i}
          title={
            <span>
              {page}
              {/* 🔴 Badge for Complain */}
              {page === "Network Complain" &&
                getPendingCount(complainData) > 0 && (
                  <span className="tab-badge">
                    {getPendingCount(complainData)}
                  </span>
                )}
              {/* 🔴 Badge for NetWork */}
              {page === "Incoming-Requisition" &&
                getPendingCount(networkData) > 0 && (
                  <span className="tab-badge">
                    {getPendingCount(networkData)}
                  </span>
                )}
            </span>
          }
        >
          {page === "Network Complain" && (
            <Complain setData={setComplainData} />
          )}
          {page === "Incoming-Requisition" && (
            <NetWork setData={setNetworkData} />
          )}
          {page === "Completed Requisition" && <SolvedReqNet />}
          {page === "Resolved-Case-Report" && <Maintenance />}
          {page === "Nabanna IP-Details" && <IPdetails />}
        </Tab>
      ))}
    </Tabs>
  );
};

export default NetWorkTab;
