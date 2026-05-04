import { Modal, Box, Typography } from "@mui/material";
import { modalStyle } from "./styleModal";
import TaskManageVoice from "../FormikForm/TaskManageVoice";

const EditModalVoice = ({ isModalOpen, isModalClose, editData, onRefresh }) => {
  //console.log(editData)
  const handleModal = (value) => {
    isModalClose(value)
  }
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <TaskManageVoice editableVoiceInfo={editData} modStat = {handleModal} onRefresh={onRefresh}/>
      </Box>
    </Modal>
  );
};

export default EditModalVoice;
