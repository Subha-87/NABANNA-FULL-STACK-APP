import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import MaterialForm from "../FormikForm/MaterialForm";

const ItemModal = ({ isItemModalOpen, isItemModalClose, onSuccess }) => {
  const handleModal = (value) => {
    isItemModalClose(value);
  };
  return (
    <Modal open={isItemModalOpen} onClose={isItemModalClose}>
      <Box sx={modStyle} className="my-custom-box">
        <MaterialForm modStat={handleModal} onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
};

export default ItemModal;
