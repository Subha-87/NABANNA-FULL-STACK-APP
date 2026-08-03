import { Button } from "@mui/material";
import { useState } from "react";
import { NabannaModal, UploadChallanModal } from "../ModalForm/EstimateModal";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const AddEstimateNabanna = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        ADD Estimate
      </Button>
      <NabannaModal isOpen={open} isClose={() => setOpen(false)} />
    </>
  );
};
export const AddEstimateUpanna = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        ADD Estimate
      </Button>
    </>
  );
};
export const AddEstimateHowrah = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        ADD Estimate
      </Button>
    </>
  );
};

export const AddChallan = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        startIcon={<FileUploadIcon />}
      >
        Upload Challan
      </Button>
      <UploadChallanModal isOpen={open} isClose={() => setOpen(false)} />
    </>
  );
};
