import { Button, TextField, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import {
  AddMachineModal,
  MachineFilterModal,
  EditMachineModal,
  StatusModal,
  RepairModal,
  ActivateModal,
  RenewModal,
} from "../Modal/MachineModal";
import { handleAxiosError } from "@/app/utils/axiosError";
import { useAxios } from "@/app/Hook/useAxios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  exportAmcOnlyToExcel,
  repairDatatoExcel,
} from "../../utils/excelReport";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";

// ADD New/AMC System Button //
export const AddSystemBtn = ({ onSuccess }) => {
  const [open, setopen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setopen(true)}
        startIcon={<AddIcon />}
      >
        ADD SYSTEM
      </Button>
      <AddMachineModal
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};

// Search System Based on User Detials //
export const SearchSystem = () => {
  const axios = useAxios();
  const [open, setopen] = useState(false);
  const [userSerachInput, setUserSerachInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const hanldeSystemSearch = async () => {
    if (!userSerachInput) return toast.warning("Enter Search Data !");

    //1) Fetch API CALL
    try {
      const response = await axios.get(
        `/NabannaSystem/search/${userSerachInput}`,
      );
      //console.log(response);
      //2) Set Response data for passing Machine table//
      toast.success(response.data?.message || "System Found");
      setFilterData(response.data.data);

      // 3) Open Modal When Result is Found//
      setopen(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    }
    setUserSerachInput(""); //need to clear input field //
  };

  return (
    <div className="p-2">
      <TextField
        type="search"
        value={userSerachInput}
        placeholder="Dept/Emp/Rank/Supplier/Floor/Room"
        className="border-1 border-black rounded"
        onChange={(e) => setUserSerachInput(e.target.value)}
        sx={{
          "& .MuiInputBase-root": {
            height: 40, // Set your desired height
            marginRight: 1,
            width: 300,
          },
          // Target the input text color
          "& .MuiInputBase-input": { color: "darkblue" },
          // Target the default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "green",
          },
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<SearchIcon />}
        onClick={hanldeSystemSearch}
        sx={{ marginLeft: 2 }}
      >
        Search
      </Button>
      <MachineFilterModal
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        searchData={filterData}
      />
    </div>
  );
};

// SYSTEM DETAILS PAGE EDIT BUTTON //
export const EditSystem = ({ editRow, refreshData }) => {
  //console.log(editRow)
  const [open, setOpen] = useState(false);
  return (
    <>
      <FaEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={() => setOpen(true)}
      >
        Edit
      </FaEdit>
      <EditMachineModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        selectedRow={editRow}
        refreshData={refreshData}
      />
    </>
  );
};

export const AmcExport = () => {
  //const [amcData, setAmcData] = useState([]);
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const handleAMCexport = async () => {
    try {
      const response = await axios.get("/NabannaSystem/export-amc");
      //console.log(response);
      const amcData = response.data?.data || [];

      exportAmcOnlyToExcel(amcData);
      setOpen(false); // after submit yes close the dialof modal //
    } catch (error) {
      //console.error(error);
      toast.error(error.response.data.message || "Failed to export AMC data");
      //alert("Failed to export AMC data\n NO AMC Covered System Found");
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        startIcon={<DownloadIcon />}
      >
        AMC
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Download AMC Report</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Want to Export AMC list as Excel?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>

          <Button onClick={handleAMCexport} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const SystemStatusView = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        onClick={() => setOpen(true)}
        startIcon={<VisibilityIcon />}
      >
        Status
      </Button>
      <StatusModal isModalOpen={open} isModalClose={() => setOpen(false)} />
    </>
  );
};

// SYSTEM FIND BASED ON SYSTEM INPUT make it based on serial to get one valid  output //
export const SystemFind = () => {
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const [system, setSystem] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [serachResult, setSerachResult] = useState([]);
  const [matchedValue, setMatchedValue] = useState("");
  const [matchedDevice, setMatchedDevice] = useState("");
  const [error, setError] = useState(null);
  const item = [
    "All_In_One",
    "CPU",
    "MONITOR",
    "UPS",
    "LAPTOP",
    "PRINTER",
    "SCANNER",
  ];
  const handleSearch = async () => {
    setSerachResult([]);
    try {
      const resp = await axios.get("/NabannaSystem/search-machine", {
        params: {
          system,
          value: searchValue,
        },
      });
      //console.log(resp);
      const success_msg = resp.data.message;
      toast.success(success_msg);
      const filter_result = resp.data?.data || [];
      console.log(filter_result);
      setOpen(true);
      setSerachResult(filter_result);
      setMatchedDevice(resp.data.matchedDevice);
      setMatchedValue(resp.data.matchedValue);
      //alert(success_msg)
    } catch (error) {
      //console.error(error);
      const { generalError } = handleAxiosError(error);
      setError(generalError);
      toast.error(generalError || "Something Went Wrong");
      setOpen(false);
      //alert(err_msg)
      /*SweetSwal.fire({
        icon: "error",
        text:generalError,
      });*/
    }
    // After Finish Search Query Clear The Input Field //
    setSystem("");
    setSearchValue("");
  };
  const searchData = {
    data: serachResult,
    matchedDevice,
    matchedValue,
  };
  return (
    <div className="flex justify-between h-[40px]">
      <Select
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">Select System</MenuItem>
        {item.map((s, i) => (
          <MenuItem key={i} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <TextField
        placeholder="Enter Serial No"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        disabled={!system}
        sx={{
          "& .MuiInputBase-root": {
            height: 40, // Set your desired height
            marginLeft: 1,
            marginRight: 2,
            width: 170,
          },
          // Target the input text color
          "& .MuiInputBase-input": { color: "darkblue" },
          // Target the default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "green",
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        disabled={!system || !searchValue}
        onClick={handleSearch}
      >
        Search System
      </Button>
      <MachineFilterModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        searchData={searchData}
      />
    </div>
  );
};

export const EditRepairBtn = ({ editId, refreshData }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FaEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={() => setOpen(true)}
      >
        Edit
      </FaEdit>
      <RepairModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        eId={editId}
        refreshData={refreshData}
      />
    </>
  );
};

// Export System Repair Details as Excel//
export const RepairExcelBtn = ({ excelData }) => {
  const [open, setOpen] = useState(false);
  const handleExcel = () => {
    //alert('excel')
    try {
      repairDatatoExcel(excelData);
      toast.success("Download Complet");
      setOpen(false);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        startIcon={<DownloadIcon />}
      >
        Excel Report
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Download System Repair Data</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Want to Export Repair list as Excel?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>

          <Button onClick={handleExcel} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Delete Price Details Entry //
export const DeleteRepairBtn = ({ delId }) => {
  const axios = useAxios();
  const handleRemoveRepair = async () => {
    SweetSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/NabannaSystem/repair/${delId}`);
          toast.success(response.data.message || "Delete Succesfull");
        } catch (error) {
          const { generalError } = handleAxiosError(error);
          toast.error(generalError || "Something went wrong!");
        }
      } else if (result.isDenied) {
        SweetSwal.fire(
          "System Repairing does not need any Charges",
          "",
          "info",
        );
      }
    });
  };

  return (
    <RiDeleteBack2Fill
      style={{ color: "red", fontSize: "25px" }}
      onClick={handleRemoveRepair}
    />
  );
};

// Delete Main Nabanna System Entry Reords //
export const DeleteSystemBtn = ({ del_id, refreshData }) => {
  const axios = useAxios();
  const handleRemoveSystem = () => {
    SweetSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `/NabannaSystem/deleteSystem/${del_id}`,
          );
          SweetSwal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message || "Delete Succesfull",
            showConfirmButton: false,
            timer: 1500,
          });
          refreshData();
        } catch (error) {
          const { generalError } = handleAxiosError(error);
          toast.error(generalError || "Something went wrong!");
        }
      } else if (result.isDenied) {
        SweetSwal.fire(
          "System Repairing does not need any Charges",
          "",
          "info",
        );
      }
    });
  };
  return (
    <RiDeleteBin2Fill
      style={{ color: "red", fontSize: "25px" }}
      onClick={handleRemoveSystem}
    />
  );
};

// Activate AMC Button //
export const ActivateAMCBtn = () => {
  const [open, setOpen] = useState(false);
  const [currentAMCData, setCurrentAMCData] = useState(null);
  const axios = useAxios();

  // 1st Modal Open & Data Apperas
  const modalOpenBtn = async () => {
    try {
      // exisit amc details calling by api
      const resp = await axios.get("/nabannaSystem/amc-detail");
      console.log(resp);
      const amcData = resp.data?.data;
      setCurrentAMCData(amcData); //1 set the data
      setOpen(true);  // open modal 
    } catch (error) {
      const errMSG = error.response.data.message;
      //console.error(errMSG);
      toast.error(errMSG || "Somthing Went Wrong");
    }
  };
 
  // Activate AMC Button Clicked //
  const activateAmc = async() => {
    try {
      const resp = await axios.put("/nabannaSystem/activate-amc")
      console.log(resp)
      const successMSG = resp.data.message 
      toast.success(successMSG)
    } catch (error) {
      console.error(error)
    }
    setOpen(false)// modal close
  }
  return (
    <>
      <Button variant="contained" color="success" onClick={modalOpenBtn}>
        Activate AMC
      </Button>
      <ActivateModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        activateData={currentAMCData}
        handleActivate={activateAmc}
      />
    </>
  );
};

export const RenewalAMCBtn = () => {
  const [open, setOpen] = useState(false);
  const [amcData, setAmcData] = useState(null);
  const axios = useAxios();
  const handleAMC = async () => {
    try {
      const resp = await axios.get("/nabannaSystem/renewal-detail");
      //console.log(resp);
      setAmcData(resp.data?.data);
      setOpen(true);
    } catch (error) {
      const errMSG = error.response.data.message;
      //console.error(errMSG);
      toast.error(errMSG || "Somthing Went Wrong");
    }
  };
  const activateAMC = async (renewData) => {
    // api post call for submit renewData//
    try {
      const resp = await axios.put(
        "/nabannaSystem/activate-renewal",
        renewData,
      );
      console.log(resp);
    } catch (error) {
      const errMSG = error.response.data.message;
      console.error(errMSG);
    }
    setOpen(false); // modal close
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAMC}>
        Renew AMC
      </Button>
      <RenewModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        renewData={amcData}
        handleRenew={activateAMC}
      />
    </>
  );
};
