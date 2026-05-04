import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import { Challan_Estimate } from "../View/Estimate";
import {
  NabannaEstimateForm,
  EditNabannaEstimateForm,
  UploadChallanForm,
} from "../FormikForm/EstimateForm";

export const NabannaModal = ({ isOpen, isClose }) => {
  const handleModalClose = () => {
    isClose(true);
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <NabannaEstimateForm modStat={handleModalClose} />
      </Box>
    </Modal>
  );
};

export const EditNabannaModal = ({ isOpen, isClose, rowData,onRefresh }) => {
  const handleModalClose = () => {
    isClose(true);
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <EditNabannaEstimateForm
          editData={rowData}
          modStat={handleModalClose}
          onRefresh={onRefresh}
        />
      </Box>
    </Modal>
  );
};

export const UploadChallanModal = ({ isOpen, isClose }) => {
  const handleModalClose = () => {
    isClose(true);
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <UploadChallanForm  modStat={handleModalClose} />
      </Box>
    </Modal>
  );
};

export const ViewChallanModal  =({ isOpen, isClose, viewId }) => {
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
         <Challan_Estimate id={viewId}/>
      </Box>
    </Modal>
  );
}
