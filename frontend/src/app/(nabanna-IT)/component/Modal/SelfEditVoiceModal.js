import { Modal, Box, Typography } from "@mui/material";
import { modalStyle } from "./styleModal";
import SelfTaskVoice from "../FormikForm/SelfTaskVoice";

const SelfEditVoiceModal = ({ isModalOpen, isModalClose, editData }) => {
   const handleModal = () => {    // value = true trigger in formik page when click submit button , value must be true for close the model
     //console.log(value)
     isModalClose(true)
  }  
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <SelfTaskVoice editData={editData} modalStat={handleModal}/>
      </Box>
    </Modal>
  );
};

export default SelfEditVoiceModal;
