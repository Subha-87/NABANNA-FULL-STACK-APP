import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import SearchItemTable from "../TableFormat/SearchItemTable";

const ItemSearchModal = ({isModalOn,isModalClose,result}) => {
    //console.log(result)
  return (
    <Modal open={isModalOn} onClose={isModalClose}>
        <Box sx={modStyle}>
              <div className="text-xl text-center font-semibold font-sans text-blue-800">Search Result :</div>
              <SearchItemTable data={result} modalOff ={isModalClose} modalOffAfterEdit = {isModalClose}/>
        </Box>
      
    </Modal>
  )
}

export default ItemSearchModal
