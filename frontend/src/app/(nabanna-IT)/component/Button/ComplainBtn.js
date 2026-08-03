import { FaEdit } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import {
  EditComplainModal,
  AddComplainModal,
  SearchComplainModal,
} from "../Modal/ComplainModal";
import { useState } from "react";

import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
//import SearchIcon from '@mui/icons-material/Search';
import {
  Paper,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";

export const EditComplainBtn = ({ editData, onRefresh }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FaEdit
        style={{ color: "green", fontSize: "20px" }}
        onClick={() => setOpen(true)}
      >
        Edit
      </FaEdit>
      <EditComplainModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        editData={editData}
        onRefresh={onRefresh}
      />
    </>
  );
};

export const AddComplainBtn = ({
  onVoiceSuccess,
  onNetSuccess,
  onTVSuccess,
}) => {
  const funObj = {
    onVoiceSuccess,
    onNetSuccess,
    onTVSuccess,
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Complain
      </Button>
      <AddComplainModal
        isOpen={open}
        isClose={() => setOpen(false)}
        onPostSuccess={funObj}
      />
    </>
  );
};

export const SearchComplainBtn = ({ domain }) => {
    const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [showData, setShowData] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Added loading state
  const axios = useAxios();

  const handleSearchComplain = async () => {
    if (!searchData.trim()) return toast.error("Enter Search Data");

    setIsSearching(true); // Start loading
    try {
      const response = await axios.get(`/complain/find-complain/${domain}`, {
        params: {
          query: searchData,
        },
      });
      
      const retrieveData = response.data.data;
      toast.success(response.data.message || "User Complain Found");
      setShowData(retrieveData);
      setOpen(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong!");
    } finally {
      setIsSearching(false); // Stop loading
      setSearchData(""); // Clear input after search
    }
  };

  // Allow pressing "Enter" to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchComplain();
    }
  };
  return (
    <>
        <div>
        <TextField
          size="small"
          sx={{width:300}}
          label="Search Complaint"
          variant="outlined"
          placeholder="Name,Dept,Room or Contact..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={handleKeyDown}
          // Clear button inside the text field
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="success" />
                </InputAdornment>
              ),
              endAdornment: searchData ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchData("")}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: { borderRadius: 2, backgroundColor: "white" },
            },
          }}
        />
        <Button
          variant="contained"
          disabled={isSearching}
          onClick={handleSearchComplain}
          startIcon={isSearching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          sx={{
            minWidth: 140,
            marginLeft:2,
            height: 40,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            // Professional Green Gradient
            background: "linear-gradient(45deg, #43A047 30%, #66BB6A 90%)",
            boxShadow: "0 3px 5px 2px rgba(67, 160, 71, .3)",
            "&:hover": {
              background: "linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)",
              boxShadow: "0 4px 8px 3px rgba(67, 160, 71, .4)",
            },
          }}
        >
          {isSearching ? "Searching..." : "Find"}
        </Button>
        </div>
    
      <SearchComplainModal searchData={showData} isOpen={open} isClose={() => setOpen(false)} />
    </>
  );
};
