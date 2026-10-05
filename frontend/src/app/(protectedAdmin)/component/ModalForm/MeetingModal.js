import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import {MeetingForm,EditMeetingForm} from "../FormikForm/MeetingForm";


export const AddModal = ({ isOpen, isClose, onSuccess }) => {
  const handleModalClose = () => {
    isClose(true);
  };

  const modalStyleMeeting = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    maxWidth: 1200,
    height: "88vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modalStyleMeeting}>
        <MeetingForm modStat={handleModalClose} onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
};


export const EditMeetingModal = ({ isOpen, isClose,editInfo,onSuccess }) => {
   const handleModalClose = () => {
    isClose(true);
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <EditMeetingForm data={editInfo}  modStat={handleModalClose} onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
}
