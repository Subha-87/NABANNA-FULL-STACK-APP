import {
  Box,
  Button,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  TextField,
  Radio,
  RadioGroup,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DomainIcon from "@mui/icons-material/Domain";

const EditMachine = ({ editData, modStat, refreshData }) => {
  const axios = useAxios();

  const getDerivedAmcStatus = (data) => {
    if (data.remainingWarranty === "Expired" && data.amcStatus === "NONE") {
      return "REQUIRED";
    }
    return data.amcStatus;
  };

  const handleEditSystem = async (values, { resetForm, setSubmitting }) => {
    const {
      employeeName,
      designation,
      amcStatus,
      department,
      floor,
      office,
      roomNo,
      systemCondition,
      remarks,
      _id,
    } = values;
    console.log(values);
    /* try {
      const response = await axios.patch(`/NabannaSystem/update/${_id}`, {
        department,
        designation,
        employeeName,
        floor,
        office,
        roomNo,
        amcStatus,
        systemCondition,
        remarks,
      });
      toast.success(response.data?.message || "Updated successfully");
      refreshData();
      resetForm();
      modStat();
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }*/
  };

  // Style for read-only fields to look like clean data cards
  const readOnlySx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#1e293b", // Keeps text dark when disabled
    },
  };

  return (
    <Formik initialValues={editData} onSubmit={handleEditSystem}>
      {({ values, handleChange, setFieldValue, isSubmitting }) => (
        // ROOT FORM CONTAINER - Enables proper scrolling in modal
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%", // Removed fixed w-[600px]
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* --- FIXED HEADER --- */}
          <Box
            sx={{
              px: 3.5,
              pt: 3,
              pb: 2.5,
              flexShrink: 0,
              background: "linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Update System Status
            </Typography>
            <Typography variant="body2" sx={{ color: "#f0fdfa", mt: 0.5 }}>
              Review details and update the current hardware condition.
            </Typography>
          </Box>

          {/* --- SCROLLABLE CONTENT --- */}
          <Box
            sx={{
              flex: "1 1 0%",
              minHeight: 0,
              minWidth: 0,
              overflowY: "auto",
              px: 3.5,
              pb: 2,
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "10px",
              },
            }}
          >
            {/* USER DETAILS SECTION (Read-Only) */}
            {/* USER DETAILS SECTION */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                p: 2.5,
                mb: 3,
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* Employee Name */}
              <Field name="employeeName">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Employee Name"
                    size="small"
                    sx={readOnlySx}
                    InputProps={{
                      startAdornment: (
                        <PersonOutlineIcon
                          sx={{
                            mr: 1,
                            color: "#94a3b8",
                            fontSize: 18,
                          }}
                        />
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Designation */}
              <Field name="designation">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Designation"
                    size="small"
                    sx={readOnlySx}
                  />
                )}
              </Field>

              {/* Department */}
              <Field name="department">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Department"
                    size="small"
                    sx={readOnlySx}
                  />
                )}
              </Field>

              {/* Office */}
              <Field name="office">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Office"
                    size="small"
                    sx={readOnlySx}
                    InputProps={{
                      startAdornment: (
                        <DomainIcon
                          sx={{
                            mr: 1,
                            color: "#94a3b8",
                            fontSize: 18,
                          }}
                        />
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Room */}
              <Field name="roomNo">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Room No."
                    size="small"
                    sx={readOnlySx}
                  />
                )}
              </Field>

              {/* Floor */}
              <Field name="floor">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Floor"
                    size="small"
                    sx={readOnlySx}
                  />
                )}
              </Field>
            </Box>

            {/* SYSTEM CONDITION (Radio Buttons) */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                System Condition *
              </Typography>
              <RadioGroup
                row
                name="systemCondition"
                value={values.systemCondition}
                onChange={handleChange}
              >
                {["GOOD", "AVERAGE", "BAD"].map((status) => (
                  <Box
                    key={status}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor:
                        values.systemCondition === status
                          ? "#3b82f6"
                          : "#e2e8f0",
                      backgroundColor:
                        values.systemCondition === status
                          ? "#eff6ff"
                          : "transparent",
                      transition: "all 0.2s",
                      mr: 2,
                    }}
                  >
                    <FormControlLabel
                      value={status}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            "&.Mui-checked": { color: "#3b82f6" },
                            "& .MuiSvgIcon-root": { fontSize: "16px" },
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color:
                              values.systemCondition === status
                                ? "#2563eb"
                                : "#64748b",
                          }}
                        >
                          {status}
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </Box>

            {/* REMARKS (Textarea) */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Remarks
              </Typography>
              <Field name="remarks">
                {({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={3}
                    placeholder="Add any additional notes here..."
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        fontSize: "14px",
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
              gap: 1.5,
              px: 3.5,
              py: 2.5,
              borderTop: "1px solid #f1f5f9",
              backgroundColor: "#fff",
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              onClick={modStat}
              disabled={isSubmitting}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "10px",
                px: 3,
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
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "10px",
                px: 4,
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.25)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
                },
                "&:disabled": { background: "#94a3b8", boxShadow: "none" },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Update Status"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditMachine;
