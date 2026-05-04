import { Button } from "@mui/material";
import TaskModal from "../ModalForm/TaskModal";
import { useState } from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";

const ReqActionBtn = ({ selectedRow,onRefresh }) => {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  //const [selectRow, setSelectRow] = useState(null);
  const data = selectedRow;
  //console.log(data)
  return (
    <>
      <BsFillTelephoneForwardFill
        onClick={() => setTaskModalOpen(true)}
        style={{ color: "green", fontSize: "25px"}}
      />

      <TaskModal
        selectTask={data}
        isOpen={taskModalOpen}
        isClose={() => setTaskModalOpen(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ReqActionBtn;
