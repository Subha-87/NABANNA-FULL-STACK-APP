import { Button } from "@mui/material";
import ItemModal from "../ModalForm/ItemModal";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const AddItemBtn = ({onSuccess}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setOpen(true)} startIcon={<AddIcon/>}>
        ADD Material
      </Button>
      <ItemModal isItemModalOpen = {open} isItemModalClose = {() => setOpen(false)} onSuccess={onSuccess}/>

    </>
  );
};

export default AddItemBtn;
