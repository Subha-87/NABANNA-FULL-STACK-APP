"use client";
import OfficeChallan from "../../component/ChallanPart/OfficeChallan";
import GatePass from "../../component/ChallanPart/GatePass";
import RoadChallan from "../../component/ChallanPart/RoadChallan";
import "../CSS/tab.css"

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ChallanTab = () => {
  const challanPage = ["Office-Challan", "Gate-Pass", "Road-Challan"];
  return <Tabs defaultActiveKey="Office-Challan" className="custom-tabs" fill>
     {
        challanPage.map((page,i) => {
            return(
                <Tab eventKey={page} title={page} key={i}>
                   {page === "Office-Challan" && <OfficeChallan/>}
                   {page === "Gate-Pass" && <GatePass/>}
                   {page === "Road-Challan" && <RoadChallan/>}
                </Tab>
            )
        })
     }

  </Tabs>;
};

export default ChallanTab;
