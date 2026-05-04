import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ReqEditModal from "../ModalForm/ReqEditModal";

const ReqEditBtn = ({selectedRow,onRefresh}) => {
  const [open, setOpen] = useState(false); 
  return (
    <>
      <FaRegEdit style={{ color: "green", fontSize: "25px" }} onClick={() => setOpen(true)} />
      <ReqEditModal isOpen={open} isClose={() => setOpen(false)} editData={selectedRow} onRefresh={onRefresh}/>
    </>
  );
};

export default ReqEditBtn;
