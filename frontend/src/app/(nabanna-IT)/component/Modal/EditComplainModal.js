
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  CircularProgress,
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

const EditComplainModal = ({
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

  const statusOptions = [
    { value: "Pending", label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
    { value: "In Progress", label: "In Progress", color: "#3b82f6", bg: "#dbeafe" },
    { value: "Complete", label: "Complete", color: "#22c55e", bg: "#dcfce7" },
  ];

  const handleEditComplain = async (values, { setSubmitting }) => {
    const { remarks, status } = values;
    const setRemarks = authName.split(" ")[0] + ": " + remarks;

    try {
      const response = await axios.put(`/complain/edit/${_id}`, {
        setRemarks,
        status,
      });
      toast.success(response.data.message);
      isModalClose(true);
      onRefresh();
    } catch (error) {
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
                  background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
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
              <Box sx={{ padding: "28px" }}>
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

                  {/* Problem Card */}
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
                      <ReportProblemIcon sx={{ color: "#ef4444", fontSize: 18 }} />
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
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
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
                              borderColor: meta.touched && meta.error ? "#ef4444" : "#e2e8f0",
                              borderWidth: "1px",
                            },
                            "&:hover fieldset": {
                              borderColor: meta.touched && meta.error ? "#ef4444" : "#94a3b8",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: meta.touched && meta.error ? "#ef4444" : "#3b82f6",
                              borderWidth: "1px",
                            },
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: "11px",
                            marginLeft: 0,
                            marginTop: "4px",
                            color: meta.touched && meta.error ? "#ef4444" : "transparent",
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
                      background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
                      boxShadow: "0 4px 14px rgba(30, 58, 95, 0.35)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #172e4d 0%, #264d7a 100%)",
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
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

export default EditComplainModal;