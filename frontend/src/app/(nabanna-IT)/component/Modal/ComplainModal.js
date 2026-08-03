import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  CircularProgress,
  Grid,
  MenuItem,
} from "@mui/material";
import { modalStyle } from "./styleModal";
import { Formik, Form, Field } from "formik";
import { useAxios } from "@/app/Hook/useAxios";
import * as Yup from "yup";
import "../CSS/ModalForm.css";
import { useAuth } from "@/app/Hook/useAuth";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PersonIcon from "@mui/icons-material/Person";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import BugReportIcon from "@mui/icons-material/BugReport";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchNet from "../Search-Result-Table/SearchNet"

export const EditComplainModal = ({
  isModalOpen,
  isModalClose,
  editData,
  onRefresh,
}) => {
  const { authName } = useAuth();
  const axios = useAxios();

  const { _id, status, domain, username, complain, type, remarks } = editData;

  const initialDataforEdit = {
    _id,
    status,
    remarks: "",
  };

  const validation = Yup.object().shape({
    remarks: Yup.string()
      .required("Remarks is required")
      .min(3, "Remarks must be at least 3 characters"),
  });

  // ✅ UPDATED: Colors matching previous component (Red, Yellow, Green)
  const statusOptions = [
    { value: "Pending", label: "Pending", color: "#ef4444", bg: "#fef2f2" },
    {
      value: "In Progress",
      label: "In Progress",
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    { value: "Complete", label: "Complete", color: "#22c55e", bg: "#f0fdf4" },
  ];

  const handleEditComplain = async (values, { setSubmitting }) => {
    const { remarks, status } = values;
    const setRemarks = authName.split(" ")[0] + ": " + remarks;

    try {
      const response = await axios.put(`/complain/edit/${_id}`, {
        setRemarks,
        status,
      });
      //console.log(response)
      toast.success(response.data.message);
      isModalClose(true);
      onRefresh();
    } catch (error) {
      //console.error(error)
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <Formik
          initialValues={initialDataforEdit}
          onSubmit={handleEditComplain}
          validationSchema={validation}
        >
          {({ values, isSubmitting, setFieldValue, errors, touched }) => (
            <Form>
              {/* Header Section */}
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
                  padding: "22px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                    <EditNoteIcon sx={{ color: "#fff", fontSize: 24 }} />
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
                      Update {domain?.toUpperCase()} Complain
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "12px",
                        fontWeight: 400,
                        mt: 0.3,
                      }}
                    >
                      Review and update the complain status
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => isModalClose(true)}
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

              {/* Content Section */}
              <Box sx={{ padding: "28px", maxHeight: 400, overflowY: "auto" }}>
                {/* ✅ UPDATED: Stacked Flex Column instead of Grid */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    mb: 2.5,
                  }}
                >
                  {/* Username Card */}
                  <Box
                    sx={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px 18px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#eff6ff",
                        p: 0.7,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PersonIcon sx={{ color: "#3b82f6", fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "#94a3b8",
                          fontWeight: 600,
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          mb: 0.4,
                        }}
                      >
                        Username
                      </Typography>
                      <Typography
                        sx={{
                          color: "#1e293b",
                          fontWeight: 600,
                          fontSize: "14px",
                        }}
                      >
                        {username}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Problem Card (Now underneath) */}
                  <Box
                    sx={{
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "12px",
                      padding: "16px 18px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#fee2e2",
                        p: 0.7,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ReportProblemIcon
                        sx={{ color: "#ef4444", fontSize: 18 }}
                      />
                    </Box>
                    <Box sx={{ overflow: "hidden", flex: 1 }}>
                      <Typography
                        sx={{
                          color: "#94a3b8",
                          fontWeight: 600,
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          mb: 0.4,
                        }}
                      >
                        Problem
                      </Typography>
                      <Typography
                        sx={{
                          color: "#991b1b",
                          fontWeight: 600,
                          fontSize: "14px",
                          wordBreak: "break-word",
                          lineHeight: 1.5,
                        }}
                      >
                        {complain ? `${type}: ${complain}` : type}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Previous Remarks */}
                {remarks && (
                  <Box
                    sx={{
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "10px",
                      padding: "14px 18px",
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <HistoryIcon sx={{ color: "#22c55e", fontSize: 16 }} />
                      <Typography
                        sx={{
                          color: "#15803d",
                          fontWeight: 600,
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Previous Remarks
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#166534",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                        maxHeight: "80px",
                        overflow: "auto",
                      }}
                    >
                      {remarks}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 2, borderColor: "#e2e8f0" }} />

                {/* Status Selection */}
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#eef2ff",
                        p: 0.5,
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AssignmentIcon sx={{ color: "#6366f1", fontSize: 16 }} />
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
                      Work Status
                    </Typography>
                  </Box>

                  {/* ✅ UPDATED: Flex row stretched with Red/Yellow/Green borders */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {statusOptions.map((option) => {
                      const isSelected = values.status === option.value;
                      return (
                        <Box
                          key={option.value}
                          onClick={() => setFieldValue("status", option.value)}
                          sx={{
                            flex: 1, // Stretches buttons equally
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            padding: "10px 16px",
                            borderRadius: "10px",
                            border: `2px solid ${isSelected ? option.color : "#e2e8f0"}`,
                            backgroundColor: isSelected ? option.bg : "#fff",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: option.color,
                              backgroundColor: `${option.bg}80`,
                              transform: "translateY(-1px)",
                              boxShadow: `0 4px 12px ${option.color}20`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: isSelected
                                ? option.color
                                : "#cbd5e1",
                              transition: "all 0.2s ease",
                              boxShadow: isSelected
                                ? `0 0 0 3px ${option.color}40`
                                : "none",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: isSelected ? 600 : 500,
                              color: isSelected ? option.color : "#64748b",
                            }}
                          >
                            {option.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                {/* Remarks Field */}
                <Box sx={{ mb: 3.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#334155",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      mb: 1.5,
                      display: "block",
                    }}
                  >
                    Remarks <span style={{ color: "#ef4444" }}>*</span>
                  </Typography>
                  <Field name="remarks">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={3}
                        placeholder="Enter your remarks here..."
                        error={meta.touched && Boolean(meta.error)}
                        helperText={
                          meta.touched && meta.error ? meta.error : " "
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                            fontSize: "14px",
                            "& fieldset": {
                              borderColor:
                                meta.touched && meta.error
                                  ? "#ef4444"
                                  : "#e2e8f0",
                              borderWidth: "1px",
                            },
                            "&:hover fieldset": {
                              borderColor:
                                meta.touched && meta.error
                                  ? "#ef4444"
                                  : "#94a3b8",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor:
                                meta.touched && meta.error
                                  ? "#ef4444"
                                  : "#3b82f6",
                              borderWidth: "1px",
                            },
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: "11px",
                            marginLeft: 0,
                            marginTop: "4px",
                            color:
                              meta.touched && meta.error
                                ? "#ef4444"
                                : "transparent",
                          },
                        }}
                      />
                    )}
                  </Field>
                </Box>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    pt: 1,
                    borderTop: "1px solid #f1f5f9",
                    paddingBottom: 0.5,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => isModalClose(true)}
                    disabled={isSubmitting}
                    sx={{
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
                      "&:disabled": {
                        borderColor: "#e2e8f0",
                        color: "#94a3b8",
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
                      px: 4,
                      py: 1.1,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "13px",
                      background:
                        "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
                      boxShadow: "0 4px 14px rgba(30, 58, 95, 0.35)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #172e4d 0%, #264d7a 100%)",
                        boxShadow: "0 6px 20px rgba(30, 58, 95, 0.45)",
                        transform: "translateY(-1px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "&:disabled": {
                        background: "#94a3b8",
                        boxShadow: "none",
                        transform: "none",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CircularProgress size={16} color="inherit" />
                        Updating...
                      </Box>
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export const AddComplainModal = ({ isOpen, isClose, onPostSuccess }) => {
  const handleUpdateModal = () => {
    isClose(true);
  };
  const axios = useAxios();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const complainDetails = {
    date: getTodayDate(),
    domain: "",
    type: "",
    complain: "",
    username: "",
    designation: "",
    department: "",
    room: "",
    contact: "",
    status: "Pending",
  };

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

  const domains = {
    Internet: [
      "No Internet",
      "Low Internet Speed",
      "IP Issue",
      "Wi-FI",
      "Webpage Not Opening",
      "Server Related",
    ],
    Voice: ["Telephone Dead", "No-Dial Tone", "No-Display", "Low-Volume"],
    Cable_TV: [
      "No-Display",
      "No-Recharge",
      "Remote Not Working",
      "Box-Issue",
      "Channel Error",
    ],
    PC_Hardware: [
      "Printer-Xerox",
      "Scanner",
      "System Hang",
      "System No Power",
      "All-In-One",
      "Laptop",
      "CPU",
      "Monitor",
      "Keyboard",
      "Mouse",
      "Speaker",
      "Pendrive",
      "Antivirus",
      "Software(MS-Office/PDF/Misc.)",
      "Operating System",
    ],
  };

  const validation = Yup.object().shape({
    domain: Yup.string().required("Select IT Category!"),
    type: Yup.string().required("Select Type!"),
    username: Yup.string().required("Name is required!"),
    designation: Yup.string().required("Rank is required!"),
    department: Yup.string().required("Select Any Department!"),
    //room: Yup.string().required("Room No is required!"),
    contact: Yup.string().required("Contact is required!"),
  });

  const handleComplain = async (values, { resetForm, setSubmitting }) => {
    try {
      const { data: dbResponse } = await axios.post(
        "/complain/postData",
        values,
        { timeout: 10000 },
      );

      //console.log(dbResponse);
      const message = dbResponse.message;

      toast.success(message || "Complaint submitted successfully");
      const submitDomainProb = dbResponse.data.domain;

      switch (submitDomainProb) {
        case "Voice":
          onPostSuccess?.onVoiceSuccess?.();
          break;

        case "Internet":
          onPostSuccess?.onNetSuccess?.();
          break;

        case "Cable_TV":
          onPostSuccess?.onTVSuccess?.();
          break;

        case "PC_Hardware":
          onPostSuccess?.onPCSuccess?.();
          break;

        default:
          console.warn("Unknown domain:", submitDomainProb);
      }

      resetForm();
      handleUpdateModal(); // Trigger modal off
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit complaint, Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Standardized Input Styling for Red Theme
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
        borderColor: hasError ? "#ef4444" : "#d32f2f",
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
      "&.Mui-focused": { color: "#d32f2f" },
    },
  });

  // --- HELPER COMPONENTS ---
  const SectionLabel = ({ icon, text, required }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <Box
        sx={{
          backgroundColor: "#ffebee",
          p: 0.5,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d32f2f",
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
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modalStyle}>
        <Formik
          initialValues={complainDetails}
          onSubmit={handleComplain}
          validationSchema={validation}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            setFieldValue,
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
                    "linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #ef5350 100%)",
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
                    <ReportProblemIcon sx={{ color: "#fff", fontSize: 24 }} />
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
                      Submit User Complaint
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "12px",
                        fontWeight: 400,
                        mt: 0.3,
                      }}
                    >
                      Nabanna IT Cell Helpdesk
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => handleUpdateModal()}
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
                <Grid container spacing={2.5}>
                  {/* Date & Domain Row */}
                  <Grid item xs={12} sm={6}>
                    <SectionLabel
                      icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                      text="Date"
                    />
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx(false)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <SectionLabel
                      icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                      text="IT Domain"
                      required
                    />
                    <TextField
                      fullWidth
                      select
                      size="small"
                      name="domain"
                      label="Select Domain"
                      value={values.domain}
                      onChange={(e) => {
                        setFieldValue("domain", e.target.value);
                        setFieldValue("type", "");
                      }}
                      onBlur={handleBlur}
                      error={touched.domain && Boolean(errors.domain)}
                      helperText={
                        touched.domain && errors.domain ? errors.domain : " "
                      }
                      sx={inputSx(touched.domain && errors.domain)}
                    >
                      {Object.keys(domains).map((d) => (
                        <MenuItem key={d} value={d}>
                          {d.replace("_", "-")}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Problem Type Row */}
                  <Grid item xs={12}>
                    <SectionLabel
                      icon={<BugReportIcon sx={{ fontSize: 16 }} />}
                      text="Problem Type"
                      required
                    />
                    <TextField
                      fullWidth
                      select
                      size="small"
                      name="type"
                      label="Select Problem"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && Boolean(errors.type)}
                      helperText={
                        touched.type && errors.type ? errors.type : " "
                      }
                      disabled={!values.domain}
                      sx={inputSx(touched.type && errors.type)}
                    >
                      {(domains[values.domain] || []).map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Complaint Description */}
                  <Grid item xs={12}>
                    <SectionLabel
                      icon={<TextFieldsIcon sx={{ fontSize: 16 }} />}
                      text="Specific Details (Optional)"
                    />
                    <Field name="complain">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={3}
                          size="small"
                          placeholder="Explain the issue in detail if needed..."
                          sx={inputSx(false)}
                        />
                      )}
                    </Field>
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
                        touched.username && errors.username
                          ? errors.username
                          : " "
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

                  {/* Department & Room Row */}
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
                    />
                  </Grid>

                  {/* Contact Row */}
                  <Grid item xs={12} sm={6}>
                    <SectionLabel
                      icon={<PhoneIcon sx={{ fontSize: 16 }} />}
                      text="Contact Number"
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
                  position: "sticky",
                  bottom: 0,
                  zIndex: 10,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateModal()}
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
                      "linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #ef5350 100%)",
                    boxShadow: "0 4px 14px rgba(183, 28, 28, 0.35)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #7f0000 0%, #c62828 50%, #e53935 100%)",
                      boxShadow: "0 6px 20px rgba(183, 28, 28, 0.45)",
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
                    "Submit Complaint"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};


export const SearchComplainModal = ({isOpen,isClose,searchData}) => {
  return(
    <Modal open ={isOpen} onClose={isClose}>
      <Box sx={modalStyle}>
        <div className="text-xl text-center font-semibold font-sans text-blue-800">Search Result :</div>
        <SearchNet complainData={searchData} />
      </Box>
    </Modal>
  )
}