"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//import IncomingItemReg from "../../component/RegisterPart/IncomingItemReg";
import ItemReg from "../../component/RegisterPart/ItemReg";
import LetterReg from "../../component/RegisterPart/LetterReg";
import UserComplainReg from "../../component/RegisterPart/UserComplainReg";

import RFIDuserReg from "../../component/RegisterPart/RFIDuserReg";
//import HardwareReg from "../../component/RegisterPart/HardwareReg";
import UserDetails from "@/app/(nabanna-IT)/nabanna/pc-hardware/UserDetails";
import "./../CSS/tab.css";
import { useState } from "react";
const TabPage = () => {
  const [complainData, setComplainData] = useState([]);
  const [letterData, setLetterData] = useState([]);

  const getPendingCount = (data) => {
    const pendingData = data.filter((item) => item.status === "Pending");
    return pendingData.length;
  };

  /*const tabComponents = {
    "User Complain": <UserComplainReg />,
    "Nabanna Letter": <LetterReg />,
    "Incoming Material": <ItemReg />,
    "System Details": <UserDetails />,
    "RFID Card User": <RFIDuserReg />,
  };*/

  // ✅ Tab configuration
  const tabsConfig = [
    {
      name: "User Complain",
      component: <UserComplainReg setData={setComplainData} />,
      data: complainData,
      showBadge: true,
    },
    {
      name: "Nabanna Letter",
      component: <LetterReg setData={setLetterData} />,
      data: letterData,
      showBadge: true,
    },
    {
      name: "Incoming Material",
      component: <ItemReg />,
      showBadge: false,
    },
    {
      name: "System Details",
      component: <UserDetails />,
      showBadge: false,
    },
    {
      name: "RFID Card User",
      component: <RFIDuserReg />,
      showBadge: false,
    },
  ];

  return (
    <Tabs defaultActiveKey="User Complain" className="custom-tabs" fill>
      {tabsConfig.map((tab, i) => {
        const count = tab.data ? getPendingCount(tab.data) : 0;

        return (
          <Tab
            eventKey={tab.name}
            key={i}
            title={
              <span>
                {tab.name}

                {tab.showBadge && count > 0 && (
                  <span className="tab-badge">{count}</span>
                )}
              </span>
            }
          >
            {tab.component}
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default TabPage;

/* <Tabs defaultActiveKey="User Complain" className="custom-tabs" fill>
      {Object.keys(tabComponents).map((page, i) => (
        <Tab eventKey={page} title={page} key={i}>
          {tabComponents[page]}
        </Tab>
      ))}
    </Tabs>*/
