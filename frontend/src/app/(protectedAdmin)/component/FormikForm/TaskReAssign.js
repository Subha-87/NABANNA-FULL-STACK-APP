import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { useAuth } from "@/app/Hook/useAuth";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";

const TaskReAssign = ({ rowTask, modStat, onRefresh }) => {
  const axios = useAxios();
  const { authName } = useAuth();

  const itLetter = ["Internet", "Voice", "Cable TV", "PC-Peripherals", "Conference"];
  const WorkStatus = ["Pending", "In Progress", "Complete"];
  const itPersonnel = [
    "Joydeep Ghosh", "Suman Sarder", "Swagatam Dutta", "Shirshendu Mukherjee",
    "Partha Nag Choudhury", "Rittick Kumar Dey", "Debashis Halder", "Rajdeep Saha",
    "Baladeb Mukherjee", "Biplab Majumder",
  ];

  const updatedData = { itTask: "", it_personnel: "", assignDate: "" };
  const newUpdatedValue = { ...rowTask, ...updatedData };

  const validation = Yup.object().shape({
    itTask: Yup.string().required("Please select a letter type"),
    it_personnel: Yup.string().required("Choose IT-Personnel"),
    assignDate: Yup.date().required("Date is required"),
  });

  const TASK_API_MAP = {
    Internet: "/TaskData/netTask",
    Voice: "/voiceTask/reAssign",
  };

  const handleReTask = async (values, { resetForm, setSubmitting }) => {
    const { _id, assignDate, it_personnel, itTask, status, remarks } = values;
    const setRemarks = authName.split(" ")[0] + ": " + (remarks || "No remarks");

    try {
      const apiUrl = TASK_API_MAP[itTask];
      if (!apiUrl) throw new Error("Invalid Task Type");

      const taskPromise = axios.put(`${apiUrl}/${_id}`, { assignDate, it_personnel, status, setRemarks });
      const updatePromise = axios.put(`/ItReq/letterItpersonUpdate/${_id}`, { assignDate, it_personnel, status, setRemarks });

      const [taskResponse] = await Promise.all([taskPromise, updatePromise]);
      toast.success(taskResponse.data?.message || "Task Re-Assigned Successfully");
      onRefresh();
      resetForm();
      modStat();
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={newUpdatedValue} onSubmit={handleReTask} validationSchema={validation}>
      {({ isSubmitting }) => (
        // ROOT FORM CONTAINER - Enables proper scrolling
        <Form style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, overflow: "hidden" }}>
          
          {/* --- FIXED HEADER --- */}
          <Box
            sx={{
              px: 3.5,
              pt: 3,
              pb: 2.5,
              flexShrink: 0,
              background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
              boxShadow: "0 4px 12px rgba(217, 119, 6, 0.3)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff", letterSpacing: "-0.5px" }}>
              Re-Assign Task
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.85)", mt: 0.5 }}>
              Delegate this task to an IT Personnel.
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
            {/* LETTER TYPE (Radios) */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: "#334155" }}>
                Letter Type *
              </Typography>
              <Field name="itTask">
                {({ field, meta }) => (
                  <>
                    <RadioGroup row {...field}>
                      {itLetter.map((type) => (
                        <Box
                          key={type}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: field.value === type ? "#f59e0b" : "#e2e8f0",
                            backgroundColor: field.value === type ? "#fffbeb" : "transparent",
                            transition: "all 0.2s",
                            mr: 1.5,
                            mb: 1,
                          }}
                        >
                          <FormControlLabel
                            value={type}
                            control={<Radio size="small" sx={{ "&.Mui-checked": { color: "#d97706" } }} />}
                            label={<Typography variant="body2" sx={{ fontWeight: 500, fontSize: "13px", color: field.value === type ? "#b45309" : "#64748b" }}>{type}</Typography>}
                            sx={{ m: 0 }}
                          />
                        </Box>
                      ))}
                    </RadioGroup>
                    {meta.touched && meta.error && (
                      <FormHelperText error sx={{ mx: 1.5 }}>{meta.error}</FormHelperText>
                    )}
                  </>
                )}
              </Field>
            </Box>

            <Divider sx={{ borderColor: "#f1f5f9" }} />

            {/* IT PERSONNEL (Select) */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                Assign To *
              </Typography>
              <Field name="it_personnel">
                {({ field, meta }) => (
                  <FormControl fullWidth size="small" error={meta.touched && Boolean(meta.error)}>
                    <InputLabel>IT Personnel</InputLabel>
                    <Select {...field} label="IT Personnel" sx={{ borderRadius: "10px" }}>
                      <MenuItem value="">Select Personnel</MenuItem>
                      {itPersonnel.map((engg) => (
                        <MenuItem key={engg} value={engg}>{engg}</MenuItem>
                      ))}
                    </Select>
                    {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
            </Box>

            {/* DATE & STATUS ROW */}
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                  Assign Date *
                </Typography>
                <Field name="assignDate">
                  {({ field, meta }) => (
                    <TextField
                      type="date"
                      {...field}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : " "}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
                  Work Status
                </Typography>
                <Field name="status">
                  {({ field }) => (
                    <RadioGroup row {...field} sx={{ mt: 0.5 }}>
                      {WorkStatus.map((s) => (
                        <FormControlLabel
                          key={s}
                          value={s}
                          control={<Radio size="small" sx={{ "&.Mui-checked": { color: "#0f172a" } }} />}
                          label={<Typography variant="body2" sx={{ fontSize: "13px", color: "#475569" }}>{s}</Typography>}
                          sx={{ mr: 1.5 }}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </Field>
              </Box>
            </Box>

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
                    rows={2}
                    placeholder="Add internal notes for the IT personnel..."
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "14px" }
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
                textTransform: "none", fontWeight: 600, borderRadius: "10px", px: 3,
                borderColor: "#e2e8f0", color: "#64748b",
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
                textTransform: "none", fontWeight: 600, borderRadius: "10px", px: 4,
                background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
                "&:hover": { background: "linear-gradient(135deg, #b45309 0%, #d97706 100%)" },
                "&:disabled": { background: "#94a3b8", boxShadow: "none" },
              }}
            >
              {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Re-Assign Task"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TaskReAssign;