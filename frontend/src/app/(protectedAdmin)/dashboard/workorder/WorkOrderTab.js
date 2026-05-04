"use client";
import { Tabs, Tab } from "react-bootstrap";
import NabannaOrder from "../../component/WorkOrderPart/NabannaOrder";
import UpannaOrder from "../../component/WorkOrderPart/UpannaOrder";
import HowrahCircleOrder from "../../component/WorkOrderPart/HowrahCircleOrder";
import "../CSS/tab.css";

const WorkOrderTab = () => {
    const tabConfig = [
    {
      key: "Nabanna-Order",
      title: "Nabanna-Order",
      component: NabannaOrder,
    },
    {
      key: "Upanna-Order",
      title: "Upanna-Order",
      component: UpannaOrder,
    },
    {
      key: "Howrah-Order",
      title: "Howrah-Order",
      component: HowrahCircleOrder,
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
  )
}

export default WorkOrderTab
