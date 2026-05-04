import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { modStyle } from "./modalStyle";
import ComplainForm from "../FormikForm/ComplainForm";

const ComplainModal = ({isOpen,isClose,onSuccess}) => {
   const handleUpdateModal = () => {
    isClose(true)
  }
  return (
    <Modal open={isOpen} onClose={isClose}>
        <Box sx={modStyle}>
           <ComplainForm  modStat = {handleUpdateModal} onSuccess={onSuccess}/>
        </Box>
      
    </Modal>
  )
}

export default ComplainModal
