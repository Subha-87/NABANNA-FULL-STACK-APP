import { modStyle } from "./modalStyle";
import { Modal, Box, Typography } from "@mui/material";
import TaskFormik from "../FormikForm/TaskFormik";

const TaskModal = ({ selectTask, isOpen, isClose, onRefresh }) => {
  //console.log(selectTask)
  const handleModal = (value) => {
    isClose(value);
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <TaskFormik
          rowTask={selectTask}
          modalStat={handleModal}
          onRefresh={onRefresh}
        />
      </Box>
    </Modal>
  );
};

export default TaskModal;
