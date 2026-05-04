import { Button } from "@mui/material";
import { useState } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import SearchComplainModal from "../ModalForm/SearchComplainModal";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";

const SearchComplain = ({ findKey, clearInput }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const axios = useAxios();
  const handleFindUserCall = async () => {
    //console.log(findKey)
    if (!findKey) return toast.warning("Enter Search Information!");
    setSearchResult([]); //This avoids old search results appearing briefly in the modal.
    try {
      const response = await axios.get(
        `/complain/search-all-complain/${findKey}`,
      );
      //console.log(response);
      toast.success(response.data?.message || "Search Complet");
      setSearchResult(response.data?.data);
      setOpenSearchModal(true); // open modal only when search result found //
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    }

    clearInput();
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleFindUserCall}
        startIcon={<SearchIcon />}
      >
        Find
      </Button>
      <SearchComplainModal
        isOpen={openSearchModal}
        isClose={() => setOpenSearchModal(false)}
        searchData={searchResult}
      />
    </>
  );
};

export default SearchComplain;
