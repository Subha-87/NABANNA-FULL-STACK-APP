import { Modal, Box, Typography, Button } from "@mui/material";
//import { modStyle } from "./modalStyle";
import TaskReAssign from "../FormikForm/TaskReAssign";

const ReAssignModal = ({ isOpen, isClose, data, onRefresh }) => {
  const handleUpdateModal = () => {
    isClose(true);
  };
  const modStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    minWidth: "360px", // Lowered for small screens
    maxWidth: "90vw",
    maxHeight: "90vh",
    bgcolor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
    p: 0,
    overflow: "hidden",
    outline: "none",
    animation: "modalFadeIn 0.3s ease-out",
    display: "flex", // Added
    flexDirection: "column", // Added
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <TaskReAssign
          rowTask={data}
          modStat={handleUpdateModal}
          onRefresh={onRefresh}
        />
      </Box>
    </Modal>
  );
};

export default ReAssignModal;
