import {
  Modal,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { modalStyle } from "./styleModal";
import MachineEntry from "../FormikForm/MachineEntry";
import RepairForm from "../FormikForm/RepairForm";
//import SearchSystemDetails from "../Table/SearchSystemDetails";
import MachineTable from "../Table/MachineTable";
import EditMachine from "../FormikForm/EditMachine";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  Close,
  Computer,
  VerifiedUser,
  Security,
  WarningAmber,
  ThumbUpOffAlt,
  TrendingFlat,
  ThumbDownOffAlt,
} from "@mui/icons-material";

import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import MachineInfoCard from "../Cards/MachineCards/MachineInfoCard";
import RenewalCard from "./ModalCard/RenewalCard";

export const AddMachineModal = ({ isModalOpen, isModalClose, onSuccess }) => {
  const handleModal = () => {
    isModalClose();
  };

  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <MachineEntry modStat={handleModal} onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
};

export const MachineFilterModal = ({
  isModalOpen,
  isModalClose,
  searchData,
}) => {
  //console.log(searchData) // search data == serail/make/model but search data != username /dept no passing as props to machine table//
  const modalStyleMachine = {
    position: "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "fit-content",
    minWidth: "700px",
    maxWidth: "90vw",

    maxHeight: "85vh",

    bgcolor: "#f5f7fb",

    borderRadius: "18px",

    boxShadow: 24,

    overflowY: "auto",

    p: 3,
  };
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyleMachine}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <MachineInfoCard
            searchResult={searchData}
            modalClose={isModalClose}
          />
        </Box>
        {/* Machine Table is common for both kind of filter data*/}
      </Box>
    </Modal>
  );
};

// Edit Modal Section //
export const EditMachineModal = ({
  isModalOpen,
  isModalClose,
  selectedRow,
  refreshData,
}) => {
  //console.log(selectedRow)
  const handleModal = () => {
    isModalClose();
  };
  const editModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    minWidth: "320px", // Lowered for small screens
    maxWidth: "90vw",
    maxHeight: "85vh",
    borderRadius: "16px",
    boxShadow:
      "0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    p: 0,
    bgcolor: "background.paper",
    overflow: "hidden",
    animation: "modalFadeIn 0.3s ease-out",
    display: "flex", // Added
    flexDirection: "column", // Added
  };
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={editModalStyle}>
        <EditMachine
          editData={selectedRow}
          modStat={handleModal}
          refreshData={refreshData}
        />
      </Box>
    </Modal>
  );
};
// Status View Button Display //

