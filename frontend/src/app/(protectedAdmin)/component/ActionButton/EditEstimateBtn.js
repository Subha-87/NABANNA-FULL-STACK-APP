import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import { EditNabannaModal,ViewChallanModal  } from "../ModalForm/EstimateModal";

export const EditNabannaEstimate = ({ rowData,onRefresh}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FaRegEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={() => setOpen(true)}
      />
      <EditNabannaModal isOpen={open} isClose={() => setOpen(false)} rowData={ rowData} onRefresh={onRefresh}/>
    </>
  );
};

export const ViewChallan = ({rowId}) => {
  const [open, setOpen] = useState(false);
  return(
    <>
    <GrView  style={{ color: "violet", fontSize: "25px" }} onClick={() => setOpen(true)}/>
      <ViewChallanModal isOpen={open} isClose={() => setOpen(false)} viewId={rowId}/>
    </>
  )
}
