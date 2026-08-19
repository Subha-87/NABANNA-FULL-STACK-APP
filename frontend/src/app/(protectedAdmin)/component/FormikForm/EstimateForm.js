import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useAxios } from "@/app/Hook/useAxios";
import { useRouter } from "next/navigation";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdOutlineAddCircle, MdCloudUpload, MdSend } from "react-icons/md";
import {
  FaFileInvoice,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaDoorOpen,
} from "react-icons/fa";
import { handleAxiosError } from "@/app/utils/axiosError";
import {
  formWrapperStyle,
  headerStyle,
  contentStyle,
  footerStyle,
  customComplainStyle,
  fileInputStyle,
  customSelectStyle,
} from "../ModalForm/modalStyle";
import { useEstimate } from "../Providers/EstimateProviders";

// ==================== FORM HEADER COMPONENT ====================
const FormHeader = ({ title, subtitle, icon }) => (
  <Box sx={headerStyle}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontSize: "1.25rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#ffd54f",
            fontSize: "0.85rem",
            marginTop: "2px",
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  </Box>
);

// ==================== FORM FOOTER COMPONENT ====================
const FormFooter = ({ isSubmitting, submitText = "Submit", onCancel }) => (
  <Box sx={footerStyle}>
    {onCancel && (
      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{
          px: 4,
          py: 1.2,
          borderRadius: "10px",
          borderColor: "#9e9e9e",
          color: "#616161",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            borderColor: "#757575",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Cancel
      </Button>
    )}
    <Button
      variant="contained"
      type="submit"
      disabled={isSubmitting}
      startIcon={!isSubmitting && <MdSend />}
      sx={{
        px: 5,
        py: 1.2,
        borderRadius: "10px",
        background: isSubmitting
          ? "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)"
          : "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
        color: "#ffffff",
        textTransform: "none",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: "0 4px 15px rgba(26, 35, 126, 0.4)",
        "&:hover": {
          background:
            "linear-gradient(135deg, #0d1657 0%, #1a237e 50%, #283593 100%)",
          boxShadow: "0 6px 20px rgba(26, 35, 126, 0.5)",
          transform: "translateY(-1px)",
        },
        "&:disabled": {
          cursor: "not-allowed",
          transform: "none",
        },
        transition: "all 0.3s ease",
      }}
    >
      {isSubmitting ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="span"
            sx={{
              width: 18,
              height: 18,
              border: "2px solid #ffffff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          Processing...
        </Box>
      ) : (
        submitText
      )}
    </Button>
  </Box>
);

// ==================== FIELD LABEL COMPONENT ====================
const FieldLabel = ({ icon, label, required = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      mb: 0.5,
    }}
  >
    <Box sx={{ color: "#3949ab", fontSize: "1.1rem", display: "flex" }}>
      {icon}
    </Box>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: "#37474f",
        fontSize: "0.9rem",
      }}
    >
      {label}
      {required && <span style={{ color: "#d32f2f", marginLeft: 2 }}>*</span>}
    </Typography>
  </Box>
);

// ==================== SECTION TITLE COMPONENT ====================
const SectionTitle = ({ title, number }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
    <Chip
      label={number}
      size="small"
      sx={{
        backgroundColor: "#1a237e",
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "0.75rem",
        height: "24px",
      }}
    />
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 700,
        color: "#1a237e",
        fontSize: "1rem",
        letterSpacing: "0.3px",
      }}
    >
      {title}
    </Typography>
    <Divider
      sx={{
        flex: 1,
        borderColor: "#c5cae9",
        opacity: 0.5,
      }}
    />
  </Box>
);

