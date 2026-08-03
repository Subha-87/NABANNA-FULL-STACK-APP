import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  PersonOutline,
  ConnectedTv,
  SettingsInputComponent,
  CheckCircleOutline,
  SaveAs,
} from "@mui/icons-material"; // Added icons for color & professionalism
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";

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
  "Others",
];

const nabannaFloor = [
  "Basement",
  "Ground",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "Outside",
];

export const BoxAddForm = ({ onSuccess, modStat }) => {
  const axios = useAxios();

  const boxDataValues = {
    username: "",
    designation: "",
    department: "",
    location: "", // temporary field only
    floor: "",
    room: "",
    boxType: "",
    boxCategory: "OLD", // Default
    boxMake: "Meghbela", // Default selected
    boxId: "",
    cardId: "",
    accessories: [],
    boxStatus: "Active",
    condition: "Good",
    installationDate: "",
    boxPresent: true,
    temporaryAllotment: false,
    remarks: "",
  };

  const boxDetailsSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Create payload
      const payload = {
        ...values,
        department:
          values.department === "Others" ? values.location : values.department,
      };

      // Remove temporary field
      delete payload.location;
      const resp = await axios.post("/nabanna/registerBox", payload);
      const success_msg = resp.data?.message || "Entry Successful";
      SweetSwal.fire({ title: success_msg, icon: "success", draggable: true });
      onSuccess();
      resetForm();
      modStat(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const boxDataValidation = Yup.object({
    username: Yup.string().required("Username is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    location: Yup.string().when("department", {
      is: "Others",
      then: (schema) => schema.required("Location is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    floor: Yup.string().required("Floor is required"),
    room: Yup.string().required("Room No is required"),
    boxType: Yup.string().oneOf(["SD", "HD"]).required("Box Type is required"),
    boxMake: Yup.string()
      .oneOf(["Meghbela", "Tata Play"])
      .required("Company is required"),
    boxCategory: Yup.string()
      .oneOf(["NEW", "OLD"])
      .required("Box Category is required"),
    boxId: Yup.string().required("Box ID is required"),
    cardId: Yup.string().required("Card ID is required"),
    installationDate: Yup.string().when("boxCategory", {
      is: "NEW",
      then: (schema) => schema.required("Installation Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  // Reusable section wrapper for colorful grouping
  const FormSection = ({ title, icon, color, children }) => (
    <Box
      sx={{
        mb: 3,
        p: 2.5,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: `${color}.light`,
        bgcolor: `${color}.backgroundHover`, // Very light tinted background
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          gap: 1,
          color: `${color}.dark`,
        }}
      >
        {icon}
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );

  return (
    <Formik
      initialValues={boxDataValues}
      validationSchema={boxDataValidation}
      onSubmit={boxDetailsSubmit}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        isSubmitting,
        errors,
        touched,
      }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* ---- FIXED HEADER ---- */}
          <Box
            sx={{
              flexShrink: 0,
              p: 3,
              background:
                "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: 3,
              zIndex: 10,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                CATV / Set Top Box Entry
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                Fill in the details below to register a new box
              </Typography>
            </Box>
            {/* Replaced TvOptionsEditInputs with ConnectedTv */}
            <ConnectedTv sx={{ fontSize: 40, opacity: 0.8 }} />
          </Box>

          {/* ---- SCROLLABLE FORM CONTENT ---- */}
          <Box
            sx={{
              flex: 1,

              minHeight: 0,

              overflowY: "auto",

              overflowX: "hidden",

              p: 3,

              bgcolor: "#f8fafc",

              "&::-webkit-scrollbar": {
                width: 8,
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#90caf9",
                borderRadius: 10,
              },

              "&::-webkit-scrollbar-track": {
                backgroundColor: "#edf2f7",
              },
            }}
          >
            {/* User Details Section */}
            <FormSection
              title="User Details"
              icon={<PersonOutline />}
              color="primary"
            >
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  fullWidth
                  size="small"
                  label="User Name"
                  name="username"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline color="primary" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  fullWidth
                  size="small"
                  label="Designation"
                  name="designation"
                  error={touched.designation && Boolean(errors.designation)}
                  helperText={touched.designation && errors.designation}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  sx={{ width: 200 }}
                  size="small"
                  label="Department"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  error={touched.department && Boolean(errors.department)}
                  helperText={touched.department && errors.department}
                >
                  <MenuItem value="" disabled>
                    <em>Select Department</em>
                  </MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {values.department === "Others" && (
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    size="small"
                    label="Location"
                    name="location"
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  sx={{ width: "100px" }}
                  size="small"
                  label="Floor"
                  name="floor"
                  value={values.floor}
                  onChange={handleChange}
                  error={touched.floor && Boolean(errors.floor)}
                  helperText={touched.floor && errors.floor}
                >
                  <MenuItem value="" disabled>
                    <em>Select Floor</em>
                  </MenuItem>
                  {nabannaFloor.map((floor) => (
                    <MenuItem key={floor} value={floor}>
                      {floor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  sx={{ width: "100px" }}
                  size="small"
                  label="Room-No"
                  name="room"
                  error={touched.room && Boolean(errors.room)}
                  helperText={touched.room && errors.room}
                />
              </Grid>
            </FormSection>

            {/* Box Information Section */}
            <FormSection
              title="Box Information"
              icon={<SettingsInputComponent />}
              color="secondary"
            >
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  size="small"
                  sx={{ width: 180 }}
                  label="Company"
                  name="boxMake"
                  value={values.boxMake}
                  onChange={handleChange}
                  error={touched.boxMake && Boolean(errors.boxMake)}
                  helperText={touched.boxMake && errors.boxMake}
                >
                  <MenuItem value="Meghbela">Meghbela</MenuItem>
                  <MenuItem value="Tata Play">Tata Play</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  sx={{ width: "80px" }}
                  size="small"
                  label="Type"
                  name="boxType"
                  value={values.boxType}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("accessories", []);
                  }}
                  error={touched.boxType && Boolean(errors.boxType)}
                  helperText={touched.boxType && errors.boxType}
                >
                  <MenuItem value="HD">HD</MenuItem>
                  <MenuItem value="SD">SD</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  size="small"
                  sx={{ width: 120 }}
                  label="Category"
                  name="boxCategory"
                  value={values.boxCategory}
                  onChange={(e) => {
                    handleChange(e);

                    if (e.target.value === "OLD") {
                      setFieldValue("installationDate", "");
                    }
                  }}
                >
                  <MenuItem value="NEW">NEW</MenuItem>
                  <MenuItem value="OLD">OLD</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  sx={{ width: "200px" }}
                  size="small"
                  label="Box ID"
                  name="boxId"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  sx={{ width: "200px" }}
                  size="small"
                  label="Card ID"
                  name="cardId"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ width: 200 }}>
                  <InputLabel>Accessories</InputLabel>
                  <Select
                    multiple
                    value={values.accessories}
                    onChange={(e) =>
                      setFieldValue("accessories", e.target.value)
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {selected.map((item) => (
                          <Chip
                            key={item}
                            label={item}
                            color="secondary"
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {(values.boxType === "HD"
                      ? ["HDMI Cable", "Remote", "Adapter"]
                      : ["AV Cord", "Remote", "Adapter"]
                    ).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </FormSection>

            {/* Status & Additional Info Section */}
            <FormSection
              title="Status & Additional Info"
              icon={<CheckCircleOutline />}
              color="success"
            >
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Box Status"
                  name="boxStatus"
                  value={values.boxStatus}
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Condition"
                  name="condition"
                  value={values.condition}
                  onChange={handleChange}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Bad">Bad</MenuItem>
                </TextField>
              </Grid>
              {values.boxCategory === "NEW" && (
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Installation Date"
                    name="installationDate"
                    value={values.installationDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  sx={{ width: 120 }}
                  size="small"
                  label="Box Present"
                  name="boxPresent"
                  value={String(values.boxPresent)}
                  onChange={(e) =>
                    setFieldValue("boxPresent", e.target.value === "true")
                  }
                >
                  <MenuItem value="true">YES</MenuItem>
                  <MenuItem value="false">NO</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  sx={{ width: 120 }}
                  label="Temp Allotment"
                  name="temporaryAllotment"
                  value={String(values.temporaryAllotment)} // 1. Cast boolean to string for MUI
                  onChange={(e) =>
                    setFieldValue(
                      "temporaryAllotment",
                      e.target.value === "true", // 2. Convert string back to boolean for Formik
                    )
                  }
                >
                  <MenuItem value="true">YES</MenuItem>{" "}
                  {/* 3. Use string values here */}
                  <MenuItem value="false">NO</MenuItem>{" "}
                  {/* 3. Use string values here */}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  label="Remarks"
                  name="remarks"
                />
              </Grid>
            </FormSection>
          </Box>

          {/* ---- FIXED FOOTER ---- */}
          <Box
            sx={{
              flexShrink: 0,
              p: 2,
              borderTop: "1px solid #e5e7eb",
              background:
                "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              boxShadow: "0 -2px 10px rgba(0,0,0,.08)",
              zIndex: 10,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => modStat(false)}
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={!isSubmitting && <SaveAs />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                background:
                  "radial-gradient(circle,rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save Box Details"
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export const EditBoxForm = ({ editData, modStat, refreshData }) => {
  const axios = useAxios();

  const boxEditValidation = Yup.object({
    username: Yup.string().required("User Name is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    floor: Yup.string().required("Floor is required"),
    room: Yup.string().required("Room No is required"),

    boxType: Yup.string().oneOf(["HD", "SD"]).required("Box Type is required"),

    boxCategory: Yup.string()
      .oneOf(["NEW", "OLD"])
      .required("Box Category is required"),

    boxId: Yup.string().required("Box ID is required"),

    cardId: Yup.string().required("Card ID is required"),

    boxStatus: Yup.string()
      .oneOf(["Active", "Inactive"])
      .required("Status is required"),

    condition: Yup.string()
      .oneOf(["Good", "Bad"])
      .required("Condition is required"),
  });

  const handleEditBoxData = async (values, { resetForm, setSubmitting }) => {
    try {
      const edit_id = editData._id;
      const payload = {
        ...values,
        department:
          values.department === "Others" ? values.location : values.department,
      };

      // Remove temporary field
      delete payload.location;
      const response = await axios.put(`/nabanna/editBox/${edit_id}`, payload);
      console.log(response);
      toast.success(response.data?.message || "Updated successfully");
      refreshData();
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
      initialValues={editData}
      validationSchema={boxEditValidation}
      onSubmit={handleEditBoxData}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        isSubmitting,
        errors,
        touched,
      }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "85vh",
            }}
          >
            {/* Header */}

            <Box
              sx={{
                p: 2,
                background:
                  "linear-gradient(90deg,rgba(47, 15, 153, 1) 12%, rgba(39, 230, 71, 1) 64%, rgba(209, 237, 83, 1) 99%)",
                color: "white",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Edit CATV Box Information
              </Typography>
            </Box>

            {/* Scrollable Content */}

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 3,
                bgcolor: "#fafafa",
              }}
            >
              {/* Employee Details */}

              <Box mb={3}>
                <Typography
                  variant="h6"
                  color="primary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <PersonOutline />
                  Employee Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="User Name"
                      name="username"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Designation"
                      name="designation"
                      error={touched.designation && Boolean(errors.designation)}
                      helperText={touched.designation && errors.designation}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      sx={{ width: 200 }}
                      size="small"
                      label="Department"
                      name="department"
                      value={values.department}
                      onChange={handleChange}
                      error={touched.department && Boolean(errors.department)}
                      helperText={touched.department && errors.department}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {values.department === "Others" && (
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        size="small"
                        label="Location"
                        name="location"
                        error={touched.location && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      sx={{ width: 100 }}
                      size="small"
                      label="Floor"
                      name="floor"
                      value={values.floor || ""}
                      onChange={handleChange}
                      error={touched.floor && Boolean(errors.floor)}
                      helperText={touched.floor && errors.floor}
                    >
                      {nabannaFloor.map((floor) => (
                        <MenuItem key={floor} value={floor}>
                          {floor}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      sx={{ width: 100 }}
                      label="Room No"
                      name="room"
                      error={touched.room && Boolean(errors.room)}
                      helperText={touched.room && errors.room}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Box Details */}

              <Box mb={3}>
                <Typography
                  variant="h6"
                  color="secondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <ConnectedTv />
                  Set Top Box Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      size="small"
                      sx={{ width: 180 }}
                      label="Company"
                      name="boxMake"
                      value={values.boxMake}
                      onChange={handleChange}
                      error={touched.boxMake && Boolean(errors.boxMake)}
                      helperText={touched.boxMake && errors.boxMake}
                    >
                      <MenuItem value="Meghbela">Meghbela</MenuItem>
                      <MenuItem value="Tata Play">Tata Play</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      sx={{width:80}}
                      label="Box Type"
                      name="boxType"
                      value={values.boxType}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("accessories", []);
                      }}
                    >
                      <MenuItem value="HD">HD</MenuItem>
                      <MenuItem value="SD">SD</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      sx={{width:120}}
                      label="Box Category"
                      name="boxCategory"
                      value={values.boxCategory}
                      onChange={handleChange}
                    >
                      <MenuItem value="NEW">NEW</MenuItem>
                      <MenuItem value="OLD">OLD</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      sx={{width:100}}
                      label="Box ID"
                      name="boxId"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ConnectedTv color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      sx={{width:120}}
                      label="Card ID"
                      name="cardId"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Accessories */}

              <Box mb={3}>
                <Typography
                  variant="h6"
                  color="success.main"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <SettingsInputComponent />
                  Accessories
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <FormControl fullWidth>
                  <InputLabel>Accessories</InputLabel>

                  <Select
                    multiple
                    value={values.accessories || []}
                    onChange={(e) =>
                      setFieldValue("accessories", e.target.value)
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((item) => (
                          <Chip key={item} label={item} color="primary" />
                        ))}
                      </Box>
                    )}
                  >
                    {(values.boxType === "HD"
                      ? ["HDMI Cable", "Remote", "Adapter"]
                      : ["AV Cord", "Remote", "Adapter"]
                    ).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Status */}

              <Box mb={3}>
                <Typography
                  variant="h6"
                  color="warning.main"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <CheckCircleOutline />
                  Status Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      name="boxStatus"
                      value={values.boxStatus}
                      onChange={handleChange}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Condition"
                      name="condition"
                      value={values.condition}
                      onChange={handleChange}
                    >
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Bad">Bad</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      type="date"
                      fullWidth
                      label="Installation Date"
                      name="installationDate"
                      value={values.installationDate?.slice(0, 10) || ""}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      sx={{ width: 100 }}
                      label="Box Present"
                      name="boxPresent"
                      value={String(values.boxPresent)}
                      onChange={(e) =>
                        setFieldValue("boxPresent", e.target.value === "true")
                      }
                    >
                      <MenuItem value="true">YES</MenuItem>
                      <MenuItem value="false">NO</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      sx={{ width: 160 }}
                      label="Temporary Allotment"
                      name="temporaryAllotment"
                      value={values.temporaryAllotment}
                      onChange={(e) =>
                        setFieldValue("temporaryAllotment", e.target.value)
                      }
                    >
                      <MenuItem value={true}>YES</MenuItem>
                      <MenuItem value={false}>NO</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      multiline
                      rows={4}
                      label="Remarks"
                      name="remarks"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Footer */}

            <Box
              sx={{
                p: 2,
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                background:
                  "linear-gradient(90deg,rgba(47, 15, 153, 1) 12%, rgba(39, 230, 71, 1) 64%, rgba(209, 237, 83, 1) 99%)",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => modStat()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveAs />}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Update Box"
                )}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
