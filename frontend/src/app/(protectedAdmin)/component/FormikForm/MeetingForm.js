import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  CircularProgress,
  Divider,
  Paper,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Event,
  Place,
  Business,
  CloudUpload,
  Add,
  Delete,
  Mic,
  Tv,
  Save,
  Close,
  Router,
  Videocam,
  Speaker,
  SettingsInputComponent,
  MoreHoriz,
  Comment,
  Schedule,
  EventNote,
  Person,
} from "@mui/icons-material";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";

// --- Custom Formik Field Component for Cleanliness & Error Handling ---
const FormikTextField = ({ label, name, type, icon, ...props }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <TextField
        {...field}
        {...props}
        type={type}
        label={label}
        fullWidth
        size="small"
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        InputLabelProps={
          type === "date" || type === "time" ? { shrink: true } : {}
        }
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start" sx={{ color: "primary.main" }}>
              {icon}
            </InputAdornment>
          ) : undefined,
        }}
      />
    )}
  </Field>
);

// --- Category Icons Map ---
const categoryIcons = {
  VIDEO: <Videocam fontSize="small" />,
  AUDIO: <Speaker fontSize="small" />,
  NETWORK: <Router fontSize="small" />,
  SURVEILLANCE: <SettingsInputComponent fontSize="small" />,
  HARDWARE: <Tv fontSize="small" />,
  Others: <MoreHoriz fontSize="small" />,
};

