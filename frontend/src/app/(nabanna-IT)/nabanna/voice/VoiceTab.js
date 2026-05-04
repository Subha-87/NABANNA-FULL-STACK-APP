"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../tab.css";
import VoiceWork from "./VoiceWork";
import VoiceReport from "./VoiceReport";
import Complain from "./Complain";
import ReqVoice from "./ReqVoice";
import { useState } from "react";

const VoiceTab = () => {
  const [complainData, setComplainData] = useState([]);
  const [voiceData, setVoiceData] = useState([]);
  const dashboard = ["Telephone Complain", "Nabanna-Requsition","Requstion-Report", "Work-Report"];

  // ✅ pending count logic
  const getPendingCount = (data) => {
    //console.log(data)
    const pendingData = data.filter((item) => item.status === "Pending");
    return pendingData.length;
  };
  return (
    <Tabs defaultActiveKey="Telephone Complain" className="custom-tabs" fill>
      {dashboard.map((page, i) => (
        <Tab
          eventKey={page}
          key={i}
          title={
            <span>
              {page}
              {/* 🔴 Badge for Complain */}
              {page === "Telephone Complain" &&
                getPendingCount(complainData) > 0 && (
                  <span className="tab-badge">
                    {getPendingCount(complainData)}
                  </span>
                )}
              {/* 🔴 Badge for NetWork */}
              {page === "Nabanna-Requsition" &&
                getPendingCount(voiceData) > 0 && (
                  <span className="tab-badge">
                    {getPendingCount(voiceData)}
                  </span>
                )}
            </span>
          }
        >
          {page === "Telephone Complain" && <Complain setData={setComplainData} />}
          {page === "Nabanna-Requsition" && <VoiceWork setData={setVoiceData} />}
          {page === "Requstion-Report" && <ReqVoice />}
          {page === "Work-Report" && <VoiceReport />}
        </Tab>
      ))}
    </Tabs>
  );
};

export default VoiceTab;
