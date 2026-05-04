import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { modStyle } from "./modalStyle";
import RequisitionForm from "../FormikForm/RequisitionForm";


const ModalFormat = ({ isModalOpen, isModalClose,onSuccess}) => {

  const handleModal = (value) => {
    isModalClose(value)
  }
  return (
    <div>
      <Modal open={isModalOpen} onClose={isModalClose}>
        <Box sx={modStyle }>
          
          <RequisitionForm modStat = {handleModal} onSuccess={onSuccess} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFormat;
