import { Modal, Box, Backdrop } from "@mui/material";
import { modalStyle } from "./styleModal";
import SelfTaskNet from "../FormikForm/SelfTaskNet";
import SelfTaskVoice from "../FormikForm/SelfTaskVoice";
import SelfTaskTV from "../FormikForm/SelfTaskTV";

export const SelfEditModal = ({
  isModalOpen,
  isModalClose,
  editData,
  onRefresh,
}) => {
  const handleModal = () => {
    isModalClose(true);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={isModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          bgcolor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <Box sx={modalStyle}>
        <SelfTaskNet
          editData={editData}
          modalStat={handleModal}
          onRefresh={onRefresh}
          onClose={isModalClose}
        />
      </Box>
    </Modal>
  );
};

export const SelfEditVoiceModal = ({
  isModalOpen,
  isModalClose,
  editData,
  onRefresh,
}) => {
  const handleModal = () => {
    // value = true trigger in formik page when click submit button , value must be true for close the model
    //console.log(value)
    isModalClose(true);
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={isModalClose}
      closeAfterTransition
      slots={{
        // Destructure ownerState to prevent it from reaching the DOM
        backdrop: ({ ownerState, ...rest }) => (
          <Box
            {...rest}
            sx={{
              ...rest.sx,
              bgcolor: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
            }}
          />
        ),
      }}
    >
      <Box sx={modalStyle}>
        <SelfTaskVoice
          editData={editData}
          modalStat={handleModal}
          onClose={isModalClose}
          onRefresh={onRefresh}
        />
      </Box>
    </Modal>
  );
};

export const SelfEditTVModal = ({
  isModalOpen,
  isModalClose,
  editData,
  onRefresh,
}) => {
  const handleModal = () => {
    // value = true trigger in formik page when click submit button , value must be true for close the model
    //console.log(value)
    isModalClose(true);
  };
  
  return (
    <Modal
      open={isModalOpen}
      onClose={isModalClose}
      closeAfterTransition
      slots={{
        // Destructure ownerState to prevent it from reaching the DOM
        backdrop: ({ ownerState, ...rest }) => (
          <Box
            {...rest}
            sx={{
              ...rest.sx,
              bgcolor: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
            }}
          />
        ),
      }}
    >
      <Box sx={modalStyle}>
        <SelfTaskTV
          editData={editData}
          modalStat={handleModal}
          onClose={isModalClose}
          onRefresh={onRefresh}
        />
      </Box>
    </Modal>
  );
};