// ==================== ADD ESTIMATE FORM ====================
export const NabannaEstimateForm = ({ modStat }) => {
  const axios = useAxios();
  const router = useRouter();
  const { getEstimateRecords } = useEstimate();

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

  const primaryEsimateData = {
    memo: "",
    date: "",
    est_copy: null,
    work_name: "",
    cost: "",
    department: "",
    room: "",
    req_letter: null,
    status: "Pending",
    remarks: "none",
  };

  const MAX_FILE_SIZE = 10240000;

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }

  const validation = Yup.object().shape({
    memo: Yup.number()
      .typeError("Memo must be a number")
      .required("Memo is required!"),
    date: Yup.date().required("Date is required!"),
    est_copy: Yup.mixed()
      .required("Estimate Copy is required!")
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image"),
      )
      .test(
        "is-valid-size",
        "Max allowed size is 10MB",
        (value) => value && value.size <= MAX_FILE_SIZE,
      ),
    work_name: Yup.string().required("Work is required!"),
    cost: Yup.string().required("Cost is required!"),
    department: Yup.string().required("Select Any Department!"),
    room: Yup.string().required("Room No is required!"),
    req_letter: Yup.mixed()
      .required("Requisition Copy is required!")
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image"),
      )
      .test(
        "is-valid-size",
        "Max allowed size is 10MB",
        (value) => value && value.size <= MAX_FILE_SIZE,
      ),
  });
  // Estimate New Value Submit//
  const handleEstimateNabanna = async (
    values,
    { resetForm, setSubmitting },
  ) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    try {
      const response = await axios.post("/estimateReg", formData);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();
      modStat();
      await getEstimateRecords(); // refresh table//
      router.push("/dashboard/estimate");
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={primaryEsimateData}
      onSubmit={handleEstimateNabanna}
      validationSchema={validation}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        handleBlur,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form style={formWrapperStyle}>
          {/* Fixed Header */}
          <FormHeader
            title="New Estimate Entry"
            subtitle="Fill in all the required details to register a new estimate"
            icon={
              <FaFileInvoice style={{ fontSize: "1.5rem", color: "#1a237e" }} />
            }
          />

          {/* Scrollable Content */}
          <Box sx={contentStyle}>
            {/* Section 1: Basic Information */}
            <SectionTitle title="Basic Information" number="01" />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <FieldLabel icon={<FaFileInvoice />} label="Memo No" required />
                <TextField
                  variant="outlined"
                  name="memo"
                  value={values.memo}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  placeholder="Enter Memo Number"
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.memo && Boolean(errors.memo)}
                  helperText={touched.memo && errors.memo}
                />
              </Box>
              <Box>
                <FieldLabel icon={<FaCalendarAlt />} label="Date" required />
                <TextField
                  name="date"
                  size="small"
                  fullWidth
                  variant="outlined"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Box>
            </Box>

            {/* Section 2: Work Details */}
            <SectionTitle title="Work Details" number="02" />

            <Box sx={{ mb: 3 }}>
              <FieldLabel icon={<FaBuilding />} label="Work Name" required />
              <TextField
                variant="outlined"
                name="work_name"
                value={values.work_name}
                onChange={handleChange}
                size="small"
                fullWidth
                placeholder="Enter complete work name"
                sx={customComplainStyle}
                onBlur={handleBlur}
                error={touched.work_name && Boolean(errors.work_name)}
                helperText={touched.work_name && errors.work_name}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <FieldLabel
                  icon={<FaMoneyBillWave />}
                  label="Estimate Cost (₹)"
                  required
                />
                <TextField
                  variant="outlined"
                  name="cost"
                  value={values.cost}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  placeholder="Enter estimated cost"
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.cost && Boolean(errors.cost)}
                  helperText={touched.cost && errors.cost}
                />
              </Box>
              <Box>
                <FieldLabel icon={<FaDoorOpen />} label="Room No" required />
                <TextField
                  variant="outlined"
                  name="room"
                  value={values.room}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  placeholder="Enter room number"
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.room && Boolean(errors.room)}
                  helperText={touched.room && errors.room}
                />
              </Box>
            </Box>

            {/* Section 3: Department */}
            <SectionTitle title="Department Assignment" number="03" />

            <Box sx={{ mb: 4 }}>
              <FieldLabel
                icon={<FaBuilding />}
                label="Select Department"
                required
              />
              <TextField
                select
                variant="outlined"
                size="small"
                fullWidth
                name="department"
                value={values.department}
                onChange={handleChange}
                sx={customSelectStyle}
                onBlur={handleBlur}
                error={touched.department && Boolean(errors.department)}
                helperText={touched.department && errors.department}
              >
                {departments.map((dept, index) => (
                  <MenuItem key={index} value={dept.toLowerCase()}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Section 4: Document Upload */}
            <SectionTitle title="Document Upload" number="04" />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 2,
              }}
            >
              <Box>
                <FieldLabel
                  icon={<MdCloudUpload />}
                  label="Estimate Copy"
                  required
                />
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: "10px",
                    borderColor:
                      touched.est_copy && errors.est_copy
                        ? "#d32f2f"
                        : "#c5cae9",
                    backgroundColor: "#fafafa",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#3949ab",
                      backgroundColor: "#e8eaf6",
                    },
                  }}
                  onClick={() => document.getElementById("est_copy").click()}
                >
                  <input
                    type="file"
                    id="est_copy"
                    hidden
                    onChange={(e) =>
                      setFieldValue("est_copy", e.currentTarget.files[0])
                    }
                  />
                  <MdCloudUpload
                    sx={{ fontSize: "2rem", color: "#9e9e9e", mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: "#757575" }}>
                    {values.est_copy
                      ? values.est_copy.name
                      : "Click to upload (Max 10MB)"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                    JPG, PNG, GIF, SVG, WEBP
                  </Typography>
                  {touched.est_copy && errors.est_copy && (
                    <Typography
                      variant="caption"
                      sx={{ color: "#d32f2f", display: "block", mt: 0.5 }}
                    >
                      {errors.est_copy}
                    </Typography>
                  )}
                </Paper>
              </Box>
              <Box>
                <FieldLabel
                  icon={<MdCloudUpload />}
                  label="Requisition Letter"
                  required
                />
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: "10px",
                    borderColor:
                      touched.req_letter && errors.req_letter
                        ? "#d32f2f"
                        : "#c5cae9",
                    backgroundColor: "#fafafa",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#3949ab",
                      backgroundColor: "#e8eaf6",
                    },
                  }}
                  onClick={() => document.getElementById("req_letter").click()}
                >
                  <input
                    type="file"
                    id="req_letter"
                    hidden
                    onChange={(e) =>
                      setFieldValue("req_letter", e.currentTarget.files[0])
                    }
                  />
                  <MdCloudUpload
                    sx={{ fontSize: "2rem", color: "#9e9e9e", mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: "#757575" }}>
                    {values.req_letter
                      ? values.req_letter.name
                      : "Click to upload (Max 10MB)"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                    JPG, PNG, GIF, SVG, WEBP
                  </Typography>
                  {touched.req_letter && errors.req_letter && (
                    <Typography
                      variant="caption"
                      sx={{ color: "#d32f2f", display: "block", mt: 0.5 }}
                    >
                      {errors.req_letter}
                    </Typography>
                  )}
                </Paper>
              </Box>
            </Box>
          </Box>

          {/* Fixed Footer */}
          <FormFooter
            isSubmitting={isSubmitting}
            submitText="Submit Estimate"
          />
        </Form>
      )}
    </Formik>
  );
};

