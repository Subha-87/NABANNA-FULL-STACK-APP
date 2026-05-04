import { Modal, Box, Typography, Button } from "@mui/material";
import { modStyle } from "./modalStyle";
import SearchLetterTable from "../TableFormat/SearchLetterTable";

const LetterSerachModal = ({isModalOn,isModalClose,searchData}) => {
  //console.log(searchData)
  return (
    <Modal open={isModalOn} onClose={isModalClose}>
      <Box sx={modStyle}>
        <div className="text-xl text-center font-semibold font-sans text-blue-800">Search Result :</div>
        <SearchLetterTable result={searchData}/>
      </Box>
    </Modal>
  )
}

export default LetterSerachModal
