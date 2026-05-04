import { Button } from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { useState } from "react";
import { SearchNetModal } from "../Modal/SearchModal";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';

export const SearchNetData = ({ findData, clearData }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const axios = useAxios()

  const handleSearchNet = async () => {
    //console.log(findData);
    if (!findData) return toast.warning("Enter Log Information !");
    setSearchResult([]); //This avoids old search results appearing briefly in the modal.
    // api call //

    try {
      const response = await axios.get(
        `/complain/search-all-complain/${findData}`,
      );
      //console.log(response);
      setSearchResult(response.data?.data);  // 1️⃣ set data first
      setOpenSearchModal(true); // 2️⃣ open modal
      toast.success(response.data?.message || "Data Found") // 3️⃣ feedback
      // open modal only when result found
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    }
    // After get Api response postive or negetive make modal on //

    clearData();
  };
  return (
    <>
      <Button variant="contained" color="success" onClick={handleSearchNet} startIcon={<SearchIcon/>}>
        Go
      </Button>

      <SearchNetModal
        isOpen={openSearchModal}
        isClose={() => setOpenSearchModal(false)}
        searchData={searchResult}
      />
    </>
  );
};

// Handle Data by Dynamic domain = "Internet/Voice/PC-Hardware"

const domainRouteMap = {
  Internet: "networking",
  Voice: "voice",
  "PC_Hardware": "pc-hardware",
};
export const DataSearchByDate = ({ startDate, endDate, clearDate, domain }) => {
  const axios = useAxios()
  const handleSearchByDate = async () => {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      //console.log(params.size);
      if (params.size != 2) return toast.warning("Please Select Date Range !!");
      //return SweetSwal.fire("Please Select Date Range !!");

      const response = await axios.get(
        `/complain/filter-date/${domain}?${params.toString()}`,
      );
      //console.log(response);
      if (response.status === 200) {
        const dataToPass = response.data.data;
        // Store data (must be a string)
        localStorage.setItem("axiosData", JSON.stringify(dataToPass)); // net/voice/pc saved to axiosData//

        const route = domainRouteMap[domain];
        window.open(
          `/nabanna/${route}/report`,
          "_blank",
          "noopener,noreferrer",
        );
      }
    } catch (error) {
      //console.error(error);
      toast.error(error.response?.data?.message || "Something is Wrong");
    }
    clearDate();
  };
  return (
    <Button variant="contained" color="secondary" onClick={handleSearchByDate} startIcon={<GetAppIcon/>}>
      Get Monthly Report
    </Button>
  );
};
