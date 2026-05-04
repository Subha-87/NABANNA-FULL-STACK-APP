import { Button } from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { useState } from "react";
import LetterSerachModal from "../ModalForm/LetterSerachModal";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";

const LetterSearchBtn = ({ searchInfo, clearData }) => {
  const axios = useAxios();
  const [resultModalOn, setresultModalOn] = useState(false);
  const [resultData, setResultData] = useState([]);
  
  const handleSearch = async () => {
    //console.log(searchInfo)

    if (!searchInfo) return toast.warning("Please Enter Information !");
    // 1. Make the API Call to get the filter Result //
    //setResultData(API filter Result)
    try {
      const response = await axios.get(`/ItReq/searchITletter/${searchInfo}`);
      //console.log(response);
      toast.success(response.data?.message || "Search Success");
      setResultData(response.data.data);
      //1 . Trigger the Modal Open Pass The props When search Result True //
      setresultModalOn(true);
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data?.message || "Something Went Wrong";
      toast.error(errMsg);
    }

    //3. Clear The Search Input Filed //
    clearData(); //--> call the props function //
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Find
      </Button>
      <LetterSerachModal
        isModalOn={resultModalOn}
        isModalClose={() => setresultModalOn(false)}
        searchData={resultData}
      />
    </>
  );
};

export default LetterSearchBtn;
