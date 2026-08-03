"use client";
import Complain from "./Complain";
import Letter from "./Letter";
import BoxDetails from "./BoxDetails";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "../../tab.css";
import { useState } from "react";

const BoxTab = () => {
  const [complainData, setComplainData] = useState([]);
  const [catvData, setCatvData] = useState([]);
  const dashboard = ["User-Complain", "User Requistion", "Set-Top Box Details"];

  // ✅ pending count logic
  const getPendingCount = (data) => {
    //console.log(data)
    const pendingData = data.filter((item) => item.status === "Pending");
    return pendingData.length;
  };
  return (
    <Tabs defaultActiveKey="User-Complain" className="custom-tabs" fill>
      {dashboard.map((page, i) => (
        <Tab
          eventKey={page}
          key={i}
          title={
            <span>
              {page}
              {/* 🔴 Badge for Complain */}
              {page === "User-Complain" &&
                getPendingCount(complainData) > 0 && (
                  <span className="tab-badge">
                    {getPendingCount(complainData)}
                  </span>
                )}
              {/* 🔴 Badge for NetWork */}
              {page === "User Requistion" &&
                getPendingCount(catvData) > 0 && (
                  <span className="tab-badge">
                    {getPendingCount(catvData)}
                  </span>
                )}
            </span>
          }
        >
          {page === "User-Complain" && <Complain setData={setComplainData} />}
          {page === "User Requistion" && <Letter setData={setCatvData}/>}
          {page === "Set-Top Box Details" && <BoxDetails />}
        </Tab>
      ))}
    </Tabs>
  );
};

export default BoxTab;
