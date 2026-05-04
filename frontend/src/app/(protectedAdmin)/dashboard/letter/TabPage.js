"use client"
import Permission from '../../component/LetterPart/Permission'
import Handover from '../../component/LetterPart/Handover'
import Fitness from '../../component/LetterPart/Fitness'
import PermissionNew from '../../component/LetterPart/PermissionNew'

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./../CSS/tab.css";

const TabPage = () => {
    const letterPage = ["Work Permission","Handover Certificate","Fitness Certificate"]
  return (
    <Tabs defaultActiveKey="Work Permission" className="custom-tabs" fill>
       {
        letterPage.map((page,i) => {
            return(
                <Tab eventKey={page} title={page} key={i}>
                   {page === "Work Permission" && <PermissionNew/>}
                   {page === "Handover Certificate" && <Handover/>}
                   {page === "Fitness Certificate" && <Fitness/>}
                </Tab>
            )
        })
     }
    </Tabs>
  )
}

export default TabPage
