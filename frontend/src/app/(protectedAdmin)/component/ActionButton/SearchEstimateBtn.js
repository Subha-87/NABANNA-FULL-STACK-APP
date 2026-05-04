import { Button } from "@mui/material";
import { useState } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import SearchEstimateModal from "../ModalForm/SearchEstimateModal";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import { handleAxiosError } from "@/app/utils/axiosError";

const SearchEstimateBtn = ({ findKey, clearInput }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [error, setError] = useState(null);

  const axios = useAxios();
  const handleFindEstimate = async () => {
    //alert("test");

    //1. First Check If Seach Value is present
    if (!findKey) return toast.warning("Enter Search Information !"); // if no value show alert user to put value //

    // 2. Search API Call sending the serach term //
    try {
      const response = await axios.get(`/estimateReg/${findKey}`);
      //console.log(response);
      setSearchResult(response.data?.data); // 3. Set the Result Response
      //4. Open The Modal Where The Result has been Displayed
      setOpenSearchModal(true);
    } catch (error) {
      //console.log(error);
      const { generalError } = handleAxiosError(error);
      const errMsg = generalError || "Something Went Wrong";
      toast.error(errMsg);
      setError(errMsg);
    }

    // 5. Clear the Search Input Field //
    clearInput();
  };

  return (
    <>
      <span className="ml-2">
        <Button
          variant="contained"
          color="success"
          onClick={handleFindEstimate}
          startIcon={<SearchIcon />}
        >
          FIND
        </Button>
      </span>
      <SearchEstimateModal
        isOpen={openSearchModal}
        isClose={() => setOpenSearchModal(false)}
        searchData={searchResult}
        
      />
    </>
  );
};

export default SearchEstimateBtn;