// SUBMIT FORM //
export const MeetingForm = ({ modStat, onSuccess }) => {
  const axios = useAxios();

  const initialValues = {
    meetingDate: "",
    programmeName: "",
    organiser: "",
    venue: "",
    meetingTime: "",
    agency: "",
    letter: null,
    remarks: "",
    itemDetails: [
      { category: "", items: [{ itemName: "", qty: 1, specification: "" }] },
    ],
  };

  const IT_CATEGORIES = [
    "VIDEO",
    "AUDIO",
    "NETWORK",
    "SURVEILLANCE",
    "HARDWARE",
    "Others",
  ];

  const validation = Yup.object({
    meetingDate: Yup.string().required("Required"),
    programmeName: Yup.string().required("Required"),
    venue: Yup.string().required("Required"),
    meetingTime: Yup.string().required("Required"),
    agency: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("meetingDate", values.meetingDate);
      formData.append("programmeName", values.programmeName);
      formData.append("organiser", values.organiser);
      formData.append("venue", values.venue);
      formData.append("meetingTime", values.meetingTime);
      formData.append("agency", values.agency);
      formData.append("remarks", values.remarks);
      formData.append("itemDetails", JSON.stringify(values.itemDetails));
      if (values.letter) formData.append("letter", values.letter);

      const res = await axios.post("/VIP/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data?.message || "Meeting Added Successfully");
      resetForm();
      modStat(false);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong");
    } finally {
      setSubmitting(false);
      onSuccess();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, handleChange }) => (
        <Form className="flex flex-col h-full overflow-hidden">
          {/* --- HEADER --- */}
          <Box
            sx={{
              p: 3,
              color: "#fff",
              background: "linear-gradient(135deg,#1e293b,#2563EB)",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              className="flex items-center gap-2"
            >
              <Event /> CM Public Meeting Requisition
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, ml: 4 }}>
              Audio • Video • IT Infrastructure Requirement
            </Typography>
          </Box>

          {/* --- SCROLLABLE BODY --- */}
          <Box className="flex-1 flex flex-col min-h-0 bg-slate-50 overflow-y-auto">
            {/* Section 1: Meeting Information */}
            <Paper elevation={1} className="m-4 p-5 rounded-xl">
              <Typography
                variant="h6"
                mb={3}
                fontWeight={600}
                color="primary"
                className="flex items-center gap-2"
              >
                <Business fontSize="small" /> Meeting Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormikTextField
                    name="meetingDate"
                    label="Meeting Date"
                    type="date"
                    icon={<Event fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikTextField
                    name="meetingTime"
                    label="Time"
                    type="time"
                    icon={<Schedule fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikTextField
                    name="agency"
                    label="Agency"
                    icon={<Business fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name="programmeName"
                    label="Programme Name"
                    icon={<EventNote fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormikTextField
                    name="organiser"
                    label="Organiser"
                    icon={<Person fontSize="small" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormikTextField
                    name="venue"
                    label="Venue"
                    icon={<Place fontSize="small" />}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Section 2: File Upload */}
            <Box className="mx-4 mb-4">
              <Box
                component="label"
                className="border-2 border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all w-full"
              >
                <CloudUpload sx={{ fontSize: 40, color: "#2563EB", mb: 1 }} />
                <Typography variant="body1" color="primary" fontWeight={500}>
                  Upload Requisition Letter
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (PDF, JPG, PNG)
                </Typography>
                <input
                  hidden
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFieldValue("letter", e.target.files[0])}
                />
              </Box>
              {values.letter && (
                <Chip
                  label={values.letter.name}
                  onDelete={() => setFieldValue("letter", null)}
                  variant="outlined"
                  className="mt-2 w-full"
                />
              )}
            </Box>

            {/* Section 3: IT Equipment Requirement (FieldArray) */}
            <Paper elevation={1} className="mx-4 mb-4 p-5 rounded-xl">
              <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
                color="primary"
                className="flex items-center gap-2"
              >
                <SettingsInputComponent fontSize="small" /> IT Equipment
                Requirement
              </Typography>

              <FieldArray name="itemDetails">
                {({ push, remove }) => (
                  <div className="space-y-6">
                    {values.itemDetails.map((section, secIndex) => (
                      <Box
                        key={secIndex}
                        className="border-l-4 border-indigo-500 bg-indigo-50/40 p-4 rounded-r-lg shadow-sm"
                      >
                        {/* Category Header */}
                        <Box className="flex items-center justify-between mb-4">
                          <TextField
                            select
                            size="small"
                            sx={{ minWidth: 220 }}
                            label="IT Category"
                            name={`itemDetails.${secIndex}.category`}
                            value={section.category}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {categoryIcons[section.category] || (
                                    <MoreHoriz fontSize="small" />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                          >
                            <MenuItem value="" disabled>
                              Select Category
                            </MenuItem>
                            {IT_CATEGORIES.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </TextField>

                          <IconButton
                            color="error"
                            onClick={() => remove(secIndex)}
                            disabled={values.itemDetails.length === 1}
                          >
                            <Delete />
                          </IconButton>
                        </Box>

                        {/* Sub Items */}
                        <FieldArray name={`itemDetails.${secIndex}.items`}>
                          {({ push: addItem, remove: removeItem }) => (
                            <div className="space-y-3 pl-4">
                              {section.items.map((item, itemIndex) => (
                                <Grid
                                  container
                                  spacing={2}
                                  key={itemIndex}
                                  alignItems="center"
                                >
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Item Name"
                                      name={`itemDetails.${secIndex}.items.${itemIndex}.itemName`}
                                      value={item.itemName}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={2}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="number"
                                      label="Qty"
                                      name={`itemDetails.${secIndex}.items.${itemIndex}.qty`}
                                      value={item.qty}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Specification"
                                      placeholder="10×12 ft / Dell i7"
                                      name={`itemDetails.${secIndex}.items.${itemIndex}.specification`}
                                      value={item.specification}
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    md={2}
                                    className="flex justify-end"
                                  >
                                    <IconButton
                                      color="error"
                                      size="small"
                                      onClick={() => removeItem(itemIndex)}
                                      disabled={section.items.length === 1}
                                    >
                                      <Close fontSize="small" />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              ))}

                              <Button
                                startIcon={<Add />}
                                variant="outlined"
                                size="small"
                                className="mt-2"
                                onClick={() =>
                                  addItem({
                                    itemName: "",
                                    qty: 1,
                                    specification: "",
                                  })
                                }
                              >
                                Add Item
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </Box>
                    ))}

                    <Button
                      variant="dashed"
                      startIcon={<Add />}
                      fullWidth
                      onClick={() =>
                        push({
                          category: "",
                          items: [{ itemName: "", qty: 1, specification: "" }],
                        })
                      }
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderColor: "primary.main",
                        color: "primary.main",
                      }}
                    >
                      Add IT Category
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Paper>

            {/* Section 4: Remarks */}
            <Paper elevation={1} className="mx-4 mb-4 p-5 rounded-xl">
              <Typography
                variant="h6"
                mb={2}
                fontWeight={600}
                color="primary"
                className="flex items-center gap-2"
              >
                <Comment fontSize="small" /> Remarks
              </Typography>
              <FormikTextField
                name="remarks"
                label="Any special instructions or remarks..."
                multiline
                rows={3}
              />
            </Paper>
          </Box>

          {/* --- FOOTER --- */}
          <Box className="p-4 border-t border-gray-200 flex justify-end gap-4 bg-white flex-shrink-0">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => modStat(false)}
              startIcon={<Close />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <Save />
                )
              }
              sx={{
                background: "linear-gradient(45deg, #2563EB 30%, #7C3AED 90%)",
                px: 4,
              }}
            >
              {isSubmitting ? "Saving..." : "Save Meeting"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// NORMALIZED HELPER FUNCTION //
const CATEGORIES = [
  "VIDEO",
  "AUDIO",
  "NETWORK",
  "SURVEILLANCE",
  "HARDWARE",
  "Others",
];
const createEmptyItem = () => ({
  itemName: "",
  qty: 1,
  measurement: "",
  specification: "",
});
const normalizeItemDetails = (itemDetails = []) => {
  const result = {};

  // Initialize every category as an array
  CATEGORIES.forEach((category) => {
    result[category] = [];
  });

  // Your API returns an ARRAY
  if (Array.isArray(itemDetails)) {
    itemDetails.forEach((categoryData) => {
      const category = categoryData?.category;

      if (
        category &&
        CATEGORIES.includes(category) &&
        Array.isArray(categoryData.items)
      ) {
        result[category] = categoryData.items.map((item) => ({
          itemName: item?.itemName || "",
          qty: item?.qty ?? 1,
          measurement: item?.measurement || "",
          specification: item?.specification || "",
        }));
      }
    });
  }

  return result;
};

// EDIT FORM //

export const EditMeetingForm = ({ data, modStat, onSuccess }) => {
  console.log(data);
  const axios = useAxios();

  const initialValues = {
    meetingDate: data?.meetingDate
      ? new Date(data.meetingDate).toISOString().split("T")[0]
      : "",

    programmeName: data?.programmeName || "",
    venue: data?.venue || "",
    meetingTime: data?.meetingTime || "",
    organiser: data?.organiser || "",
    agency: data?.agency || "",
    remarks: data?.remarks || "",

    // IMPORTANT
    letter: data?.letter || null,

    // IMPORTANT
    itemDetails: normalizeItemDetails(data?.itemDetails),

    selectedCategories: Array.isArray(data?.itemDetails)
      ? data.itemDetails
          .map((item) => item.category)
          .filter((category) => CATEGORIES.includes(category))
      : [],
  };

  const validationSchema = Yup.object({
    meetingDate: Yup.string().required("Meeting date is required"),

    programmeName: Yup.string().trim().required("Programme name is required"),

    venue: Yup.string().trim().required("Venue is required"),

    meetingTime: Yup.string().required("Meeting time is required"),

    agency: Yup.string().trim().required("Agency is required"),

    remarks: Yup.string().nullable(),
  });

  const convertItemDetailsForAPI = (itemDetails) => {
  return Object.entries(itemDetails)
    .filter(
      ([, items]) =>
        Array.isArray(items) && items.length > 0
    )
    .map(([category, items]) => ({
      category,
      items,
    }));
};

  const handleEditForm = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      formData.append("meetingDate", values.meetingDate);
      formData.append("programmeName", values.programmeName);
      formData.append("venue", values.venue);
      formData.append("meetingTime", values.meetingTime);
      formData.append("organiser", values.organiser);
      formData.append("agency", values.agency);
      formData.append("remarks", values.remarks || "");

      formData.append("itemDetails", JSON.stringify(convertItemDetailsForAPI(values.itemDetails)));

      // Only send letter when user selects a NEW file
      if (values.letter instanceof File) {
        formData.append("letter", values.letter);
      }

      const response = await axios.put(`/VIP/update/${data._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Meeting updated successfully");

        modStat(false);
        onSuccess();
      } else {
        throw new Error("Something is wrong");
      }
    } catch (error) {
      console.error(error);

      const { generalError } = handleAxiosError(error);
      toast.error(generalError);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleEditForm}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form className="flex flex-col h-full overflow-hidden">
          {/* =====================================================
              HEADER - FIXED
          ===================================================== */}

          <Box
            sx={{
              p: 3,
              color: "#fff",
              background: "linear-gradient(135deg,#1e293b,#2563EB)",
              flexShrink: 0,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              className="flex items-center gap-2"
            >
              <Event />
              Edit Meeting Information
            </Typography>

            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                ml: 4,
                mt: 0.5,
              }}
            >
              Audio • Video • IT Infrastructure Requirement
            </Typography>
          </Box>

          {/* =====================================================
              MIDDLE - SCROLLABLE
          ===================================================== */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              p: 3,
              background: "#f8fafc",

              "&::-webkit-scrollbar": {
                width: 8,
              },

              "&::-webkit-scrollbar-thumb": {
                background: "#94a3b8",
                borderRadius: 4,
              },
            }}
          >
            {/* =================================================
                MEETING INFORMATION
            ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
                Meeting Information
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                {/* Meeting Date */}

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Meeting Date"
                    name="meetingDate"
                    value={values.meetingDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.meetingDate && Boolean(errors.meetingDate)}
                    helperText={touched.meetingDate && errors.meetingDate}
                  />
                </Grid>

                {/* Meeting Time */}

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="time"
                    label="Meeting Time"
                    name="meetingTime"
                    value={values.meetingTime}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.meetingTime && Boolean(errors.meetingTime)}
                    helperText={touched.meetingTime && errors.meetingTime}
                  />
                </Grid>

                {/* Programme */}

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Programme Name"
                    name="programmeName"
                    value={values.programmeName}
                    onChange={handleChange}
                    error={
                      touched.programmeName && Boolean(errors.programmeName)
                    }
                    helperText={touched.programmeName && errors.programmeName}
                  />
                </Grid>

                {/* Venue */}

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Venue"
                    name="venue"
                    value={values.venue}
                    onChange={handleChange}
                    error={touched.venue && Boolean(errors.venue)}
                    helperText={touched.venue && errors.venue}
                  />
                </Grid>

                {/* Agency */}

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Agency"
                    name="agency"
                    value={values.agency}
                    onChange={handleChange}
                    error={touched.agency && Boolean(errors.agency)}
                    helperText={touched.agency && errors.agency}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* =================================================
                IT EQUIPMENT REQUIREMENT
            ================================================= */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} color="secondary">
                    IT Equipment Requirement
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Manage equipment required for the programme
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* =============================================
                  CATEGORY SELECTOR
              ============================================= */}

              <TextField
                select
                fullWidth
                size="small"
                label="Add IT Category"
                value=""
                onChange={(e) => {
                  const category = e.target.value;

                  if (!category) return;

                  if (!values.itemDetails[category]) {
                    setFieldValue(`itemDetails.${category}`, [
                      {
                        itemName: "",
                        qty: "",
                        specification: "",
                      },
                    ]);
                  }
                }}
                sx={{ mb: 3 }}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              {/* =============================================
                  EXISTING CATEGORIES
              ============================================= */}

              {Object.entries(values.itemDetails || {}).map(
                ([category, items]) => {
                  if (!items) return null;

                  return (
                    <Box
                      key={category}
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {/* CATEGORY HEADER */}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography fontWeight={700} color="primary">
                          {category}
                        </Typography>

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={<Delete />}
                          onClick={() => {
                            const updated = {
                              ...values.itemDetails,
                            };

                            delete updated[category];

                            setFieldValue("itemDetails", updated);
                          }}
                        >
                          Remove Category
                        </Button>
                      </Box>

                      {/* =====================================
                          CATEGORY ITEMS
                      ===================================== */}

                      <FieldArray name={`itemDetails.${category}`}>
                        {({ push, remove }) => (
                          <>
                            {items.map((item, index) => (
                              <Box
                                key={index}
                                sx={{
                                  mb: 2,
                                  p: 2,
                                  background: "#ffffff",
                                  borderRadius: 2,
                                  border: "1px solid #e5e7eb",
                                }}
                              >
                                <Grid container spacing={2} alignItems="center">
                                  {/* ITEM NAME */}

                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Item Name"
                                      value={item.itemName || ""}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `itemDetails.${category}.${index}.itemName`,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </Grid>

                                  {/* QUANTITY */}

                                  <Grid item xs={12} md={2}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="number"
                                      label="Qty"
                                      value={item.qty || ""}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `itemDetails.${category}.${index}.qty`,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </Grid>

                                  {/* SPECIFICATION */}

                                  <Grid item xs={12} md={5}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Specification"
                                      placeholder="e.g. 10*12, Dell 18 inch"
                                      value={item.specification || ""}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `itemDetails.${category}.${index}.specification`,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </Grid>

                                  {/* DELETE */}

                                  <Grid item xs={12} md={1}>
                                    <IconButton
                                      color="error"
                                      onClick={() => remove(index)}
                                      disabled={items.length === 1}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Box>
                            ))}

                            {/* ADD ITEM */}

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Add />}
                              onClick={() =>
                                push({
                                  itemName: "",
                                  qty: "",
                                  specification: "",
                                })
                              }
                            >
                              Add Item
                            </Button>
                          </>
                        )}
                      </FieldArray>
                    </Box>
                  );
                },
              )}
            </Paper>

            {/* =================================================
                REMARKS
            ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                Additional Information
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Remarks"
                name="remarks"
                value={values.remarks}
                onChange={handleChange}
              />
            </Paper>

            {/* =================================================
                REQUISITION LETTER
            ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                Requisition Letter
              </Typography>

              {values?.letter ? (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="success.main"
                  >
                    ✓ Requisition Letter Available
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {values.letter.filename}
                  </Typography>
                </Box>
              ) : (
                <Button component="label" variant="outlined">
                  Upload Requisition Letter
                  <input
                    hidden
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      setFieldValue(
                        "letter",
                        e.currentTarget.files?.[0] || null,
                      )
                    }
                  />
                </Button>
              )}
            </Paper>
          </Box>

          {/* =====================================================
              FOOTER - FIXED
          ===================================================== */}

          <Box
            sx={{
              flexShrink: 0,
              p: 2,
              borderTop: "1px solid #e2e8f0",
              background: "#fff",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={() => modStat?.(false)}
              startIcon={<Close />}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <Save />
                )
              }
              sx={{
                background: "linear-gradient(45deg,#2563EB 30%,#7C3AED 90%)",
                px: 4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
