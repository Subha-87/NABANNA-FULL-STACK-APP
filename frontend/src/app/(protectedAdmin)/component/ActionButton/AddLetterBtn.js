import { Button } from "@mui/material";
import ModalFormat from "../ModalForm/ModalFormat";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const AddLetterBtn = ({onSuccess}) => {
  const [addReqModalOpen, setAddReqModalOpen] = useState(false);
  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => setAddReqModalOpen(true)} startIcon={<AddIcon/>}>
        ADD Requisition
      </Button>
      <ModalFormat isModalOpen={addReqModalOpen} isModalClose={() => setAddReqModalOpen(false)}  onSuccess={onSuccess}/>
    </>
  );
};

export default AddLetterBtn;
