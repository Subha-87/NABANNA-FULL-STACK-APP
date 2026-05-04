import { Modal, Box, Typography } from "@mui/material";
import { modStyle } from "./modalStyle";
import SearchComplainTable from "../TableFormat/SearchComplainTable";

const SearchComplainModal = ({isOpen,isClose,searchData}) => {
  return (
     <Modal open ={isOpen} onClose={isClose}>
      <Box sx={modStyle}>
        <div className="text-xl text-center font-semibold font-sans text-blue-800">Search Result :</div>
        <SearchComplainTable complainData={searchData}/>
      </Box>
    </Modal>
  )
}

export default SearchComplainModal
