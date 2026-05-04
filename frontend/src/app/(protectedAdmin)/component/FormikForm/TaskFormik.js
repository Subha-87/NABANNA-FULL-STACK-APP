import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  IconButton,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";

import CloseIcon from "@mui/icons-material/Close";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";
import InfoIcon from "@mui/icons-material/Info";

const TaskFormik = ({ rowTask, modalStat, onRefresh }) => {
  const axios = useAxios();

  const itLetter = [
    "Internet",
    "Voice",
    "Cable TV",
    "PC-Peripherals",
    "Conference",
    "Net & Voice",
  ];

  const taskOptions = {
    Internet: [
      "New LAN Connection",
      "New IP Allocation",
      "Wi-Fi Requirement",
      "Site Unrestriction",
      "IP Conflict",
    ],
    Voice: ["Telephone Connection", "New Telephone Set"],
    "PC-Peripherals": ["Computer Set", "Laptop", "Printer"],
    "Cable TV": ["Cable Connection", "Set Top Box"],
    Conference: ["Conference Setup", "Microphone Issue"],
    "Net & Voice": ["Lan & Telephone Connection"],
  };

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
    "Biplab Majumder",
  ];

  const priorityOptions = [
    { value: "High", label: "High", color: "#ef4444", bg: "#fef2f2" },
    { value: "Medium", label: "Medium", color: "#f59e0b", bg: "#fef3c7" },
    { value: "Low", label: "Low", color: "#22c55e", bg: "#dcfce7" },
  ];

  const newfieldValue = {
    itTask: "",
    lettertype: [],
    it_personnel: "",
    assignDate: "",
    p_level: "",
  };
  const primaryValue = { ...rowTask, ...newfieldValue };

  // Fixed Validation Schema
  const validation = Yup.object().shape({
    itTask: Yup.string().required("Please Select Letter Type"),
    lettertype: Yup.array()
      .min(1, "Select at least one option")
      .required("Select at least one option"),
    it_personnel: Yup.string().when("itTask", {
      is: (val) => val && val !== "Net & Voice",
      then: () => Yup.string().required("Choose IT-Personnel"),
      otherwise: () => Yup.string(),
    }),
    assignDate: Yup.date().required("Date is Required"),
    p_level: Yup.string().required("Select Priority Level"),
  });

  const TASK_API_MAP = {
    Internet: "/TaskData/netTask",
    Voice: "/voiceTask/setTask",
  };

  const handleSetTask = async (values, { resetForm, setSubmitting }) => {
    const { it_personnel, itTask, _id } = values;
    try {
      let taskPromise = [];
      if (itTask === "Net & Voice") {
        taskPromise.push(
          axios.post("/TaskData/netTask", {
            ...values,
            it_personnel: "Suman Sarder",
          }),
          axios.post("/voiceTask/setTask", {
            ...values,
            it_personnel: "Partha Nag Choudhury",
          }),
        );
      } else {
        const apiUrl = TASK_API_MAP[itTask];
        if (!apiUrl) throw new Error("Invalid Task Type");
        taskPromise.push(axios.post(apiUrl, values));
      }

      const adminPersonnel =
        itTask === "Net & Voice"
          ? "Suman Sarder & Partha Nag Choudhury"
          : it_personnel;
      const updatePromise = axios.put(`/ItReq/letterItpersonUpdate/${_id}`, {
        it_personnel: adminPersonnel,
      });

      const [taskResponse] = await Promise.all([...taskPromise, updatePromise]);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: taskResponse.data?.message || "Task Assigned Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      onRefresh();
      resetForm();
      modalStat(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={primaryValue}
      onSubmit={handleSetTask}
      validationSchema={validation}
    >
      {({ values, isSubmitting, setFieldValue, errors, touched }) => (
        // FIX: Flex wrapper matching maxHeight and hidden overflow
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
                "linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #2196f3 100%)",
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
                <ForwardToInboxIcon sx={{ color: "#fff", fontSize: 24 }} />
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
                  Forward Task To IT Personnel
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "12px",
                    fontWeight: 400,
                    mt: 0.3,
                  }}
                >
                  Nabanna IT Cell
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => modalStat(true)}
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
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              padding: "28px",
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "10px",
              },
            }}
          >
            {/* User Info Card */}
            <Box
              sx={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                mb: 3,
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
                  Forwarding For
                </Typography>
                <Typography
                  sx={{ color: "#1e293b", fontWeight: 600, fontSize: "14px" }}
                >
                  {values.username || "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* Letter Type Dropdown */}
            <Box sx={{ mb: 3 }}>
              <SectionLabel
                icon={<ListAltIcon sx={{ fontSize: 16 }} />}
                text="Letter Type"
                required
              />
              <Field name="itTask">
                {({ field, meta }) => (
                  <FormControl
                    fullWidth
                    size="small"
                    error={meta.touched && Boolean(meta.error)}
                  >
                    <InputLabel>Select Category</InputLabel>
                    <Select
                      {...field}
                      label="Select Category"
                      onChange={(e) => {
                        setFieldValue("itTask", e.target.value);
                        setFieldValue("lettertype", []);
                        if (e.target.value !== "Net & Voice")
                          setFieldValue("it_personnel", "");
                      }}
                      sx={selectSx(meta.touched && meta.error)}
                    >
                      {itLetter.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    {meta.touched && meta.error && (
                      <FieldError text={meta.error} />
                    )}
                  </FormControl>
                )}
              </Field>
            </Box>

            {/* Specified Tasks (Interactive Checkboxes) */}
            {values.itTask && (
              <Box sx={{ mb: 3 }}>
                <SectionLabel
                  icon={<AssignmentIndIcon sx={{ fontSize: 16 }} />}
                  text="Specified Tasks"
                  required
                />
                <Field name="lettertype">
                  {({ field, meta }) => (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1.5,
                          mt: 1,
                        }}
                      >
                        {taskOptions[values.itTask]?.map((task) => {
                          const isChecked = field.value.includes(task);
                          return (
                            <Box
                              key={task}
                              onClick={() =>
                                setFieldValue(
                                  "lettertype",
                                  isChecked
                                    ? field.value.filter((v) => v !== task)
                                    : [...field.value, task],
                                )
                              }
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: `1.5px solid ${isChecked ? "#1976d2" : "#e2e8f0"}`,
                                backgroundColor: isChecked ? "#e3f2fd" : "#fff",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                "&:hover": {
                                  borderColor: "#1976d2",
                                  backgroundColor: "#f5f5f5",
                                },
                              }}
                            >
                              <Checkbox
                                checked={isChecked}
                                sx={{
                                  p: 0,
                                  m: 0,
                                  color: "#1976d2",
                                  "&.Mui-checked": { color: "#1976d2" },
                                }}
                                size="small"
                              />
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: isChecked ? 600 : 400,
                                  color: isChecked ? "#1565c0" : "#475569",
                                }}
                              >
                                {task}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                      {meta.touched && meta.error && (
                        <FieldError text={meta.error} />
                      )}
                    </Box>
                  )}
                </Field>
              </Box>
            )}

            {/* Net & Voice Notice */}
            {values.itTask === "Net & Voice" && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "#fffbeb",
                  border: "1px solid #fde68a",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <InfoIcon sx={{ color: "#d97706", fontSize: 20 }} />
                <Typography
                  sx={{ fontSize: "13px", color: "#92400e", fontWeight: 500 }}
                >
                  This will automatically assign to{" "}
                  <strong>Suman Sarder</strong> &{" "}
                  <strong>Partha Nag Choudhury</strong>
                </Typography>
              </Box>
            )}

            {/* Personnel & Date Grid (Conditional) */}
            {values.itTask !== "Net & Voice" ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2.5,
                  mb: 3,
                }}
              >
                <Box>
                  <SectionLabel
                    icon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
                    text="Assign To"
                    required
                  />
                  <Field name="it_personnel">
                    {({ field, meta }) => (
                      <FormControl
                        fullWidth
                        size="small"
                        error={meta.touched && Boolean(meta.error)}
                      >
                        <InputLabel>IT Personnel</InputLabel>
                        <Select
                          {...field}
                          label="IT Personnel"
                          sx={selectSx(meta.touched && meta.error)}
                        >
                          <MenuItem value="">Select Personnel</MenuItem>
                          {itPersonnel.map((engg) => (
                            <MenuItem key={engg} value={engg}>
                              {engg}
                            </MenuItem>
                          ))}
                        </Select>
                        {meta.touched && meta.error && (
                          <FieldError text={meta.error} />
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <SectionLabel
                    icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                    text="Assign Date"
                    required
                  />
                  <DateField
                    name="assignDate"
                    touched={touched}
                    errors={errors}
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ mb: 3, maxWidth: "50%" }}>
                <SectionLabel
                  icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                  text="Assign Date"
                  required
                />
                <DateField
                  name="assignDate"
                  touched={touched}
                  errors={errors}
                />
              </Box>
            )}

            {/* Priority Selection */}
            <Box sx={{ mb: 3 }}>
              <SectionLabel
                icon={<FlagIcon sx={{ fontSize: 16 }} />}
                text="Priority Level"
                required
              />
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                {priorityOptions.map((option) => {
                  const isSelected = values.p_level === option.value;
                  return (
                    <Box
                      key={option.value}
                      onClick={() => setFieldValue("p_level", option.value)}
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
              {touched.p_level && errors.p_level && (
                <FieldError text={errors.p_level} />
              )}
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
              onClick={() => modalStat(true)}
              disabled={isSubmitting}
              sx={btnCancelSx}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={btnSubmitSx}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} color="inherit" />
                  Assigning...
                </Box>
              ) : (
                "Assign Task"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// --- HELPER COMPONENTS & STYLES ---

const DateField = ({ name, touched, errors }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <TextField
        {...field}
        type="date"
        size="small"
        fullWidth
        InputLabelProps={{ shrink: true, sx: { fontSize: "14px" } }}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? meta.error : " "}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            fontSize: "14px",
            "& fieldset": {
              borderColor: meta.touched && meta.error ? "#ef4444" : "#e2e8f0",
            },
            "&:hover fieldset": {
              borderColor: meta.touched && meta.error ? "#ef4444" : "#94a3b8",
            },
            "&.Mui-focused fieldset": {
              borderColor: meta.touched && meta.error ? "#ef4444" : "#3b82f6",
            },
          },
          "& .MuiFormHelperText-root": {
            fontSize: "11px",
            ml: 0,
            color: meta.touched && meta.error ? "#ef4444" : "transparent",
          },
        }}
      />
    )}
  </Field>
);

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
        color: "#6366f1",
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

const selectSx = (hasError) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  fontSize: "14px",
  ".MuiSelect-select": { py: 1.2 },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: hasError ? "#ef4444" : "#e2e8f0",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: hasError ? "#ef4444" : "#94a3b8",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: hasError ? "#ef4444" : "#3b82f6",
  },
});

const btnCancelSx = {
  m: 0,
  px: 3.5,
  py: 1.1,
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "13px",
  borderColor: "#e2e8f0",
  color: "#64748b",
  "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" },
};

const btnSubmitSx = {
  m: 0,
  px: 4,
  py: 1.1,
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "13px",
  background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #2196f3 100%)",
  boxShadow: "0 4px 14px rgba(13, 71, 161, 0.35)",
  "&:hover": {
    background:
      "linear-gradient(135deg, #0a3a87 0%, #1565c0 50%, #1e88e5 100%)",
    boxShadow: "0 6px 20px rgba(13, 71, 161, 0.45)",
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0)" },
  "&:disabled": { background: "#94a3b8", boxShadow: "none", transform: "none" },
};

export default TaskFormik;
