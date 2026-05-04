import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import RoomIcon from "@mui/icons-material/Room";
import NotesIcon from "@mui/icons-material/Notes";

const MaterialForm = ({ modStat, onSuccess }) => {
  const axios = useAxios();

  const formInitialValues = {
    date: "",
    sender: "",
    customSender: "",
    challan: "",
    itItems: [{ item: "", model: "", make: "", qty: 0, serial: "" }],
    stock: "",
    allocation: "",
    room: "",
    remarks: "",
  };

  const itemSenders = [
    "Writers Building(IT)",
    "Pascal Computer",
    "Consulting Technologies",
    "Compunet System",
    "Prakash Electricals",
    "Aircon",
    "Iris System",
    "Embee",
    "Others",
  ];

  const stockStatus = ["YES", "NO"];

  const CustomSelect = () => {
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
      if (values.sender !== "others") setFieldValue("customSender", "");
    }, [values.sender, setFieldValue]);
    return null;
  };

  const validation = Yup.object().shape({
    date: Yup.date().required("Date is required!"),
    sender: Yup.string().required("Select Sender!"),
    challan: Yup.string().required("Challan is required!"),
    allocation: Yup.string().required("Allocation is required"),
  });

  const handleItemSubmit = async (values, action) => {
    const { sender, customSender } = values;
    const { resetForm, setSubmitting } = action;
    values.sender = sender !== "others" ? sender : customSender;

    try {
      const response = await axios.post("/itemNabanna/incoming", values);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      onSuccess();
      resetForm();
      modStat(true);
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Standardized Input Styling for Indigo Theme
  const inputSx = (hasError) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#fff",
      fontSize: "14px",
      "& fieldset": {
        borderColor: hasError ? "#ef4444" : "#e2e8f0",
        borderWidth: "1px",
      },
      "&:hover fieldset": { borderColor: hasError ? "#ef4444" : "#94a3b8" },
      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#ef4444" : "#4f46e5",
      },
    },
    "& .MuiFormHelperText-root": {
      fontSize: "11px",
      ml: 0,
      color: hasError ? "#ef4444" : "transparent",
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      color: "#64748b",
      "&.Mui-focused": { color: "#4f46e5" },
    },
  });

  // Compact styling for inline array fields (using placeholders to save space)
  const miniInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#fff",
      fontSize: "13px",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#a5b4fc" },
      "&.Mui-focused fieldset": { borderColor: "#4f46e5" },
    },
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validation}
      onSubmit={handleItemSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        touched,
        handleBlur,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
            overflow: "hidden",
          }}
        >
          {/* --- FIXED HEADER --- */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)",
              padding: "22px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  p: 0.8,
                  borderRadius: "10px",
                }}
              >
                <Inventory2Icon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "17px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Add Incoming Material Details
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "12px",
                    fontWeight: 400,
                    mt: 0.3,
                  }}
                >
                  Nabanna IT Inventory Cell
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => modStat(true)}
              sx={{
                color: "rgba(255,255,255,0.7)",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* --- SCROLLABLE CONTENT --- */}
          <Box
            sx={{
              flex: "1 1 0%",
              minHeight: 0,
              overflowY: "auto",
              padding: "28px",
              display: "block",
              boxSizing: "border-box",
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "10px",
              },
            }}
          >
            <CustomSelect />

            {/* Top Info Grid */}
            <Grid container spacing={2.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <SectionLabel
                  icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                  text="Date"
                  required
                />
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date ? errors.date : " "}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx(touched.date && errors.date)}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <SectionLabel
                  icon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
                  text="Sender"
                  required
                />
                <TextField
                  fullWidth
                  select
                  size="small"
                  name="sender"
                  label="Select Sender"
                  value={values.sender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sender && Boolean(errors.sender)}
                  helperText={
                    touched.sender && errors.sender ? errors.sender : " "
                  }
                  sx={{
                    width: "200px",
                    ...inputSx(touched.sender && errors.sender),
                  }} // Strict 150px width
                >
                  {itemSenders.map((vendor) => (
                    <MenuItem key={vendor} value={vendor.toLowerCase()}>
                      {vendor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* CONDITIONAL "OTHERS" FIELD APPEARS HERE, RIGHT NEXT TO SENDER */}
              {values.sender === "others" && (
                <Grid item xs={12} sm={4}>
                  <SectionLabel
                    icon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
                    text="Agency Name"
                    required
                  />
                  <TextField
                    fullWidth
                    size="small"
                    name="customSender"
                    label="Mention Agency"
                    value={values.customSender}
                    onChange={handleChange}
                    sx={inputSx(false)}
                  />
                </Grid>
              )}

              {/* CHALLAN DYNAMICALLY TAKES REMAINING SPACE (8 IF OTHERS IS HIDDEN, 4 IF VISIBLE) */}
              <Grid item xs={12} sm>
                <SectionLabel
                  icon={<ReceiptLongIcon sx={{ fontSize: 16 }} />}
                  text="Challan No"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  name="challan"
                  label="Enter Challan"
                  value={values.challan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.challan && Boolean(errors.challan)}
                  helperText={
                    touched.challan && errors.challan ? errors.challan : " "
                  }
                  sx={inputSx(touched.challan && errors.challan)}
                />
              </Grid>
            </Grid>

            {/* Dynamic Items Section - SINGLE ROW LAYOUT */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <SectionLabel
                  icon={<WidgetsIcon sx={{ fontSize: 16 }} />}
                  text="IT Items"
                />
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() =>
                    setFieldValue("itItems", [
                      ...values.itItems,
                      { item: "", model: "", make: "", qty: 0, serial: "" },
                    ])
                  }
                  sx={{
                    color: "#4f46e5",
                    fontWeight: 600,
                    fontSize: "12px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#eef2ff" },
                  }}
                >
                  Add Item
                </Button>
              </Box>

              <FieldArray name="itItems">
                {({ remove }) => (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {values.itItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center", // Vertically aligns all inputs perfectly
                          gap: 1.5,
                          p: 2,
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <Typography
                          sx={{
                            minWidth: "25px",
                            fontWeight: 700,
                            color: "#4f46e5",
                            fontSize: "14px",
                          }}
                        >
                          {index + 1}.
                        </Typography>

                        <Field name={`itItems.${index}.item`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              size="small"
                              placeholder="Item Name"
                              sx={{ ...miniInputSx, flex: 2 }}
                            />
                          )}
                        </Field>

                        <Field name={`itItems.${index}.model`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              size="small"
                              placeholder="Model"
                              sx={{ ...miniInputSx, flex: 1 }}
                            />
                          )}
                        </Field>

                        <Field name={`itItems.${index}.make`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              size="small"
                              placeholder="Make"
                              sx={{ ...miniInputSx, flex: 1 }}
                            />
                          )}
                        </Field>

                        <Field name={`itItems.${index}.qty`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              type="number"
                              size="small"
                              placeholder="Qty"
                              sx={{
                                ...miniInputSx,
                                width: "70px", // Fixed small width for quantity
                                flex: "none", // Prevents flexbox from stretching it
                              }}
                            />
                          )}
                        </Field>

                        <Field name={`itItems.${index}.serial`}>
                          {({ field }) => (
                            <TextField
                              {...field}
                              size="small"
                              placeholder="Serial No"
                              sx={{ ...miniInputSx, flex: 2 }}
                            />
                          )}
                        </Field>

                        {index > 0 && (
                          <IconButton
                            onClick={() => remove(index)}
                            sx={{
                              color: "#ef4444",
                              backgroundColor: "#fef2f2",
                              "&:hover": { backgroundColor: "#fee2e2" },
                              flex: "none", // Keeps delete button from shrinking
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
              </FieldArray>
            </Box>

            {/* Bottom Info Grid */}
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<CheckroomIcon sx={{ fontSize: 16 }} />}
                  text="Stock IT"
                />
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  {stockStatus.map((s) => {
                    const isSelected = values.stock === s;
                    return (
                      <Box
                        key={s}
                        onClick={() => setFieldValue("stock", s)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          padding: "10px 22px",
                          borderRadius: "10px",
                          border: `2px solid ${isSelected ? "#4f46e5" : "#e2e8f0"}`,
                          backgroundColor: isSelected ? "#eef2ff" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "#4f46e5",
                            backgroundColor: "#f5f3ff",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: isSelected ? "#4f46e5" : "#cbd5e1",
                            boxShadow: isSelected
                              ? "0 0 0 3px #4f46e540"
                              : "none",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? "#4f46e5" : "#64748b",
                          }}
                        >
                          {s}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<RoomIcon sx={{ fontSize: 16 }} />}
                  text="Allocation"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  name="allocation"
                  label="Enter Allocation"
                  value={values.allocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.allocation && Boolean(errors.allocation)}
                  helperText={
                    touched.allocation && errors.allocation
                      ? errors.allocation
                      : " "
                  }
                  sx={inputSx(touched.allocation && errors.allocation)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<RoomIcon sx={{ fontSize: 16 }} />}
                  text="Room No"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="room"
                  label="Optional"
                  value={values.room}
                  onChange={handleChange}
                  sx={inputSx(false)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<NotesIcon sx={{ fontSize: 16 }} />}
                  text="Remarks"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="remarks"
                  label="Optional"
                  value={values.remarks}
                  onChange={handleChange}
                  sx={inputSx(false)}
                />
              </Grid>
            </Grid>
          </Box>

          {/* --- FIXED FOOTER --- */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              px: "28px",
              py: "16px",
              borderTop: "1px solid #f1f5f9",
              backgroundColor: "#fff",
              flexShrink: 0,
              position: "sticky",
              bottom: 0,
              zIndex: 10,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => modStat(true)}
              disabled={isSubmitting}
              sx={{
                m: 0,
                px: 3.5,
                py: 1.1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                borderColor: "#e2e8f0",
                color: "#64748b",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  backgroundColor: "#f8fafc",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                m: 0,
                px: 4,
                py: 1.1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                background:
                  "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)",
                boxShadow: "0 4px 14px rgba(49, 46, 129, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%)",
                  boxShadow: "0 6px 20px rgba(49, 46, 129, 0.45)",
                  transform: "translateY(-1px)",
                },
                "&:active": { transform: "translateY(0)" },
                "&:disabled": {
                  background: "#94a3b8",
                  boxShadow: "none",
                  transform: "none",
                },
              }}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} color="inherit" />
                  Submitting...
                </Box>
              ) : (
                "Save Inventory"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// --- HELPER COMPONENTS ---
const SectionLabel = ({ icon, text, required }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
    <Box
      sx={{
        backgroundColor: "#eef2ff",
        p: 0.5,
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4f46e5",
      }}
    >
      {icon}
    </Box>
    <Typography
      sx={{
        fontWeight: 700,
        color: "#334155",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      {text} {required && <span style={{ color: "#ef4444" }}>*</span>}
    </Typography>
  </Box>
);

export default MaterialForm;
