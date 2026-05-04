import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import ItemEditForm from "../FormikForm/ItemEditForm";

const ItemEditModal = ({isOpen,isClose,editInfo,onRefresh}) => {
  const handleModal = () => { // function pass as props //
    isClose(true)
  }
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modStyle}><ItemEditForm info={editInfo} modStat = {handleModal} onRefresh={onRefresh}/></Box>
    </Modal>
  )
}

export default ItemEditModal
