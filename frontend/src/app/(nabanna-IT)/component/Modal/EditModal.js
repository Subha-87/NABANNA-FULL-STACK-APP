import { Modal, Box, Typography,Backdrop,IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { modalStyle } from "./styleModal";
//import TaskManage from "../../../../../../shared/ReplaceOLDComponent/TaskManage";
import TaskManage from "../FormikForm/TaskManage";

const EditModal = ({ isModalOpen, isModalClose, editData, onRefresh }) => {
  //console.log(editData);
  const handleModal = (value) => {
    // value = true trigger in formik page when click submit button , value must be true for close the model
    //console.log(value)
    isModalClose(value);
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={isModalClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
      sx={{
        "& .MuiModal-root": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Box sx={modalStyle}>
        {/* Modal Header */} {/* ✅ ADDED: Gradient header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <TaskAltIcon sx={{ color: "#fff", fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.01em",
              }}
            >
              Update Task
            </Typography>
          </Box>
          <IconButton
            onClick={isModalClose}
            sx={{
              color: "rgba(255,255,255,0.8)",
              "&:hover": {
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Content */}   {/* ✅ CHANGED: Light gray background padding */}
        <Box sx={{ padding: "24px", backgroundColor: "#fafbfc",overflowY: "auto", maxHeight: "calc(85vh - 60px)" }}>
          <TaskManage
            editableInfo={editData}
            modalStat={handleModal}
            onRefresh={onRefresh}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
