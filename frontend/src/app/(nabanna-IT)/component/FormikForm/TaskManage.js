import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Divider,
  CircularProgress,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import * as Yup from "yup";
import { useAuth } from "@/app/Hook/useAuth";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";

// ✅ FIX: Use styled() for higher CSS specificity
const StyledForm = styled(Form)(({ theme }) => ({
  width: "100%",
  maxWidth: "580px",
  margin: "0 auto",
  "& input, & textarea, & select": {
    fontFamily: "'Inter', sans-serif !important",
  },
}));

const StyledTextField = styled(TextField)({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#ffffff",

    "& fieldset": {
      borderColor: "#d1d5db",
      borderWidth: "2px",
    },

    "&:hover fieldset": {
      borderColor: "#667eea",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#667eea",
      borderWidth: "2px",
    },
  },

  "& .MuiInputBase-input": {
    fontFamily: "Inter, sans-serif",
    padding: "12px",
  },

  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    marginLeft: "4px",
  },
});

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  display: "flex !important",
  gap: "10px !important",
  flexWrap: "wrap !important",
  "& .MuiFormControlLabel-root": {
    backgroundColor: "#fff !important",
    border: "1.5px solid #e5e7eb !important",
    borderRadius: "10px !important",
    padding: "8px 16px !important",
    marginRight: "0 !important",
    transition: "all 0.2s ease !important",
    "&:hover": {
      borderColor: "#667eea !important",
      backgroundColor: "#f8f7ff !important",
    },
  },
  "& .MuiRadio-root": {
    padding: "4px !important",
    "&.Mui-checked": {
      color: "#667eea !important",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "0.875rem !important",
    fontWeight: "500 !important",
    color: "#374151 !important",
    fontFamily: "'Inter', sans-serif !important",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px !important",
  borderRadius: "10px !important",
  fontSize: "0.95rem !important",
  fontWeight: "600 !important",
  fontFamily: "'Inter', sans-serif !important",
  textTransform: "none !important",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important",
  color: "#fff !important",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4) !important",
  transition: "all 0.3s ease !important",
  "&:hover": {
    background: "linear-gradient(135deg, #5a6fd6 0%, #6a4292 100%) !important",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5) !important",
    transform: "translateY(-1px) !important",
  },
  "&:active": {
    transform: "translateY(0) !important",
  },
  "&.Mui-disabled": {
    background: "#e5e7eb !important",
    color: "#9ca3af !important",
    boxShadow: "none !important",
    transform: "none !important",
  },
}));

const StyledFormWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "580px",
  margin: "0 auto",

  "& input, & textarea, & select": {
    fontFamily: "'Inter', sans-serif !important",
  },
}));

