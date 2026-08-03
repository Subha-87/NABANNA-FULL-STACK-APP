import { Box, Button, Typography, TextField, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAxios } from "@/app/Hook/useAxios";
import * as Yup from "yup";
import { useAuth } from "@/app/Hook/useAuth";
import { toast } from "react-toastify";
import "../CSS/ModalForm.css";

// Validation Schema
const taskValidation = Yup.object().shape({
  remarks: Yup.string()
    .required("Remarks is required")
    .min(3, "Remarks must be at least 3 characters")
    .max(500, "Remarks must not exceed 500 characters"),
});

const SelfTaskNet = ({ editData, modalStat, onRefresh, onClose }) => {
  const { authName } = useAuth();
  const axios = useAxios();

  const handleSelfEdit = async (values, { resetForm, setSubmitting }) => {
    const { _id, remarks, it_personnel } = values;
    const setRemarks = authName.split(" ")[0] + ":" + " " + remarks;

    try {
      const netRespSelf = axios.put(`/TaskData/updateNetTask/${_id}`, {
        setRemarks,
        it_personnel,
      });
      const netRespJE = axios.put(`/ItReq/letterUpdatefrom105/${_id}`, {
        setRemarks,
      });

      const respResult = await Promise.allSettled([netRespSelf, netRespJE]);
      const [netRes, netJERes] = respResult;

      if (netRes.status !== "fulfilled") {
        throw new Error("Update Failed");
      }
      toast.success("Updated Successfully");

      if (netJERes.status === "rejected") {
        console.warn("Update to JE is failed");
        toast.warning("Update to JE is failed");
      }
      resetForm();
      modalStat();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setSubmitting(false);
      onRefresh();
    }
  };

  return (
    <Formik
      initialValues={{ ...editData, remarks: "" }}
      onSubmit={handleSelfEdit}
      validationSchema={taskValidation}
    >
      {({ values, handleChange, isSubmitting, touched, errors }) => (
        <Form>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 2.5,
              background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 28,
                  borderRadius: 2,
                  bgcolor: "#64b5f6",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: "0.3px",
                }}
              >
                Update Task Information
              </Typography>
            </Box>
            {onClose && (
              <IconButton
                onClick={onClose}
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              px: 4,
              py: 3.5,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* Info Banner */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: "#f0f7ff",
                border: "1px solid #e0edff",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#1e3a5f",
                }}
              >
                <span style={{ color: "#5c6bc0", fontWeight: 600 }}>Task ID:</span>{" "}
                {editData?._id?.slice(-6)?.toUpperCase() || "N/A"}
                <span
                  style={{
                    mx: 2,
                    color: "#c5cae9",
                  }}
                >
                  |
                </span>
                <span style={{ color: "#5c6bc0", fontWeight: 600 }}>Personnel:</span>{" "}
                {editData?.it_personnel || "N/A"}
              </Typography>
            </Box>

            {/* Field Label */}
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#37474f",
                mb: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Remarks
              <Typography
                component="span"
                sx={{
                  color: "#ef5350",
                  fontSize: "0.9rem",
                  lineHeight: 1,
                }}
              >
                *
              </Typography>
            </Typography>

            {/* Text Field */}
            <TextField
              placeholder="Enter your update remarks here..."
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              name="remarks"
              value={values.remarks}
              onChange={handleChange}
              error={touched.remarks && Boolean(errors.remarks)}
              helperText={
                touched.remarks && errors.remarks ? (
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    <span>⚠</span> {errors.remarks}
                  </Box>
                ) : (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#90a4ae",
                    }}
                  >
                    {values.remarks.length}/500 characters
                  </span>
                )
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  bgcolor: "#fafbfc",
                  transition: "all 0.2s ease",
                  "& fieldset": {
                    borderColor: "#d0d7de",
                    borderWidth: "1.5px",
                  },
                  "&:hover": {
                    bgcolor: "#ffffff",
                    "& fieldset": {
                      borderColor: "#90a4ae",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: "#ffffff",
                    "& fieldset": {
                      borderColor: "#1e3a5f",
                      borderWidth: "2px",
                    },
                  },
                  "&.Mui-error": {
                    bgcolor: "#fff8f8",
                    "& fieldset": {
                      borderColor: "#ef5350",
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputBase-inputMultiline": {
                  padding: "14px 16px",
                  lineHeight: 1.6,
                },
              }}
            />
          </Box>

          {/* Footer Section */}
          <Box
            sx={{
              px: 4,
              py: 2.5,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "#f8f9fa",
              borderTop: "1px solid #e9ecef",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={isSubmitting}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "#64748b",
                borderColor: "#d0d7de",
                bgcolor: "white",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#94a3b8",
                  bgcolor: "#f8fafc",
                  color: "#475569",
                },
                "&:disabled": {
                  opacity: 0.5,
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
                py: 1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
                boxShadow: "0 2px 8px rgba(30, 58, 95, 0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #16304f 0%, #24507a 100%)",
                  boxShadow: "0 4px 12px rgba(30, 58, 95, 0.4)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "0 1px 4px rgba(30, 58, 95, 0.3)",
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
                  <Box
                    component="span"
                    sx={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                      "@keyframes spin": {
                        from: { transform: "rotate(0deg)" },
                        to: { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                  Updating...
                </Box>
              ) : (
                "Post Update"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SelfTaskNet;