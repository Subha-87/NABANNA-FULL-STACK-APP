import { Formik, Form, Field } from "formik";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";

const ReqEditForm = ({ editReqInfo, modStat, onRefresh }) => {
  const axios = useAxios();
  const WorkStatus = ["Pending", "In Progress", "Complete"];

  const handleEditSubmit = async (values, { resetForm, setSubmitting }) => {
    const { _id, remarks, status } = values;
    try {
      const response = await axios.put(`/ItReq/editRemarks/${_id}`, {
        remarks,
        status,
      });
      toast.success(response.data.message || "Updated successfully");
      onRefresh();
      resetForm();
      modStat();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper array to map read-only data cleanly
  const readOnlyFields = [
    { label: "Letter Date", value: editReqInfo.date ? new Date(editReqInfo.date).toLocaleDateString() : "N/A" },
    { label: "Letter For", value: editReqInfo.lcategory },
    { label: "Username", value: editReqInfo.username },
    { label: "Designation", value: editReqInfo.designation },
    { label: "Department", value: editReqInfo.department },
    { label: "Contact", value: editReqInfo.contact },
  ];

  return (
    <Formik initialValues={editReqInfo} onSubmit={handleEditSubmit}>
      {({ values, handleChange, isSubmitting }) => (
        // ROOT FORM CONTAINER - Enables proper scrolling
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
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
              background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#ffffff", letterSpacing: "-0.5px" }}
            >
              Edit Requisition Status
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.85)", mt: 0.5 }}>
              Review user request details and update the current status.
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
              py: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: "10px" },
            }}
          >
            {/* READ-ONLY USER DETAILS GRID */}
            <Box
              sx={{
                p: 2.5,
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <Grid container spacing={1.5}>
                {readOnlyFields.map((item) => (
                  <Grid item xs={12} sm={6} key={item.label}>
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: 500, mt: 0.2 }}>
                      {item.value || "—"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ borderColor: "#f1f5f9" }} />

            {/* REMARKS */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                Remarks
              </Typography>
              <Field name="remarks">
                {({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={3}
                    placeholder="Add update notes here..."
                    fullWidth
                    onChange={handleChange}
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

            {/* WORK STATUS (Radios) */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: "#334155" }}>
                Work Status
              </Typography>
              <Field name="status">
                {({ field }) => (
                  <RadioGroup row {...field}>
                    {WorkStatus.map((s) => (
                      <Box
                        key={s}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: "8px",
                          border: "1px solid",
                          borderColor: field.value === s ? "#10b981" : "#e2e8f0",
                          backgroundColor: field.value === s ? "#ecfdf5" : "transparent",
                          transition: "all 0.2s",
                          mr: 2,
                        }}
                      >
                        <FormControlLabel
                          value={s}
                          control={
                            <Radio
                              size="small"
                              sx={{
                                "&.Mui-checked": { color: "#059669" },
                                "& .MuiSvgIcon-root": { fontSize: "18px" },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: field.value === s ? "#047857" : "#64748b",
                              }}
                            >
                              {s}
                            </Typography>
                          }
                          sx={{ m: 0 }}
                        />
                      </Box>
                    ))}
                  </RadioGroup>
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
                "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" },
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
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                boxShadow: "0 4px 14px rgba(5, 150, 105, 0.3)",
                "&:hover": { background: "linear-gradient(135deg, #047857 0%, #059669 100%)" },
                "&:disabled": { background: "#94a3b8", boxShadow: "none" },
              }}
            >
              {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Update Status"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ReqEditForm;