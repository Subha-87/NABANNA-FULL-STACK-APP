import { Modal, Box, Typography } from "@mui/material";
import { modalStyle } from "./styleModal";
import SelfTaskNet from "../FormikForm/SelfTaskNet";

const SelfEditModal = ({isModalOpen,isModalClose,editData,onRefresh}) => {
    const handleModal = () => {    // value = true trigger in formik page when click submit button , value must be true for close the model
     //console.log(value)
     isModalClose(true)
  }
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <SelfTaskNet editData={editData} modalStat={handleModal} onRefresh={onRefresh}/>
        
       {/* <TaskManage editableInfo ={editData}/>*/}
      </Box>
    </Modal>
  )
}

export default SelfEditModal
