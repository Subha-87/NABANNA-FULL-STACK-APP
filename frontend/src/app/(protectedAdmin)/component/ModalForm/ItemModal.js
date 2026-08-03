import { Modal, Box, Typography, Button } from "@mui/material";
//import { modStyle } from "./modalStyle";
import MaterialForm from "../FormikForm/MaterialForm";

const ItemModal = ({ isItemModalOpen, isItemModalClose, onSuccess }) => {
  const handleModal = (value) => {
    isItemModalClose(value);
  };
  const modStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    minWidth: "600px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    bgcolor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
    p: 0,
    overflow: "hidden",
    outline: "none",
    animation: "modalFadeIn 0.3s ease-out",

    // IMPORTANT: Add these two lines to make the child Form fill the modal correctly
    display: "flex",
    flexDirection: "column",
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
