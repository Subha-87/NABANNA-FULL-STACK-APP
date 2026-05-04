"use client";
import { Tabs, Tab } from "react-bootstrap";
import NabannaAmc from "../../component/AmcPart/NabannaAmc";
import UpannaAmc from "../../component/AmcPart/UpannaAmc";
import HowrahAmc from "../../component/AmcPart/HowrahAmc";
import "../CSS/tab.css";
const AmcTab = () => {
  const tabConfig = [
    {
      key: "AMC-Nabanna",
      title: "AMC-Nabanna",
      component: NabannaAmc,
    },
    {
      key: "AMC-Upanna",
      title: "AMC-Upanna",
      component: UpannaAmc,
    },
    {
      key: "AMC-Howrah",
      title: "AMC-Howrah",
      component: HowrahAmc,
    },
  ];
  return (
    <Tabs defaultActiveKey={tabConfig[0].key} className="custom-tabs" fill>
      {tabConfig.map(({ key, title, component: Component }) => (
        <Tab eventKey={key} title={title} key={key}>
          <Component />
        </Tab>
      ))}
    </Tabs>
  );
};

export default AmcTab;
