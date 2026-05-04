import { Button } from "@mui/material";
import ModalFormat from "../ModalForm/ModalFormat";
import { useState } from "react";
import ComplainModal from "../ModalForm/ComplainModal";
import AddIcon from '@mui/icons-material/Add';

const AddComplain = ({onSuccess}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)} startIcon={<AddIcon/>}>
        USER Complain
      </Button>
      <ComplainModal isOpen={open} isClose={() => setOpen(false)} onSuccess={onSuccess} />
    </>
  );
};

export default AddComplain;
