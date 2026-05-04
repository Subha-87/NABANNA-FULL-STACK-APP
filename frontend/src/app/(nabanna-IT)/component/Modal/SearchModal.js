import { Modal, Box, Typography } from "@mui/material";
import { modalStyle } from "./styleModal";
import SearchNet from "../Search-Result-Table/SearchNet";

export const SearchNetModal = ({isOpen,isClose,searchData}) => {
  
  
  return (
    <Modal open ={isOpen} onClose={isClose}>
      <Box sx={modalStyle}>
        <div className="text-xl text-center font-semibold font-sans text-blue-800">Search Result :</div>
        <SearchNet complainData={searchData}/>
      </Box>
    </Modal>
  );
};

export const SearchVoiceModal = () => {};