export const StatusModal = ({ isModalOpen, isModalClose }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 600 },
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 0,
    outline: "none",
    overflow: "hidden",
  };

  const getAllSystemData = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/NabannaSystem");
      setData(resp.data.data);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something is Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getAllSystemData();
    }
  }, [isModalOpen]);

  const totalSystems = data.length;
  const warrantyActive = data.filter(
    (d) => d.remainingWarranty !== "Expired",
  ).length;
  const amcCovered = data.filter((d) => d.amcStatus === "ON").length;
  const expiredSystems = data.filter(
    (d) => d.remainingWarranty === "Expired" && d.amcStatus !== "ON",
  ).length;

  const conditionCount = {
    GOOD: data.filter((d) => d.systemCondition === "GOOD").length,
    AVERAGE: data.filter((d) => d.systemCondition === "AVERAGE").length,
    BAD: data.filter((d) => d.systemCondition === "BAD").length,
  };

  // Helper to calculate percentages safely
  const getPercentage = (count) =>
    totalSystems > 0 ? (count / totalSystems) * 100 : 0;

  const statCards = [
    {
      title: "Total Installed",
      value: totalSystems,
      icon: <Computer sx={{ fontSize: 28 }} />,
      bgColor: "bg-slate-50",
      textColor: "text-slate-800",
      iconColor: "text-slate-500",
      borderColor: "border-slate-100",
    },
    {
      title: "Under Warranty",
      value: warrantyActive,
      icon: <VerifiedUser sx={{ fontSize: 28 }} />,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-800",
      iconColor: "text-emerald-500",
      borderColor: "border-emerald-100",
    },
    {
      title: "AMC Covered",
      value: amcCovered,
      icon: <Security sx={{ fontSize: 28 }} />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      iconColor: "text-blue-500",
      borderColor: "border-blue-100",
    },
    {
      title: "Expired / Uncovered",
      value: expiredSystems,
      icon: <WarningAmber sx={{ fontSize: 28 }} />,
      bgColor: "bg-rose-50",
      textColor: "text-rose-800",
      iconColor: "text-rose-500",
      borderColor: "border-rose-100",
    },
  ];

  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              System Status
            </h2>
            <p className="text-blue-200 text-sm mt-1">
              Nabanna Hardware Overview
            </p>
          </div>
          <IconButton
            onClick={isModalClose}
            className="text-white hover:bg-white/10"
          >
            <Close />
          </IconButton>
        </div>

        {/* Body */}
        <div className="p-6 bg-white">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <CircularProgress />
            </div>
          ) : error ? (
            <Alert variant="filled" severity="error" className="rounded-lg">
              {error}
            </Alert>
          ) : (
            <>
              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {statCards.map((stat) => (
                  <div
                    key={stat.title}
                    className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 flex items-center transition-transform hover:scale-105 cursor-default`}
                  >
                    <div className={`${stat.iconColor} mr-4`}>{stat.icon}</div>
                    <div>
                      <p
                        className={`text-xs font-semibold ${stat.textColor} opacity-80 uppercase tracking-wider`}
                      >
                        {stat.title}
                      </p>
                      <h3 className={`text-2xl font-bold ${stat.textColor}`}>
                        {stat.value}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Condition Section */}
              <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                  System Condition
                </h3>

                <div className="space-y-4">
                  {/* Good */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center text-sm font-medium text-emerald-700">
                        <ThumbUpOffAlt fontSize="small" className="mr-2" /> Good
                      </span>
                      <span className="text-sm font-bold text-emerald-700">
                        {conditionCount.GOOD} (
                        {getPercentage(conditionCount.GOOD).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getPercentage(conditionCount.GOOD)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Average */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center text-sm font-medium text-amber-700">
                        <TrendingFlat fontSize="small" className="mr-2" />{" "}
                        Average
                      </span>
                      <span className="text-sm font-bold text-amber-700">
                        {conditionCount.AVERAGE} (
                        {getPercentage(conditionCount.AVERAGE).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getPercentage(conditionCount.AVERAGE)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Bad */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center text-sm font-medium text-rose-700">
                        <ThumbDownOffAlt fontSize="small" className="mr-2" />{" "}
                        Bad
                      </span>
                      <span className="text-sm font-bold text-rose-700">
                        {conditionCount.BAD} (
                        {getPercentage(conditionCount.BAD).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getPercentage(conditionCount.BAD)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

// Repair Modal//

export const RepairModal = ({
  isModalOpen,
  isModalClose,
  eId,
  refreshData,
}) => {
  const handleModal = () => {
    isModalClose();
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    minWidth: "600px", // Slightly adjusted for better proportion
    maxWidth: "90vw",
    maxHeight: "85vh",
    borderRadius: "16px",
    boxShadow:
      "0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    bgcolor: "background.paper",
    overflow: "hidden", // Keeps the corners sharp
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e5e7eb", // Subtle border
    animation: "modalFadeIn 0.3s ease-out",
  };
  return (
    <Modal open={isModalOpen} onClose={isModalClose} disableAutoFocus={true}>
      {/* 
        added overflowY: 'auto' to the inner Box or a wrapper 
        so the form scrolls within the modal, but the header stays if we had one.
      */}
      <Box sx={{ ...modalStyle, overflowY: "auto" }}>
        <RepairForm
          edit_id={eId}
          modStat={handleModal}
          refreshData={refreshData}
        />
      </Box>
    </Modal>
  );
};

export const RenewModal = ({isModalOpen,isModalClose,renewData,handleRenew}) => {
  
  return(
    <Modal open={isModalOpen} onClose={isModalClose}>
       <Box sx={modalStyle}>
          <RenewalCard onClose={isModalClose} amcData={renewData} onRenew={handleRenew}/>
       </Box>
    </Modal>
  )
}