// ==================== EDIT ESTIMATE FORM ====================
export const EditNabannaEstimateForm = ({ editData, modStat, onRefresh }) => {
  const axios = useAxios();
  const router = useRouter();
  const WorkStatus = ["Pending", "In Progress", "Complete"];
  const { _id, work_name, status, remarks } = editData;

  const primaryEditValue = {
    work_name,
    status,
    remarks,
  };

  const handleEditEstimate = async (values, { resetForm, setSubmitting }) => {
    const { status, remarks } = values;
    try {
      const response = await axios.put(`/estimateReg/update/${_id}`, {
        status,
        remarks,
      });
      toast.success(response.data?.message || "Edit Successfull");

      onRefresh();
      resetForm();
      modStat();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "#fff3e0", border: "#ff9800", text: "#e65100" };
      case "In Progress":
        return { bg: "#e3f2fd", border: "#2196f3", text: "#0d47a1" };
      case "Complete":
        return { bg: "#e8f5e9", border: "#4caf50", text: "#1b5e20" };
      default:
        return { bg: "#f5f5f5", border: "#9e9e9e", text: "#616161" };
    }
  };

  return (
    <Formik initialValues={primaryEditValue} onSubmit={handleEditEstimate}>
      {({ values, setFieldValue, isSubmitting }) => (
        <Form style={formWrapperStyle}>
          {/* Fixed Header */}
          <FormHeader
            title="Update Estimate Status"
            subtitle="Modify work status and add remarks"
            icon={
              <FaBuilding style={{ fontSize: "1.5rem", color: "#1a237e" }} />
            }
          />

          {/* Scrollable Content */}
          <Box sx={contentStyle}>
            {/* Project Info Card */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
                border: "1px solid #9fa8da",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#3949ab",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Project Name
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#1a237e",
                  fontWeight: 700,
                  mt: 0.5,
                }}
              >
                {values.work_name}
              </Typography>
            </Paper>

            {/* Status Selection */}
            <SectionTitle title="Work Status" number="01" />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 4,
                flexWrap: "wrap",
              }}
            >
              {WorkStatus.map((s) => {
                const colors = getStatusColor(s);
                const isSelected = values.status === s;
                return (
                  <Paper
                    key={s}
                    onClick={() => setFieldValue("status", s)}
                    sx={{
                      p: 2,
                      px: 3,
                      borderRadius: "12px",
                      cursor: "pointer",
                      border: `2px solid ${isSelected ? colors.border : "#e0e0e0"}`,
                      backgroundColor: isSelected ? colors.bg : "#ffffff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      },
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${colors.border}`,
                        backgroundColor: isSelected
                          ? colors.border
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? colors.text : "#757575",
                      }}
                    >
                      {s}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>

            {/* Remarks */}
            <SectionTitle title="Remarks" number="02" />
            <Field
              as="textarea"
              name="remarks"
              placeholder="Enter any additional notes or remarks..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "2px solid #c5cae9",
                backgroundColor: "#fafafa",
                fontSize: "0.95rem",
                resize: "vertical",
                outline: "none",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1a237e";
                e.target.style.backgroundColor = "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#c5cae9";
                e.target.style.backgroundColor = "#fafafa";
              }}
            />
          </Box>

          {/* Fixed Footer */}
          <FormFooter isSubmitting={isSubmitting} submitText="Update Status" />
        </Form>
      )}
    </Formik>
  );
};

// ==================== UPLOAD CHALLAN FORM ====================
export const UploadChallanForm = ({ modStat }) => {
  const axios = useAxios();

  const sender = [
    "Pascal Computer",
    "Compunet System",
    "Prakash Electricals",
    "Consulting Technologies",
    "Aircon",
    "Iris System",
    "Embee",
  ];

  const primaryFormData = {
    chl_date: "",
    memo: "",
    nit_no: "",
    agency: "",
    work_order: null,
    challan_img: [null],
  };

  const FILE_SIZE = 1048576;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const challanValidation = Yup.object().shape({
    chl_date: Yup.date().required("Mention Challan Incoming Date!"),
    memo: Yup.number()
      .typeError("Memo must be a number")
      .required("Memo No is required! ** Important"),
    nit_no: Yup.string().required("NIT/Acceptance No is required!"),
    agency: Yup.string().required("Select Working Agency!"),
    work_order: Yup.mixed()
      .required("Work Order is required!")
      .nullable()
      .test("fileSize", "File size too large, max size is 1MB", (value) => {
        return value === null || (value && value.size <= FILE_SIZE);
      })
      .test("fileFormat", "Unsupported file type", (value) => {
        return (
          value === null || (value && SUPPORTED_FORMATS.includes(value.type))
        );
      }),
  });

  const handleChallan = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();
    formData.append("chl_date", values.chl_date);
    formData.append("memo", values.memo);
    formData.append("nit_no", values.nit_no);
    formData.append("agency", values.agency);
    formData.append("work_order", values.work_order);

    if (Array.isArray(values.challan_img)) {
      values.challan_img.forEach((file) => {
        formData.append("challan_img", file);
      });
    }

    try {
      const response = await axios.patch("/estimateReg/challan", formData);
      toast.success(response.data.message || "Upload Successful");
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
    <Formik
      initialValues={primaryFormData}
      onSubmit={handleChallan}
      validationSchema={challanValidation}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form style={formWrapperStyle}>
          {/* Fixed Header */}
          <FormHeader
            title="Upload Challan"
            subtitle="Upload estimated item challan and work order documents"
            icon={
              <MdCloudUpload style={{ fontSize: "1.5rem", color: "#1a237e" }} />
            }
          />

          {/* Scrollable Content */}
          <Box sx={contentStyle}>
            {/* Section 1: Challan Details */}
            <SectionTitle title="Challan Details" number="01" />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <FieldLabel
                  icon={<FaCalendarAlt />}
                  label="Challan Date"
                  required
                />
                <TextField
                  type="date"
                  name="chl_date"
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  sx={customComplainStyle}
                  error={touched.chl_date && Boolean(errors.chl_date)}
                  helperText={touched.chl_date && errors.chl_date}
                />
              </Box>
              <Box>
                <FieldLabel icon={<FaFileInvoice />} label="Memo No" required />
                <TextField
                  name="memo"
                  placeholder="Enter Estimate Memo"
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={customComplainStyle}
                  error={touched.memo && Boolean(errors.memo)}
                  helperText={touched.memo && errors.memo}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 4,
              }}
            >
              <Box>
                <FieldLabel
                  icon={<FaFileInvoice />}
                  label="Tender/NIT No"
                  required
                />
                <TextField
                  name="nit_no"
                  placeholder="NIT/Acceptance No"
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={customComplainStyle}
                  error={touched.nit_no && Boolean(errors.nit_no)}
                  helperText={touched.nit_no && errors.nit_no}
                />
              </Box>
              <Box>
                <FieldLabel
                  icon={<FaBuilding />}
                  label="Select Agency"
                  required
                />
                <TextField
                  select
                  name="agency"
                  value={values.agency} // <-- ADDED: Explicit value binding
                  onChange={handleChange} // <-- ADDED: Explicit onChange
                  size="small"
                  fullWidth
                  sx={customSelectStyle}
                  error={touched.agency && Boolean(errors.agency)}
                  helperText={touched.agency && errors.agency}
                >
                  <MenuItem value="">
                    <em style={{ color: "#9e9e9e" }}>Select Challan Sender</em>
                  </MenuItem>
                  {sender.map((name, i) => (
                    <MenuItem key={i} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            {/* Section 2: Document Upload */}
            <SectionTitle title="Document Upload" number="02" />

            <Box sx={{ mb: 4 }}>
              <FieldLabel
                icon={<MdCloudUpload />}
                label="Work Order"
                required
              />
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: "10px",
                  borderColor:
                    touched.work_order && errors.work_order
                      ? "#d32f2f"
                      : "#c5cae9",
                  backgroundColor: "#fafafa",
                  borderStyle: "dashed",
                  borderWidth: "2px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#3949ab",
                    backgroundColor: "#e8eaf6",
                  },
                }}
                onClick={() => document.getElementById("work_order").click()}
              >
                <input
                  type="file"
                  id="work_order"
                  hidden
                  onChange={(e) =>
                    setFieldValue("work_order", e.currentTarget.files[0])
                  }
                />
                <MdCloudUpload
                  sx={{ fontSize: "2rem", color: "#9e9e9e", mb: 1 }}
                />
                <Typography variant="body2" sx={{ color: "#757575" }}>
                  {values.work_order
                    ? values.work_order.name
                    : "Click to upload Work Order (Max 1MB)"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                  JPG, JPEG, PNG
                </Typography>
                {touched.work_order && errors.work_order && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#d32f2f", display: "block", mt: 0.5 }}
                  >
                    {errors.work_order}
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Challan Images */}
            <SectionTitle title="Challan Images" number="03" />

            <FieldArray name="challan_img">
              {({ push, remove }) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {values.challan_img.map((file, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: "10px",
                        border: "2px dashed #c5cae9",
                        backgroundColor: "#fafafa",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#3949ab",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          document.getElementById(`challan_${index}`).click()
                        }
                      >
                        <input
                          type="file"
                          id={`challan_${index}`}
                          hidden
                          onChange={(event) => {
                            const selectedFile =
                              event.currentTarget.files?.[0] || null;
                            setFieldValue(`challan_img.${index}`, selectedFile);
                          }}
                        />
                        {file ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                backgroundColor: "#e8f5e9",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <MdCloudUpload sx={{ color: "#4caf50" }} />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "#37474f", fontWeight: 500 }}
                            >
                              {file.name}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                            Click to upload challan image {index + 1}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Add more">
                          <IconButton
                            type="button"
                            onClick={() => push(null)}
                            sx={{
                              color: "#4caf50",
                              backgroundColor: "#e8f5e9",
                              "&:hover": {
                                backgroundColor: "#c8e6c9",
                              },
                            }}
                          >
                            <MdOutlineAddCircle />
                          </IconButton>
                        </Tooltip>
                        {values.challan_img.length > 1 && (
                          <Tooltip title="Remove">
                            <IconButton
                              type="button"
                              onClick={() => remove(index)}
                              sx={{
                                color: "#d32f2f",
                                backgroundColor: "#ffebee",
                                "&:hover": {
                                  backgroundColor: "#ffcdd2",
                                },
                              }}
                            >
                              <RiDeleteBack2Fill />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </FieldArray>
          </Box>

          {/* Fixed Footer */}
          <FormFooter isSubmitting={isSubmitting} submitText="Upload Challan" />
        </Form>
      )}
    </Formik>
  );
};
