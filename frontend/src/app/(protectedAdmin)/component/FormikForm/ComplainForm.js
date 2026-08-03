import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import BugReportIcon from "@mui/icons-material/BugReport";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";

const ComplainForm = ({ modStat, onSuccess }) => {
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
    "PWD", "Disaster Management", "DGP Cell", "Agriculture", "MA & ME", "HOME",
    "L & LR", "PAR", "I & CA", "Finance", "13th Floor VVIP", "13th Floor CMO",
    "14th Floor CMO", "1st Floor Service", "KP Police Control/SB",
  ];

  const domains = {
    Internet: ["No Internet", "Low Internet Speed", "IP Issue", "Wi-FI", "Webpage Not Opening", "Server Related"],
    Voice: ["Telephone Dead", "No-Dial Tone", "No-Display", "Low-Volume"],
    Cable_TV: ["No-Display", "No-Recharge", "Remote Not Working", "Box-Issue", "Channel Error"],
    PC_Hardware: ["Printer-Xerox", "Scanner", "System Hang", "System No Power", "All-In-One", "Laptop", "CPU", "Monitor", "Keyboard", "Mouse", "Speaker", "Pendrive", "Antivirus", "Software(MS-Office/PDF/Misc.)", "Operating System"],
  };

  const validation = Yup.object().shape({
    domain: Yup.string().required("Select IT Category!"),
    type: Yup.string().required("Select Type!"),
    username: Yup.string().required("Name is required!"),
    designation: Yup.string().required("Rank is required!"),
    department: Yup.string().required("Select Any Department!"),
    room: Yup.string().required("Room No is required!"),
    contact: Yup.string().required("Contact is required!"),
  });

  const handleComplain = async (values, { resetForm, setSubmitting }) => {
    try {
      const { data: dbResponse } = await axios.post("/complain/postData", values, { timeout: 10000 });

      /* SMS/Whastapp notification submission//
      const notifications = [await axios.post("/publicMsg/send-sms", values)];
      const result = await Promise.allSettled(notifications);

      const smsResult = result[0];
      let message = "Complaint submitted successfully";
      if (smsResult.status === "fulfilled") {
        message = smsResult.value.data.message;
        
      }*/
      //console.log(dbResponse)
      const message = dbResponse.message

      toast.success(message || "Complaint submitted successfully");
      onSuccess();
      resetForm();
      modStat(true); // Trigger modal off
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
      borderRadius: "10px", backgroundColor: "#fff", fontSize: "14px",
      "& fieldset": { borderColor: hasError ? "#ef4444" : "#e2e8f0", borderWidth: "1px" },
      "&:hover fieldset": { borderColor: hasError ? "#ef4444" : "#94a3b8" },
      "&.Mui-focused fieldset": { borderColor: hasError ? "#ef4444" : "#d32f2f" },
    },
    "& .MuiFormHelperText-root": { fontSize: "11px", ml: 0, color: hasError ? "#ef4444" : "transparent" },
    "& .MuiInputLabel-root": { fontSize: "14px", color: "#64748b", "&.Mui-focused": { color: "#d32f2f" } },
  });

  return (
    <Formik initialValues={complainDetails} onSubmit={handleComplain} validationSchema={validation}>
      {({ values, handleChange, handleBlur, touched, errors, setFieldValue, isSubmitting }) => (
        
       <Form sx={{ display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden" }}>
         {/* --- FIXED HEADER --- */}
          <Box sx={{ background: "linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #ef5350 100%)", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ backgroundColor: "rgba(255,255,255,0.15)", p: 0.8, borderRadius: "10px" }}>
                <ReportProblemIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "17px", letterSpacing: "0.5px" }}>Submit User Complaint</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", fontWeight: 400, mt: 0.3 }}>Nabanna IT Cell Helpdesk</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => modStat(true)} sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* --- SCROLLABLE CONTENT --- */}
          <Box sx={{ flex: "1 1 0%", minHeight: 0, overflowY: "auto", padding: "28px", display: "block", boxSizing: "border-box", "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: "10px" } }}>
            <Grid container spacing={2.5}>
              
              {/* Date & Domain Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />} text="Date" />
                <TextField fullWidth type="date" size="small" name="date" value={values.date} onChange={handleChange} InputLabelProps={{ shrink: true }} sx={inputSx(false)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<CategoryIcon sx={{ fontSize: 16 }} />} text="IT Domain" required />
                <TextField fullWidth select size="small" name="domain" label="Select Domain" value={values.domain} onChange={(e) => { setFieldValue("domain", e.target.value); setFieldValue("type", ""); }} onBlur={handleBlur} error={touched.domain && Boolean(errors.domain)} helperText={touched.domain && errors.domain ? errors.domain : " "} sx={inputSx(touched.domain && errors.domain)}>
                  {Object.keys(domains).map((d) => <MenuItem key={d} value={d}>{d.replace("_", "-")}</MenuItem>)}
                </TextField>
              </Grid>

              {/* Problem Type Row */}
              <Grid item xs={12}>
                <SectionLabel icon={<BugReportIcon sx={{ fontSize: 16 }} />} text="Problem Type" required />
                <TextField fullWidth select size="small" name="type" label="Select Problem" value={values.type} onChange={handleChange} onBlur={handleBlur} error={touched.type && Boolean(errors.type)} helperText={touched.type && errors.type ? errors.type : " "} disabled={!values.domain} sx={inputSx(touched.type && errors.type)}>
                  {(domains[values.domain] || []).map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </TextField>
              </Grid>

              {/* Complaint Description */}
              <Grid item xs={12}>
                <SectionLabel icon={<TextFieldsIcon sx={{ fontSize: 16 }} />} text="Specific Details (Optional)" />
                <Field name="complain">
                  {({ field }) => (
                    <TextField {...field} fullWidth multiline rows={3} size="small" placeholder="Explain the issue in detail if needed..." sx={inputSx(false)} />
                  )}
                </Field>
              </Grid>

              {/* User Details Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<PersonOutlineIcon sx={{ fontSize: 16 }} />} text="Applicant Name" required />
                <TextField fullWidth size="small" name="username" label="Enter Name" value={values.username} onChange={handleChange} onBlur={handleBlur} error={touched.username && Boolean(errors.username)} helperText={touched.username && errors.username ? errors.username : " "} sx={inputSx(touched.username && errors.username)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<BadgeIcon sx={{ fontSize: 16 }} />} text="Designation" required />
                <TextField fullWidth size="small" name="designation" label="Enter Rank" value={values.designation} onChange={handleChange} onBlur={handleBlur} error={touched.designation && Boolean(errors.designation)} helperText={touched.designation && errors.designation ? errors.designation : " "} sx={inputSx(touched.designation && errors.designation)} />
              </Grid>

              {/* Department & Room Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<ApartmentIcon sx={{ fontSize: 16 }} />} text="Department" required />
                <TextField fullWidth select size="small" name="department" label="Select Department" value={values.department} onChange={handleChange} onBlur={handleBlur} error={touched.department && Boolean(errors.department)} helperText={touched.department && errors.department ? errors.department : " "} sx={inputSx(touched.department && errors.department)}>
                  {departments.map((dept, index) => <MenuItem key={index} value={dept.toLowerCase()}>{dept}</MenuItem>)}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<RoomIcon sx={{ fontSize: 16 }} />} text="Room No" required />
                <TextField fullWidth size="small" name="room" label="Enter Room Number" value={values.room} onChange={handleChange} onBlur={handleBlur} error={touched.room && Boolean(errors.room)} helperText={touched.room && errors.room ? errors.room : " "} sx={inputSx(touched.room && errors.room)} />
              </Grid>

              {/* Contact Row */}
              <Grid item xs={12} sm={6}>
                <SectionLabel icon={<PhoneIcon sx={{ fontSize: 16 }} />} text="Contact Number" required />
                <TextField fullWidth size="small" name="contact" label="Enter Contact" value={values.contact} onChange={handleChange} onBlur={handleBlur} error={touched.contact && Boolean(errors.contact)} helperText={touched.contact && errors.contact ? errors.contact : " "} sx={inputSx(touched.contact && errors.contact)} />
              </Grid>

            </Grid>
          </Box>

          {/* --- FIXED FOOTER --- */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, px: "28px", py: "16px", borderTop: "1px solid #f1f5f9", backgroundColor: "#fff", flexShrink: 0, position: "sticky", bottom: 0, zIndex: 10 }}>
            <Button variant="outlined" onClick={() => modStat(true)} disabled={isSubmitting} sx={{ m: 0, px: 3.5, py: 1.1, borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "13px", borderColor: "#e2e8f0", color: "#64748b", "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" } }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting} sx={{
              m: 0, px: 4, py: 1.1, borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "13px",
              background: "linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #ef5350 100%)", boxShadow: "0 4px 14px rgba(183, 28, 28, 0.35)",
              "&:hover": { background: "linear-gradient(135deg, #7f0000 0%, #c62828 50%, #e53935 100%)", boxShadow: "0 6px 20px rgba(183, 28, 28, 0.45)", transform: "translateY(-1px)" },
              "&:active": { transform: "translateY(0)" }, "&:disabled": { background: "#94a3b8", boxShadow: "none", transform: "none" },
            }}>
              {isSubmitting ? (<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><CircularProgress size={16} color="inherit" />Submitting...</Box>) : "Submit Complaint"}
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
    <Box sx={{ backgroundColor: "#ffebee", p: 0.5, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#d32f2f" }}>{icon}</Box>
    <Typography sx={{ fontWeight: 700, color: "#334155", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
      {text} {required && <span style={{ color: "#ef4444" }}>*</span>}
    </Typography>
  </Box>
);

export default ComplainForm;