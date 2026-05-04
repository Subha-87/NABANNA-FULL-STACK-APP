import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { useState } from "react";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import RoomIcon from "@mui/icons-material/Room";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import NotesIcon from "@mui/icons-material/Notes";

const ItemEditForm = ({ info, modStat, onRefresh }) => {
  const axios = useAxios();
  const stockStatus = ["YES", "NO"];

  const handleEdit = async (values, { resetForm, setSubmitting }) => {
    const { _id, allocation, room, remarks, stock } = values;
    try {
      const response = await axios.put(`/itemNabanna/update/${_id}`, {
        allocation,
        remarks,
        room,
        stock,
      });
      toast.success(response.data?.message || "Updated successfully");
      onRefresh();
      resetForm();
      modStat(true); // Standardized close trigger
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Standardized Input Styling
  const inputSx = (hasError) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#fff",
      fontSize: "14px",
      "& fieldset": { borderColor: hasError ? "#ef4444" : "#e2e8f0", borderWidth: "1px" },
      "&:hover fieldset": { borderColor: hasError ? "#ef4444" : "#94a3b8" },
      "&.Mui-focused fieldset": { borderColor: hasError ? "#ef4444" : "#4f46e5" },
    },
    "& .MuiFormHelperText-root": { fontSize: "11px", ml: 0, color: hasError ? "#ef4444" : "transparent" },
    "& .MuiInputLabel-root": { fontSize: "14px", color: "#64748b", "&.Mui-focused": { color: "#4f46e5" } },
  });

  return (
    <Formik initialValues={info} onSubmit={handleEdit}>
      {({ values, handleChange, isSubmitting, setFieldValue }) => (
        
        <Form sx={{ display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden" }}>
          
          {/* --- FIXED HEADER --- */}
          <Box sx={{ background: "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ backgroundColor: "rgba(255,255,255,0.15)", p: 0.8, borderRadius: "10px" }}>
                <EditNoteIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "17px", letterSpacing: "0.5px" }}>Update Nabanna Materials Entry</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", fontWeight: 400, mt: 0.3 }}>Modify allocation, room, or stock status</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => modStat(true)} sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* --- SCROLLABLE CONTENT --- */}
          <Box sx={{ flex: "1 1 0%", minHeight: 0, overflowY: "auto", padding: "28px", display: "block", boxSizing: "border-box", "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: "10px" } }}>
            
            {/* Read-Only Info Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5, mb: 3 }}>
              <Box sx={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box sx={{ backgroundColor: "#eef2ff", p: 0.7, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CalendarTodayIcon sx={{ color: "#4f46e5", fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", mb: 0.4 }}>Date</Typography>
                  <Typography sx={{ color: "#1e293b", fontWeight: 600, fontSize: "14px" }}>{new Date(values.date).toLocaleDateString()}</Typography>
                </Box>
              </Box>

              <Box sx={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box sx={{ backgroundColor: "#eef2ff", p: 0.7, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LocalShippingIcon sx={{ color: "#4f46e5", fontSize: 18 }} />
                </Box>
                <Box sx={{ overflow: "hidden", flex: 1 }}>
                  <Typography sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", mb: 0.4 }}>Sender</Typography>
                  <Typography sx={{ color: "#1e293b", fontWeight: 600, fontSize: "14px", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{values.sender}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Items Table Section */}
            <Box sx={{ mb: 3 }}>
              <SectionLabel icon={<Inventory2Icon sx={{ fontSize: 16 }} />} text="Incoming Items" />
              <TableContainer sx={{ border: "1px solid #e2e8f0", borderRadius: "12px", backgroundColor: "#fff" }}>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: "#eef2ff" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: "#4f46e5", fontSize: "12px", borderBottom: "1px solid #e2e8f0" }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#4f46e5", fontSize: "12px", borderBottom: "1px solid #e2e8f0" }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#4f46e5", fontSize: "12px", borderBottom: "1px solid #e2e8f0" }}>Model</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#4f46e5", fontSize: "12px", borderBottom: "1px solid #e2e8f0" }}>Make</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: "#4f46e5", fontSize: "12px", borderBottom: "1px solid #e2e8f0" }}>Qty</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.itItems.map(({ item, model, make, qty }, i) => (
                      <TableRow key={i} sx={{ "&:last-child td": { border: 0 } }}>
                        <TableCell sx={{ color: "#64748b", fontSize: "13px", borderBottom: "1px solid #f1f5f9" }}>{i + 1}</TableCell>
                        <TableCell sx={{ color: "#334155", fontWeight: 500, fontSize: "13px", borderBottom: "1px solid #f1f5f9" }}>{item}</TableCell>
                        <TableCell sx={{ color: "#334155", fontSize: "13px", borderBottom: "1px solid #f1f5f9" }}>{model}</TableCell>
                        <TableCell sx={{ color: "#334155", fontSize: "13px", borderBottom: "1px solid #f1f5f9" }}>{make}</TableCell>
                        <TableCell sx={{ color: "#334155", fontWeight: 600, fontSize: "13px", borderBottom: "1px solid #f1f5f9" }}>{qty}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Editable Fields Grid */}
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<RoomIcon sx={{ fontSize: 16 }} />} text="Allocation" />
                <TextField fullWidth size="small" name="allocation" label="Current Allocation" value={values.allocation} onChange={handleChange} sx={inputSx(false)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<NotesIcon sx={{ fontSize: 16 }} />} text="Remarks" />
                <TextField fullWidth size="small" name="remarks" label="Remarks" value={values.remarks} onChange={handleChange} sx={inputSx(false)} />
              </Grid>

              <Grid item xs={6} sm={4}>
                <SectionLabel icon={<RoomIcon sx={{ fontSize: 16 }} />} text="Room No" />
                <TextField fullWidth size="small" name="room" label="Room" value={values.room} onChange={handleChange} sx={inputSx(false)} />
              </Grid>

              <Grid item xs={6} sm={8}>
                <SectionLabel icon={<CheckroomIcon sx={{ fontSize: 16 }} />} text="Stock Status" />
                <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                  {stockStatus.map((s) => {
                    const isSelected = values.stock === s;
                    return (
                      <Box key={s} onClick={() => setFieldValue("stock", s)} sx={{ display: "flex", alignItems: "center", gap: 1, padding: "10px 22px", borderRadius: "10px", border: `2px solid ${isSelected ? "#4f46e5" : "#e2e8f0"}`, backgroundColor: isSelected ? "#eef2ff" : "#fff", cursor: "pointer", transition: "all 0.2s ease", "&:hover": { borderColor: "#4f46e5", backgroundColor: "#f5f3ff" } }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: isSelected ? "#4f46e5" : "#cbd5e1", boxShadow: isSelected ? "0 0 0 3px #4f46e540" : "none" }} />
                        <Typography sx={{ fontSize: "13px", fontWeight: isSelected ? 600 : 500, color: isSelected ? "#4f46e5" : "#64748b" }}>{s}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>

          </Box>

          {/* --- FIXED FOOTER --- */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, px: "28px", py: "16px", borderTop: "1px solid #f1f5f9", backgroundColor: "#fff", flexShrink: 0, position: "sticky", bottom: 0, zIndex: 10 }}>
            <Button variant="outlined" onClick={() => modStat(true)} disabled={isSubmitting} sx={{ m: 0, px: 3.5, py: 1.1, borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "13px", borderColor: "#e2e8f0", color: "#64748b", "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" } }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting} sx={{
              m: 0, px: 4, py: 1.1, borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "13px",
              background: "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)", boxShadow: "0 4px 14px rgba(49, 46, 129, 0.35)",
              "&:hover": { background: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%)", boxShadow: "0 6px 20px rgba(49, 46, 129, 0.45)", transform: "translateY(-1px)" },
              "&:active": { transform: "translateY(0)" }, "&:disabled": { background: "#94a3b8", boxShadow: "none", transform: "none" },
            }}>
              {isSubmitting ? (<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><CircularProgress size={16} color="inherit" />Updating...</Box>) : "Update Entry"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// --- HELPER COMPONENT ---
const SectionLabel = ({ icon, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
    <Box sx={{ backgroundColor: "#eef2ff", p: 0.5, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f46e5" }}>{icon}</Box>
    <Typography sx={{ fontWeight: 700, color: "#334155", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
      {text}
    </Typography>
  </Box>
);

export default ItemEditForm;