import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import ReqEditForm from "../FormikForm/ReqEditForm";

const ReqEditModal = ({isOpen,isClose,editData,onRefresh}) => {
  const handleUpdateModal = () => {
    isClose(true)
  }
  return (
    <Modal  open={isOpen} onClose={isClose}>
      <Box sx={modStyle}><ReqEditForm editReqInfo={editData} modStat = {handleUpdateModal} onRefresh={onRefresh}/></Box>
    </Modal>
  )
}

export default ReqEditModal
