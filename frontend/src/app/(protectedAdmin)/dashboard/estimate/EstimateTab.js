"use client"
import Nabanna from "../../component/EstimatePart/Nabanna";
import Upanna from "../../component/EstimatePart/Upanna";
import Howrah from "../../component/EstimatePart/Howrah";

import Tab from "react-bootstrap/Tab";

import Tabs from "react-bootstrap/Tabs";
import "../CSS/tab.css";

const EstimateTab = () => {
  const estimatePage = ["Nabanna", "Upanna", "Howrah"];
  return (
    <Tabs defaultActiveKey="Nabanna" className=" custom-tabs" fill>
      {estimatePage.map((page, i) => (
        <Tab eventKey={page} title={page} key={i}>
          {page === "Nabanna" && <Nabanna />}
          {page === "Upanna" && <Upanna />}
          {page === "Howrah" && <Howrah />}
        </Tab>
      ))}
    </Tabs>
  );
};

export default EstimateTab;
