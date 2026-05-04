import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Checkbox,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";

const RequisitionForm = ({ modStat, onPostData, onSuccess }) => {
  const axios = useAxios();

  const departments = [
    "PWD",
    "Disaster Management",
    "DGP Cell",
    "Agriculture",
    "MA & ME",
    "HOME",
    "L & LR",
    "PAR",
    "I & CA",
    "Finance",
    "13th Floor VVIP",
    "13th Floor CMO",
    "14th Floor CMO",
    "1st Floor Service",
    "KP Police Control/SB",
  ];

  const Letter = ["Internet", "Voice", "PC_Hardware", "Cable-TV", "Misc"];

  const primaryReqValue = {
    date: "",
    letter: null,
    username: "",
    designation: "",
    department: "",
    subgroup: "NA",
    lcategory: [],
    room: "",
    contact: "",
    status: "Pending",
  };

  const MAX_FILE_SIZE = 10240000; // 10MB
  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required!"),
    letter: Yup.mixed()
      .required("Letter is required!")
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image"),
      )
      .test(
        "is-valid-size",
        "Max allowed size is 10MB",
        (value) => value && value.size <= MAX_FILE_SIZE,
      ),
    username: Yup.string().required("Name is required!"),
    designation: Yup.string().required("Rank is required!"),
    department: Yup.string().required("Select Any Department!"),
    lcategory: Yup.array()
      .min(1, "Select at least one option !")
      .required("Select at least one Type option"),
    room: Yup.string().required("Room No is required!"),
    contact: Yup.string().required("Contact is required!"),
  });

  const handleLetterReq = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "lcategory") {
        formData.append("lcategory", JSON.stringify(values.lcategory));
      } else {
        formData.append(key, values[key]);
      }
    }
    try {
      const response = await axios.post("/ItReq/sendReq", formData);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.msg || "Letter saved successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      onSuccess();
      resetForm();
      modStat(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong!");
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
      "& fieldset": {
        borderColor: hasError ? "#ef4444" : "#e2e8f0",
        borderWidth: "1px",
      },
      "&:hover fieldset": { borderColor: hasError ? "#ef4444" : "#94a3b8" },
      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#ef4444" : "#00897b",
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
      "&.Mui-focused": { color: "#00897b" },
    },
  });

  return (
    <Formik
      initialValues={primaryReqValue}
      validationSchema={validationSchema}
      onSubmit={handleLetterReq}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        errors,
        touched,
        handleBlur,
        isSubmitting,
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
                "linear-gradient(135deg, #004d40 0%, #00695c 50%, #00897b 100%)",
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
                <NoteAddIcon sx={{ color: "#fff", fontSize: 24 }} />
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
                  Nabanna Requisition Form
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "12px",
                    fontWeight: 400,
                    mt: 0.3,
                  }}
                >
                  Fill in the IT requirement details below
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
              flex: "1 1 0%", // Changed from flex: 1
              minHeight: 0,
              overflowY: "auto",
              padding: "28px",
              display: "block", // CRITICAL FIX: Stops MUI Grid's negative margins from breaking flex height
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "10px",
              },
            }}
          >
            <Grid container spacing={2.5}>
              {/* ... your form fields ... */}
              {/* Date & File Upload Row */}
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<CloudUploadIcon sx={{ fontSize: 16 }} />}
                  text="Upload Letter"
                  required
                />
                <Box sx={{ position: "relative" }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="letter-upload"
                    onChange={(e) =>
                      setFieldValue("letter", e.currentTarget.files[0])
                    }
                    onBlur={handleBlur}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="letter-upload"
                    style={{ width: "100%", cursor: "pointer" }}
                  >
                    <Box
                      sx={{
                        height: "40px",
                        border: `1px dashed ${touched.letter && errors.letter ? "#ef4444" : "#94a3b8"}`,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        backgroundColor: values.letter ? "#f0fdfa" : "#f8fafc",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#00897b",
                          backgroundColor: "#f0fdfa",
                        },
                      }}
                    >
                      <CloudUploadIcon
                        sx={{
                          color: values.letter ? "#00897b" : "#94a3b8",
                          fontSize: 18,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: values.letter ? "#00897b" : "#64748b",
                          fontWeight: 500,
                        }}
                      >
                        {values.letter ? values.letter.name : "Choose File..."}
                      </Typography>
                    </Box>
                  </label>
                </Box>
                {touched.letter && errors.letter && (
                  <FieldError text={errors.letter} />
                )}
              </Grid>

              {/* User Details Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
                  text="Applicant Name"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  name="username"
                  label="Enter Name"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={
                    touched.username && errors.username ? errors.username : " "
                  }
                  sx={inputSx(touched.username && errors.username)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<BadgeIcon sx={{ fontSize: 16 }} />}
                  text="Designation"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  name="designation"
                  label="Enter Rank"
                  value={values.designation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.designation && Boolean(errors.designation)}
                  helperText={
                    touched.designation && errors.designation
                      ? errors.designation
                      : " "
                  }
                  sx={inputSx(touched.designation && errors.designation)}
                />
              </Grid>

              {/* Department & Group Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<ApartmentIcon sx={{ fontSize: 16 }} />}
                  text="Department"
                  required
                />
                <TextField
                  fullWidth
                  select
                  size="small"
                  name="department"
                  label="Select Department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.department && Boolean(errors.department)}
                  helperText={
                    touched.department && errors.department
                      ? errors.department
                      : " "
                  }
                  sx={inputSx(touched.department && errors.department)}
                >
                  {departments.map((dept, index) => (
                    <MenuItem key={index} value={dept.toLowerCase()}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<GroupIcon sx={{ fontSize: 16 }} />}
                  text="Group / Cell"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="subgroup"
                  label="Optional"
                  value={values.subgroup}
                  onChange={handleChange}
                  sx={inputSx(false)}
                />
              </Grid>

              {/* Letter Type Checkboxes (Interactive) */}
              <Grid item xs={12}>
                <SectionLabel
                  icon={<ListAltIcon sx={{ fontSize: 16 }} />}
                  text="Letter Type"
                  required
                />
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}
                >
                  {Letter.map((type) => {
                    const isChecked = values.lcategory.includes(type);
                    return (
                      <Box
                        key={type}
                        onClick={() =>
                          setFieldValue(
                            "lcategory",
                            isChecked
                              ? values.lcategory.filter((v) => v !== type)
                              : [...values.lcategory, type],
                          )
                        }
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: `1.5px solid ${isChecked ? "#00897b" : "#e2e8f0"}`,
                          backgroundColor: isChecked ? "#e0f2f1" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "#00897b",
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        <Checkbox
                          checked={isChecked}
                          sx={{
                            p: 0,
                            m: 0,
                            color: "#00897b",
                            "&.Mui-checked": { color: "#00897b" },
                          }}
                          size="small"
                        />
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: isChecked ? 600 : 400,
                            color: isChecked ? "#00695c" : "#475569",
                          }}
                        >
                          {type}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
                {touched.lcategory && errors.lcategory && (
                  <FieldError text={errors.lcategory} />
                )}
              </Grid>

              {/* Room & Contact Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<RoomIcon sx={{ fontSize: 16 }} />}
                  text="Room No"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  name="room"
                  label="Enter Room Number"
                  value={values.room}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.room && Boolean(errors.room)}
                  helperText={touched.room && errors.room ? errors.room : " "}
                  sx={inputSx(touched.room && errors.room)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel
                  icon={<PhoneIcon sx={{ fontSize: 16 }} />}
                  text="Contact No"
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  name="contact"
                  label="Enter Contact"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact && Boolean(errors.contact)}
                  helperText={
                    touched.contact && errors.contact ? errors.contact : " "
                  }
                  sx={inputSx(touched.contact && errors.contact)}
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
              // Extra safety: force footer to sit exactly at the bottom boundary
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
                  "linear-gradient(135deg, #004d40 0%, #00695c 50%, #00897b 100%)",
                boxShadow: "0 4px 14px rgba(0, 77, 64, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #00332b 0%, #00564d 50%, #00796b 100%)",
                  boxShadow: "0 6px 20px rgba(0, 77, 64, 0.45)",
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
                "Submit Requisition"
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
        backgroundColor: "#e0f2f1",
        p: 0.5,
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#00897b",
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

const FieldError = ({ text }) => (
  <Typography sx={{ fontSize: "11px", color: "#ef4444", mt: 0.5, ml: 0.5 }}>
    {text}
  </Typography>
);

export default RequisitionForm;
