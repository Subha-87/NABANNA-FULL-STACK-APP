import { Modal, Box, Typography } from "@mui/material";
import { modStyle } from "./modalStyle";
import { SearchEstmateNabannaTable } from "../TableFormat/EstimateTable";

const SearchEstimateModal = ({isOpen,isClose,searchData}) => {
  return (
    <Modal open ={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <div className="text-xl text-center font-semibold font-sans text-blue-800">Search Result :</div>
        <SearchEstmateNabannaTable searchResult={searchData}/>
      </Box>
    </Modal>
  )
}

export default SearchEstimateModal
