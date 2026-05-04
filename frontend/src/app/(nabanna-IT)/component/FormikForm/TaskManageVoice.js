import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
  IconButton,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/app/Hook/useAuth";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";

import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DescriptionIcon from "@mui/icons-material/Description";
import UserIcon from "@mui/icons-material/Person";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import CommentIcon from "@mui/icons-material/Comment";

const TaskManageVoice = ({ editableVoiceInfo, modStat }) => {
  const { authName } = useAuth();
  const axios = useAxios();

  const addedFieldValue = {
    it_personnel: "",
    remarks: "",
  };
  const newFieldValue = { ...editableVoiceInfo, ...addedFieldValue };

  const statusOptions = [
    { value: "Pending", label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
    {
      value: "In Progress",
      label: "In Progress",
      color: "#3b82f6",
      bg: "#dbeafe",
    },
    { value: "Complete", label: "Complete", color: "#22c55e", bg: "#dcfce7" },
  ];

  const personnelOptions = [
    {
      value: "Suman Sarder",
      label: "Suman Sarder",
      role: "Network",
      icon: <NetworkCheckIcon sx={{ fontSize: 16 }} />,
    },
    {
      value: "JE_IT_Nabanna",
      label: "JE IT Nabanna",
      role: "JE",
      icon: <UserIcon sx={{ fontSize: 16 }} />,
    },
  ];

  const validation = Yup.object().shape({
    remarks: Yup.string()
      .required("Remarks is required")
      .min(3, "Remarks must be at least 3 characters"),
    it_personnel: Yup.string().required("Please choose an IT Personnel"),
  });

  const handleVoiceEditSubmit = async (values, action) => {
    const { setSubmitting, resetForm } = action;
    const { _id, username, it_personnel, status, remarks } = values;
    const setRemarks = authName.split(" ")[0] + ": " + remarks;

    try {
      const isTaskSentNet = it_personnel === "Suman Sarder";

      const voiceApi = axios.put(`/voiceTask/editVoice/${_id}`, {
        it_personnel,
        status,
        setRemarks,
      });

      const adminApi = axios.put(`/ItReq/letterUpdatefrom105/${_id}`, {
        username,
        it_personnel,
        setRemarks,
        status,
      });

      const netApi = isTaskSentNet
        ? axios.post("/TaskData/netTask", { ...values, remarks: setRemarks })
        : null;

      const promises = isTaskSentNet
        ? [voiceApi, netApi, adminApi]
        : [voiceApi, adminApi];

      const results = await Promise.allSettled(promises);

      const voiceResp = results[0];
      const netResp = isTaskSentNet ? results[1] : null;
      const adminResp = isTaskSentNet ? results[2] : results[1];

      if (voiceResp.status !== "fulfilled") {
        throw new Error("Task Update Failed");
      }

      if (isTaskSentNet && netResp.status !== "fulfilled") {
        throw new Error("Task Update Failed");
      }

      SweetSwal.fire({
        icon: "success",
        title: `Task updated to ${it_personnel}`,
        timer: 1500,
        showConfirmButton: false,
      });

      if (adminResp.status === "rejected") {
        console.warn("Admin update failed");
        toast.warning("Admin update failed");
      }

      resetForm();
      modStat(true); // Closes parent modal
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={newFieldValue}
      onSubmit={handleVoiceEditSubmit}
      validationSchema={validation}
    >
      {({ values, isSubmitting, setFieldValue, errors, touched }) => (
        // Flex column layout to fit inside parent Box with maxHeight
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "85vh", // Matches parent exactly
            overflow: "hidden", // Forces inner flexbox to behave
          }}
        >
          {/* --- FIXED HEADER --- */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #9c27b0 100%)",
              padding: "22px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0, // Prevents header from shrinking
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
                <TaskAltIcon sx={{ color: "#fff", fontSize: 24 }} />
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
                  Update Task
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "12px",
                    fontWeight: 400,
                    mt: 0.3,
                  }}
                >
                  {values.lettertype?.[0]
                    ? `Category: ${values.lettertype[0]}`
                    : "Review and reassign task"}
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
              flex: 1, // Takes remaining space
              minHeight: 0, // <--- ADD THIS: Allows shrinking below content size
              overflowY: "auto", // Scrolls if content exceeds maxHeight
              padding: "28px",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "10px",
              },
            }}
          >
            {/* Info Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
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
                  <PersonOutlineIcon sx={{ color: "#3b82f6", fontSize: 18 }} />
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
                    User
                  </Typography>
                  <Typography
                    sx={{
                      color: "#1e293b",
                      fontWeight: 600,
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {values.username}
                  </Typography>
                </Box>
              </Box>

              {/* Task Type Card */}
              <Box
                sx={{
                  backgroundColor: "#faf5ff",
                  border: "1px solid #e9d5ff",
                  borderRadius: "12px",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#f3e8ff",
                    p: 0.7,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DescriptionIcon sx={{ color: "#9333ea", fontSize: 18 }} />
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
                    Task Type
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6b21a8",
                      fontWeight: 600,
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {values.lettertype?.[0] || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Previous Remarks */}
            {editableVoiceInfo.remarks && (
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
                  <CommentIcon sx={{ color: "#22c55e", fontSize: 16 }} />
                  <Typography
                    sx={{
                      color: "#15803d",
                      fontWeight: 600,
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Existing Remarks
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
                  {editableVoiceInfo.remarks}
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
                  <AssignmentTurnedInIcon
                    sx={{ color: "#6366f1", fontSize: 16 }}
                  />
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

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {statusOptions.map((option) => {
                  const isSelected = values.status === option.value;
                  return (
                    <Box
                      key={option.value}
                      onClick={() => setFieldValue("status", option.value)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        padding: "10px 22px",
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

            {/* Refer IT Personnel */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#fef3c7",
                    p: 0.5,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SwapHorizIcon sx={{ color: "#d97706", fontSize: 16 }} />
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
                  Refer Task To <span style={{ color: "#ef4444" }}>*</span>
                </Typography>
              </Box>

              <Field name="it_personnel">
                {({ field, meta }) => (
                  <FormControl
                    fullWidth
                    size="small"
                    error={meta.touched && Boolean(meta.error)}
                  >
                    <InputLabel
                      sx={{
                        fontSize: "14px",
                        color:
                          meta.touched && meta.error ? "#ef4444" : "#64748b",
                        "&.Mui-focused": {
                          color:
                            meta.touched && meta.error ? "#ef4444" : "#3b82f6",
                        },
                      }}
                    >
                      Select IT Personnel
                    </InputLabel>
                    <Select
                      {...field}
                      label="Select IT Personnel"
                      sx={{
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        fontSize: "14px",
                        ".MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          py: 1.2,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor:
                            meta.touched && meta.error ? "#ef4444" : "#e2e8f0",
                          borderWidth: "1px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor:
                            meta.touched && meta.error ? "#ef4444" : "#94a3b8",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor:
                            meta.touched && meta.error ? "#ef4444" : "#3b82f6",
                        },
                      }}
                    >
                      {personnelOptions.map((person) => (
                        <MenuItem
                          key={person.value}
                          value={person.value}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            py: 1.5,
                            px: 2,
                            "&:hover": { backgroundColor: "#f8fafc" },
                            "&.Mui-selected": {
                              backgroundColor: "#eff6ff",
                              "&:hover": { backgroundColor: "#dbeafe" },
                            },
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#eef2ff",
                              p: 0.5,
                              borderRadius: "6px",
                              color: "#6366f1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {person.icon}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "13px",
                                color: "#1e293b",
                              }}
                            >
                              {person.label}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "11px", color: "#94a3b8" }}
                            >
                              {person.role} Team
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {meta.touched && meta.error && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#ef4444",
                          mt: 0.5,
                          ml: 0.5,
                        }}
                      >
                        {meta.error}
                      </Typography>
                    )}
                  </FormControl>
                )}
              </Field>

              {/* Smart Chip Indicator */}
              {values.it_personnel === "Suman Sarder" && (
                <Box sx={{ mt: 1.5 }}>
                  <Chip
                    icon={<NetworkCheckIcon sx={{ fontSize: 14 }} />}
                    label="Task will also be forwarded to Network Team"
                    size="small"
                    sx={{
                      backgroundColor: "#fffbeb",
                      border: "1px solid #fde68a",
                      color: "#92400e",
                      fontWeight: 500,
                      fontSize: "11px",
                      "& .MuiChip-icon": { color: "#d97706" },
                    }}
                  />
                </Box>
              )}
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
                    helperText={meta.touched && meta.error ? meta.error : " "}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        fontSize: "14px",
                        "& fieldset": {
                          borderColor:
                            meta.touched && meta.error ? "#ef4444" : "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor:
                            meta.touched && meta.error ? "#ef4444" : "#94a3b8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor:
                            meta.touched && meta.error ? "#ef4444" : "#3b82f6",
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: "11px",
                        marginLeft: 0,
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
            }}
          >
            <Button
              variant="outlined"
              onClick={() => modStat(true)}
              disabled={isSubmitting}
              sx={{
                m: 0, // <--- ADD THIS: Kill hidden MUI margins
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
                m: 0, // <--- ADD THIS: Kill hidden MUI margins
                px: 4,
                py: 1.1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                background:
                  "linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #9c27b0 100%)",
                boxShadow: "0 4px 14px rgba(74, 20, 140, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #38006b 0%, #6a1b9a 50%, #8e24aa 100%)",
                  boxShadow: "0 6px 20px rgba(74, 20, 140, 0.45)",
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
                  Updating...
                </Box>
              ) : (
                "Update Task"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TaskManageVoice;
