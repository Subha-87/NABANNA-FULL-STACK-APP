import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Dialog,
  Avatar,
  Stack,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { CloseIcon } from "@mui/icons-material";
import {
  BoxAddModal,
  BoxEditModal,
  BoxSearchResultModal,
} from "../Modal/CATVModal";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import { color } from "framer-motion";
import { useDialog } from "../Dialog/useDialog";
import {
  Devices,
  Tv,
  SettingsInputAntenna,
  HighQuality,
  SdStorage,
  CheckCircle,
  Cancel,
  Close,
  Inbox,
} from "@mui/icons-material";

// ADD BOX DATA //
export const AddBoxButton = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        ADD BOX
      </Button>
      <BoxAddModal
        isOpen={open}
        isClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};

// BOX STATUS VIEW BUTTON //

export const ViewBoxStatus = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState([]);

  const { open, dialogData, openDialog, closeDialog } = useDialog();

  const handleView = async () => {
    try {
      const response = await axios.get("/nabanna/showAll");
      //console.log(response.data.data);
      setViewData(response.data.data || []);
      openDialog();
      //console.log(dialogData)
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: viewData.length,
    meghbela: viewData.filter((item) => item.boxMake === "Meghbela").length,
    tataPlay: viewData.filter((item) => item.boxMake === "Tata Play").length,
    hd: viewData.filter((item) => item.boxType === "HD").length,
    sd: viewData.filter((item) => item.boxType === "SD").length,
    active: viewData.filter((item) => item.boxStatus === "Active").length,
    inactive: viewData.filter((item) => item.boxStatus === "Inactive").length,
  };
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        startIcon={<GrView />}
        onClick={handleView}
      >
        Status
      </Button>
      <Dialog
        open={open}
        onClose={closeDialog}
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              maxWidth: 520,
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(90deg,rgba(44, 42, 155, 1) 0%, rgba(193, 85, 173, 1) 100%, rgba(87, 199, 133, 1) 63%, rgba(237, 221, 83, 1) 100%)",
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 40, height: 40 }}
          >
            <Devices sx={{ color: "#fff", fontSize: 22 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} color="#fff">
              Set Top Box Overview
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              Nabanna — Total Count: {stats.total}
            </Typography>
          </Box>
          <IconButton onClick={closeDialog} sx={{ ml: "auto", color: "#fff" }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* Body */}
        <Box p={3}>
          {viewData?.length > 0 ? (
            <>
              {/* Provider Section */}
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Provider
              </Typography>
              <Stack direction="row" spacing={2} mt={1} mb={3}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#E3F2FD",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#1565C0", width: 36, height: 36 }}>
                    <Tv sx={{ color: "#fff", fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#1565C0", fontWeight: 500 }}
                    >
                      Tata Play
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#0D47A1", lineHeight: 1.2 }}
                    >
                      {stats.tataPlay}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#FFF3E0",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#E65100", width: 36, height: 36 }}>
                    <SettingsInputAntenna
                      sx={{ color: "#fff", fontSize: 18 }}
                    />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#E65100", fontWeight: 500 }}
                    >
                      Meghbela
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#BF360C", lineHeight: 1.2 }}
                    >
                      {stats.meghbela}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Box Type Section */}
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Box Type
              </Typography>
              <Stack direction="row" spacing={2} mt={1} mb={3}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#E8F5E9",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#2E7D32", width: 36, height: 36 }}>
                    <HighQuality sx={{ color: "#fff", fontSize: 16 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#2E7D32", fontWeight: 500 }}
                    >
                      HD Box
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#1B5E20", lineHeight: 1.2 }}
                    >
                      {stats.hd}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#F3E5F5",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#7B1FA2", width: 36, height: 36 }}>
                    <SdStorage sx={{ color: "#fff", fontSize: 16 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#7B1FA2", fontWeight: 500 }}
                    >
                      SD Box
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#4A148C", lineHeight: 1.2 }}
                    >
                      {stats.sd}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Status Section */}
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Status
              </Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#E8F5E9",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#2E7D32", width: 36, height: 36 }}>
                    <CheckCircle sx={{ color: "#fff", fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#2E7D32", fontWeight: 500 }}
                    >
                      Active
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#1B5E20", lineHeight: 1.2 }}
                    >
                      {stats.active}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#FFEBEE",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#C62828", width: 36, height: 36 }}>
                    <Cancel sx={{ color: "#fff", fontSize: 18 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#C62828", fontWeight: 500 }}
                    >
                      Inactive
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: "#B71C1C", lineHeight: 1.2 }}
                    >
                      {stats.inactive}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </>
          ) : (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
              }}
            >
              <Inbox sx={{ fontSize: 48, color: "#BDBDBD", mb: 1 }} />
              <Typography color="text.secondary" fontWeight={500}>
                No Data Available
              </Typography>
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
};

// SEARCH BOX DATA//
export const SearchBoxButton = ({ searchData, clearData }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const axios = useAxios();

  const handleBoxSearch = async () => {
    // Code to be Writen//
    if (!searchData) return; // Prevent empty searches
    setIsSearching(true);
    try {
      //console.log("Searching for:", searchData);
      // Write your API fetching code here
      const response = await axios.get(
        `/nabanna/searchBox?query=${searchData}`,
      );
      //console.log(response.data)
      setSearchResult(response.data.data); // 1️⃣ set data first
      setOpenSearchModal(true); // 2️⃣ open modal
      toast.success(response.data?.message || "Data Found"); // 3️⃣ feedback
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      setIsSearching(false);
    }
    clearData(); // clear Search Input Field //
  };
  return (
    <>
      <Button
        id="box-search-btn" // ID used for Enter key trigger
        variant="contained"
        disabled={isSearching || !searchData} // Disables if loading or input is empty
        startIcon={
          isSearching ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SearchIcon />
          )
        }
        onClick={handleBoxSearch}
        sx={{
          minWidth: 120,
          height: 40,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          // Professional Gradient Styling (Purple/Pink to match secondary theme)
          background: "linear-gradient(45deg, #8E24AA 30%, #D81B60 90%)",
          boxShadow: "0 3px 5px 2px rgba(142, 36, 170, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #7B1FA2 30%, #C2185B 90%)",
            boxShadow: "0 4px 8px 3px rgba(142, 36, 170, .4)",
          },
        }}
      >
        {isSearching ? "Searching..." : "Find"}
      </Button>

      <BoxSearchResultModal
        isModalOpen={openSearchModal}
        isModalClose={() => setOpenSearchModal(false)}
        searchResult={searchResult}
      />
    </>
  );
};

// EDIT & DELETE TOGETHER//
export const ActionBoxBtn = ({ configData, onRefresh }) => {
  const axios = useAxios();
  const [open, setOpen] = useState(false);

  // BOX Delete Function //
  const BoxDelete = () => {
    const del_id = configData._id;
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
          const response = await axios.delete(`/nabanna/removeBox/${del_id}`);
          console.log(response);
          toast.success(response.data.message || "Delete Succesfull");
          onRefresh();
        } catch (error) {
          const { generalError } = handleAxiosError(error);
          toast.error(generalError || "Something went wrong!");
        }
      }
    });
  };
  return (
    <>
      <>
        <FaEdit
          style={{ color: "green", fontSize: "20px" }}
          onClick={() => setOpen(true)}
        />
        <BoxEditModal
          isModalOpen={open}
          isModalClose={() => setOpen(false)}
          editData={configData}
          onRefresh={onRefresh}
        />
      </>
      <MdDeleteForever
        style={{ color: "red", fontSize: "22px", marginLeft: "2px" }}
        onClick={BoxDelete}
      />
    </>
  );
};
