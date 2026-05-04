import { Button } from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { useState } from "react";
import ItemSearchModal from "../ModalForm/ItemSearchModal";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";

const ItemSearchBtn = ({ searchData, clearData }) => {
  //console.log(searchData)
  const axios = useAxios();
  const [resultModalOn, setresultModalOn] = useState(false);
  const [resultData, setResultData] = useState([]); // return result in a array // so set empty array

  const handleSearchItem = async () => {
    //alert(searchData);
    if (!searchData) return toast.warning("Enter Search Information !");
    // filter result by api call //

    try {
      const response = await axios.get(`/itemNabanna/search/${searchData}`);
      //console.log(response);
      setResultData(response.data?.data);
      setresultModalOn(true);
    } catch (err) {
      toast.error(err.response.data?.message || "Data Not Found");
    }

    clearData(); // props function to trigger reset in input fiedl //
  };
  return (
    <>
      <Button
        className=""
        variant="contained"
        color="success"
        onClick={handleSearchItem}
        startIcon={<SearchIcon />}
      >
        GO
      </Button>
      <ItemSearchModal
        isModalOn={resultModalOn}
        isModalClose={() => setresultModalOn(false)}
        result={resultData}
      />
    </>
  );
};

export default ItemSearchBtn;
