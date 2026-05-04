import { Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useModal } from "@/app/Hook/useModal";

export const AddAMC = () => {
  return (
    <>
      <Button variant="contained" color="warning" startIcon={<AddIcon />}>
        ADD AMC
      </Button>
    </>
  );
};

export const SearchAMC = () => {
  const [searchterm, setSearchterm] = useState("");
  return (
    <span className="flex justify-content-evenly items-center">
      <div className="mr-2">
        <label className="mr-2 font-bold text-2xl">Search AMC:</label>
        <input
          type="search"
          placeholder="date/memo/price"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
          className="border-4 border-gray-950  w-[200px] rounded-2 text-center text-blue-700 font-bold h-[50px] focus:outline-none focus:border-blue-800"
        />
      </div>
      <Button
        variant="contained"
        color="success"
        startIcon={<SearchIcon />}
        onClick={() => {
          (alert(searchterm), setSearchterm(""));
        }}
      >
        Find
      </Button>
    </span>
  );
};