const TaskManage = ({ editableInfo, modalStat, onRefresh }) => {
  const { authName } = useAuth();
  const axios = useAxios();

  const itPersonnel = [
    "Joydeep Ghosh",
    "Suman Sarder",
    "Swagatam Dutta",
    "Shirshendu Mukherjee",
    "Partha Nag Choudhury",
    "Rittick Kumar Dey",
    "Debashis Halder",
    "Rajdeep Saha",
    "Baladeb Mukherjee",
    "JE_IT_Nabanna",
  ];

  const addedFieldValue = {
    it_personnel: "",
    remarks: "",
  };
  const newFieldValue = { ...editableInfo, ...addedFieldValue };

  const validation = Yup.object().shape({
    remarks: Yup.string().required("Kindly Make Comment !!"),
    it_personnel: Yup.string().required("Choose IT-Personnel !!"),
  });

  const statusName = ["Pending", "In Progress", "Complete"];

  const handleTaskSubmit = async (values, { resetForm, setSubmitting }) => {
    const { _id, username, remarks, status, it_personnel } = values;
    const setRemarks = authName.split(" ")[0] + ":" + " " + remarks;

    try {
      const isVoice = it_personnel === "Partha Nag Choudhury";

      const netApi = axios.put(`/TaskData/updateNetTask/${_id}`, {
        setRemarks,
        status,
        it_personnel,
      });

      const adminApi = axios.put(`/ItReq/letterUpdatefrom105/${_id}`, {
        username,
        it_personnel,
        setRemarks,
        status,
      });

      const voiceApi = isVoice
        ? axios.put(`/voiceTask/editVoice/${_id}`, {
            setRemarks,
            status,
            it_personnel,
          })
        : null;

      const promises = isVoice
        ? [netApi, voiceApi, adminApi]
        : [netApi, adminApi];

      const results = await Promise.allSettled(promises);

      const netRes = results[0];
      const voiceRes = isVoice ? results[1] : null;
      const adminRes = isVoice ? results[2] : results[1];

      if (netRes.status !== "fulfilled") {
        throw new Error("Task Updated Failed");
      }

      if (isVoice && voiceRes.status !== "fulfilled") {
        throw new Error("Task update failed");
      }

      onRefresh();

      SweetSwal.fire({
        icon: "success",
        title: `Task updated to ${it_personnel}`,
        timer: 1500,
        showConfirmButton: false,
      });

      if (adminRes.status === "rejected") {
        console.warn("Admin update failed");
        toast.warning("Admin update failed");
      }

      resetForm();
      modalStat(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={newFieldValue}
      onSubmit={handleTaskSubmit}
      validationSchema={validation}
      enableReinitialize
    >
      {({ values, isSubmitting, setFieldValue, errors, touched }) => (
        <StyledFormWrapper component={Form} noValidate>
          {/* Task Info Banner */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)",
              border: "1px solid #e0e7ff",
              borderRadius: "12px",
              padding: "14px 18px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <DescriptionIcon sx={{ color: "#667eea", fontSize: 24 }} />
            <Box>
              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Updating Task For
              </Typography>
              <Typography
                sx={{
                  color: "#4338ca",
                  fontWeight: 700,
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {values.lettertype?.[0] || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Work Status */}
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              sx={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#374151",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Work Status <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <StyledRadioGroup
              name="status"
              value={values.status}
              onChange={(e) => setFieldValue("status", e.target.value)}
            >
              {statusName.map((status, i) => (
                <FormControlLabel
                  key={i}
                  value={status}
                  control={<Radio size="small" />}
                  label={status}
                  checked={values.status === status}
                />
              ))}
            </StyledRadioGroup>
            {errors.status && touched.status && (
              <Typography
                sx={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "4px",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {errors.status}
              </Typography>
            )}
          </Box>

          <Divider sx={{ margin: "20px 0", borderColor: "#e5e7eb" }} />

          

          {/* Remarks */}
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              sx={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#374151",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Remarks <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <Field name="remarks">
              {({ field, meta }) => (
                <StyledTextField
                  {...field}
                  multiline
                  rows={3}
                  placeholder="Enter your remarks here..."
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                />
              )}
            </Field>
          </Box>

          {/* IT Personnel */}
          <Box sx={{ marginBottom: "28px" }}>
            <Typography
              sx={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#374151",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Refer Task (IT Personnel){" "}
              <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <Field name="it_personnel">
              {({ field, meta }) => (
                <StyledTextField
                  {...field}
                  select
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error ? meta.error : " "}
                  InputProps={{
                    startAdornment: values.it_personnel ? (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#667eea", fontSize: 20 }} />
                      </InputAdornment>
                    ) : null,
                  }}
                >
                  <MenuItem value="" disabled>
                    <em style={{ color: "#9ca3af" }}>Select IT Personnel</em>
                  </MenuItem>
                  {itPersonnel.map((engg, i) => (
                    <MenuItem
                      key={i}
                      value={engg}
                      sx={{
                        borderRadius: "6px",
                        margin: "4px 8px",
                        fontFamily: "'Inter', sans-serif",
                        "&:hover": { backgroundColor: "#f0f4ff" },
                        "&.Mui-selected": {
                          backgroundColor: "#ede9fe !important",
                          "&:hover": { backgroundColor: "#ede9fe !important" },
                        },
                      }}
                    >
                      {engg}
                    </MenuItem>
                  ))}
                </StyledTextField>
              )}
            </Field>
          </Box>

          {/* Submit */}
          <Box sx={{ marginBottom: "8px" }}>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                ) : (
                  <SaveIcon />
                )
              }
            >
              {isSubmitting ? "Updating Task..." : "Update Task"}
            </StyledButton>
          </Box>
        </StyledFormWrapper>
      )}
    </Formik>
  );
};

export default TaskManage;
