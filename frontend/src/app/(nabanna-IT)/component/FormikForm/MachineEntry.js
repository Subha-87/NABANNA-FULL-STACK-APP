import { Formik, Form, Field, FieldArray } from "formik";
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
  FormControl,
  InputLabel,
  Select,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DomainIcon from "@mui/icons-material/Domain";
import RoomIcon from "@mui/icons-material/Room";
import ShieldIcon from "@mui/icons-material/Shield";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ComputerIcon from "@mui/icons-material/Computer";
import AddIcon from "@mui/icons-material/Add";
import { HARDWARE_OPTIONS } from "./Helper/hardwareOption";

const MachineEntry = ({ onSuccess, modStat }) => {
  const axios = useAxios();
  const [floors, setFloors] = useState([]);

  const departmentFloorMap = {
    PWD: ["Ground Floor", "1st Floor", "8th Floor"],
    CMO: ["Nabanna South Entry", "Ground FLoor", "13th Floor", "14th Floor"],
    Misc: ["Ground Floor", "1st Floor"],
  };

  const MACHINE_TYPES = [
    "ALL_IN_ONE",
    "CPU",
    "MONITOR",
    "UPS",
    "PRINTER",
    "SCANNER",
    "LAPTOP",
  ];

  const vendor = ["PASCAL", "AIRCON", "SOFTLINK", "APPLET", "TRANSCON"];

  const baseSystemData = {
    username: "",
    rank: "",
    department: "",
    floor: "",
    office: "",
    room: "",
    warrantyType: "WARRANTY",
    date: "",
    supplier: "",
    //machineDetails: [{ name: "", model: "", make: "", serial: [""] }],
    machineDetails: [
      {
        name: "",
        model: "",
        otherModel: "",
        make: "",
        otherMake: "",
        capacity: "",
        otherCapacity: "",
        serial: [""],
        warrantyYears: 3,
      },
    ],
  };

  const machineSchema = Yup.object().shape({
    name: Yup.string().required("System type is required"),
    make: Yup.string().required("Make is required"),
  });

  const validationSystemEntry = Yup.object().shape({
    department: Yup.string().required("Mention Any Department!"),
    floor: Yup.string().required("Select Floor"),
    office: Yup.string().required("Mention Office Name!"),
    date: Yup.date().when("warrantyType", {
      is: "WARRANTY",
      then: (schema) => schema.required("Installation Date is Must!!"),
      otherwise: (schema) => schema.notRequired(),
    }),
    supplier: Yup.string().when("warrantyType", {
      is: "WARRANTY",
      then: (schema) => schema.required("Choose Supplier!"),
      otherwise: (schema) => schema.notRequired(),
    }),
    machineDetails: Yup.array()
      .of(machineSchema)
      .min(1, "At least one system is required")
      .test("unique-system", "Duplicate system selected", (machines = []) => {
        const names = machines.map((m) => m.name).filter(Boolean);
        return names.length === new Set(names).size;
      }),
  });

  const handleMachineEntry = async (values, { resetForm, setSubmitting }) => {
    //console.log("Sending Data:",values)
    try {
      const payload = {
        ...values,
        machineDetails: values.machineDetails.map((item) => ({
          ...item,
          make: item.make === "Other" ? item.otherMake : item.make,

          model: item.model === "Other" ? item.otherModel : item.model,
        })),
      };
      const resp = await axios.post("/NabannaSystem", payload);
      const success_msg = resp.data?.message || "Entry Successful";
      //SweetSwal.fire({ title: success_msg, icon: "success", draggable: true });
      toast.success(success_msg)
      onSuccess();
      resetForm();
      modStat(true); // Standardized close trigger
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Standardized Input Styling for Slate Theme
  const inputSx = (hasError) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#fff",
      fontSize: "14px",
      "& fieldset": {
        borderColor: hasError ? "#ef4444" : "#e2e8f0",
        borderWidth: "1px",
      },
      "&:hover fieldset": { borderColor: hasError ? "#ef4444" : "#94a3b8" },
      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#ef4444" : "#334155",
      },
    },
    "& .MuiFormHelperText-root": {
      fontSize: "11px",
      ml: 0,
      color: hasError ? "#ef4444" : "transparent",
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      color: "#64748b",
      "&.Mui-focused": { color: "#334155" },
    },
  });

  const miniInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#fff",
      fontSize: "13px",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": { borderColor: "#334155" },
    },
  };

  return (
    <Formik
      initialValues={baseSystemData}
      onSubmit={handleMachineEntry}
      validationSchema={validationSystemEntry}
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
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "85vh",
            overflow: "hidden",
          }}
        >
          {/* --- FIXED HEADER --- */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
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
                <PrecisionManufacturingIcon
                  sx={{ color: "#fff", fontSize: 24 }}
                />
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
                  Enter Machine Details
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "12px",
                    fontWeight: 400,
                    mt: 0.3,
                  }}
                >
                  Nabanna Hardware & Infrastructure
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => modStat(true)}
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
              flex: "1 1 0%",
              maxHeight: 500,
              // <-- ADD THIS
              overflowY: "auto",
              overflowX: "hidden", // <-- ADD THIS
              padding: "28px",
              display: "block",
              boxSizing: "border-box",
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "10px",
              },
            }}
          >
            {/* 1. USER DETAILS GRID (Strict Single Row) */}
            <Grid
              container
              spacing={2}
              sx={{
                mb: 3,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Grid item xs="auto">
                <SectionLabel
                  icon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
                  text="Employee Name"
                />
                <Field name="username">
                  {({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      placeholder="Enter Name"
                      sx={{ width: "200px", ...inputSx(false) }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs="auto">
                <SectionLabel
                  icon={<BadgeIcon sx={{ fontSize: 16 }} />}
                  text="Designation"
                />
                <Field name="rank">
                  {({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      placeholder="Enter Rank"
                      sx={{ width: "180px", ...inputSx(false) }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs="auto">
                <SectionLabel
                  icon={<ApartmentIcon sx={{ fontSize: 16 }} />}
                  text="Department"
                  required
                />
                <FormControl
                  size="small"
                  error={touched.department && Boolean(errors.department)}
                  sx={{
                    width: "180px",
                    ...inputSx(touched.department && errors.department),
                  }}
                >
                  <InputLabel>Dept</InputLabel>
                  <Select
                    name="department"
                    value={values.department}
                    label="Dept"
                    onChange={(e) => {
                      setFieldValue("department", e.target.value);
                      setFieldValue("floor", "");
                      setFloors(departmentFloorMap[e.target.value] || []);
                    }}
                  >
                    <MenuItem value="">Select Dept</MenuItem>
                    {Object.keys(departmentFloorMap).map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.department && errors.department && (
                    <FieldError text={errors.department} />
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                mb: 3,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Grid item xs="auto">
                <SectionLabel
                  icon={<MeetingRoomIcon sx={{ fontSize: 16 }} />}
                  text="Floor"
                  required
                />
                <FormControl
                  size="small"
                  disabled={!floors.length}
                  error={touched.floor && Boolean(errors.floor)}
                  sx={{
                    width: "140px",
                    ...inputSx(touched.floor && errors.floor),
                  }}
                >
                  <InputLabel>Floor</InputLabel>
                  <Select
                    name="floor"
                    value={values.floor}
                    label="Floor"
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {floors.map((fl) => (
                      <MenuItem key={fl} value={fl}>
                        {fl}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.floor && errors.floor && (
                    <FieldError text={errors.floor} />
                  )}
                </FormControl>
              </Grid>
              <Grid item xs="auto">
                <SectionLabel
                  icon={<DomainIcon sx={{ fontSize: 16 }} />}
                  text="Office"
                  required
                />
                <Field name="office">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      size="small"
                      placeholder="Office Name"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error ? meta.error : " "}
                      sx={{
                        width: "180px",
                        ...inputSx(meta.touched && meta.error),
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs="auto">
                <SectionLabel
                  icon={<RoomIcon sx={{ fontSize: 16 }} />}
                  text="Room"
                />
                <Field name="room">
                  {({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      placeholder="Room"
                      sx={{ width: "100px", ...inputSx(false) }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>

            {/* 2. WARRANTY ROW (Single Row, Green/Red Borders) */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ width: "200px", flexShrink: 0 }}>
                <SectionLabel
                  icon={<ShieldIcon sx={{ fontSize: 16 }} />}
                  text="Warranty Status"
                />
                <FormControl size="small" fullWidth>
                  <Select
                    name="warrantyType"
                    value={values.warrantyType}
                    onChange={(e) =>
                      setFieldValue("warrantyType", e.target.value)
                    }
                    sx={{
                      ...inputSx(false),
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          values.warrantyType === "WARRANTY"
                            ? "#22c55e"
                            : "#ef4444",
                        borderWidth: "2px",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          values.warrantyType === "WARRANTY"
                            ? "#16a34a"
                            : "#dc2626",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          values.warrantyType === "WARRANTY"
                            ? "#15803d"
                            : "#b91c1c",
                      },
                    }}
                  >
                    <MenuItem value="WARRANTY">Under Warranty</MenuItem>
                    <MenuItem value="AMC">AMC / Old</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Only show Date & Supplier if Warranty is selected */}
              {values.warrantyType === "WARRANTY" && (
                <>
                  <Box sx={{ flex: 1 }}>
                    <SectionLabel
                      icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                      text="Install Date"
                      required
                    />
                    <Field name="date">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          type="date"
                          size="small"
                          fullWidth
                          error={meta.touched && Boolean(meta.error)}
                          helperText={
                            meta.touched && meta.error ? meta.error : " "
                          }
                          InputLabelProps={{ shrink: true }}
                          sx={inputSx(meta.touched && meta.error)}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <SectionLabel
                      icon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
                      text="Supplier"
                      required
                    />
                    <FormControl
                      size="small"
                      fullWidth
                      error={touched.supplier && Boolean(errors.supplier)}
                      sx={inputSx(touched.supplier && errors.supplier)}
                    >
                      <InputLabel>Supplier</InputLabel>
                      <Select
                        name="supplier"
                        value={values.supplier}
                        label="Supplier"
                        onChange={handleChange}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {vendor.map((v) => (
                          <MenuItem key={v} value={v}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.supplier && errors.supplier && (
                        <FieldError text={errors.supplier} />
                      )}
                    </FormControl>
                  </Box>
                </>
              )}
            </Box>

            {/* 3. MACHINE DETAILS (Fixed with Flexbox instead of Grid) */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <SectionLabel
                  icon={<ComputerIcon sx={{ fontSize: 16 }} />}
                  text="Machine Details"
                  required
                />
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() =>
                    setFieldValue("machineDetails", [
                      ...values.machineDetails,
                      { name: "", model: "", make: "", serial: [""] },
                    ])
                  }
                  sx={{
                    color: "#334155",
                    fontWeight: 600,
                    fontSize: "12px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#f1f5f9" },
                  }}
                >
                  Add Machine
                </Button>
              </Box>

              <FieldArray name="machineDetails">
                {({ remove }) => {
                  const selectedSystems = values.machineDetails.map(
                    (m) => m.name,
                  );
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxHeight: 300,
                        overflow: "auto",
                      }}
                    >
                      {values.machineDetails.map((machine, index) => {
                        const type = machine.name;
                        const options = HARDWARE_OPTIONS[type];

                        return (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              gap: 1.5,
                              p: 2,
                              border: "1px solid #e2e8f0",
                              borderRadius: "12px",
                              backgroundColor: "#fafafa",
                              alignItems: "flex-start",
                              flexWrap: "wrap", // <-- ADD THIS
                            }}
                          >
                            <Typography
                              sx={{
                                minWidth: "25px",
                                fontWeight: 700,
                                color: "#334155",
                                fontSize: "14px",
                                mt: 1,
                              }}
                            >
                              {index + 1}.
                            </Typography>

                            {/* System Type */}
                            <Box sx={{ flex: "1 1 140px", minWidth: 0 }}>
                              <Field name={`machineDetails.${index}.name`}>
                                {({ field, meta }) => (
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    error={meta.touched && Boolean(meta.error)}
                                  >
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                      {...field}
                                      label="Type"
                                      sx={miniInputSx}
                                    >
                                      <MenuItem value="">Select</MenuItem>
                                      {MACHINE_TYPES.map((type) => (
                                        <MenuItem
                                          key={type}
                                          value={type}
                                          disabled={
                                            selectedSystems.includes(type) &&
                                            machine.name !== type
                                          }
                                        >
                                          {type}
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

                            {/* Model */}
                            <Box sx={{ flex: "1 1 160px", minWidth: 0 }}>
                              {options?.models?.length > 0 ? (
                                <Field
                                  as="select"
                                  name={`machineDetails.${index}.model`}
                                  className="border p-1 rounded"
                                  onChange={(e) => {
                                    const value = e.target.value;

                                    setFieldValue(
                                      `machineDetails.${index}.model`,
                                      value,
                                    );

                                    const selected = options.models.find(
                                      (m) => m.name === value,
                                    );

                                    if (selected) {
                                      setFieldValue(
                                        `machineDetails.${index}.warrantyYears`, // Auto Selected for model warranty //
                                        selected.warranty,
                                      );
                                    }
                                  }}
                                >
                                  <option value="">Select Model</option>

                                  {options.models.map((m) => (
                                    <option key={m.name} value={m.name}>
                                      {m.name}
                                    </option>
                                  ))}
                                </Field>
                              ) : (
                                <Field
                                  name={`machineDetails.${index}.model`}
                                  placeholder="Model"
                                  className="border p-1 rounded"
                                />
                              )}
                            </Box>

                            {machine.name === "UPS" && (
                              <Field
                                as="select"
                                name={`machineDetails.${index}.capacity`}
                                className="border p-1 rounded"
                              >
                                <option value="">Capacity</option>

                                {options.capacity.map((cap) => (
                                  <option key={cap} value={cap}>
                                    {cap}
                                  </option>
                                ))}
                              </Field>
                            )}

                            {/* Make */}
                            <Field
                              as="select"
                              name={`machineDetails.${index}.make`}
                              className="border p-1 rounded"
                            >
                              <option value="">Select Make</option>

                              {options?.makes.map((make) => (
                                <option key={make} value={make}>
                                  {make}
                                </option>
                              ))}
                            </Field>

                            {machine.make === "Other" && (
                              <Field
                                name={`machineDetails.${index}.otherMake`}
                                placeholder="Enter Make"
                                className="border p-1 rounded"
                              />
                            )}

                            {machine.model === "Other" && (
                              <Field
                                name={`machineDetails.${index}.otherModel`}
                                placeholder="Enter Model"
                                className="border p-1 rounded"
                              />
                            )}

                            {/* Serial No (Flex: 2 to give it more space for CPU arrays) */}
                            <Box sx={{ flex: "2 1 140px", minWidth: 0 }}>
                              {machine.name === "CPU" ? (
                                <FieldArray
                                  name={`machineDetails.${index}.serial`}
                                >
                                  {({ push, remove }) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "11px",
                                          fontWeight: 700,
                                          color: "#64748b",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Serial No(s)
                                      </Typography>
                                      {machine.serial.map((s, i) => (
                                        <Box
                                          key={i}
                                          sx={{
                                            display: "flex",
                                            gap: 0.5,
                                            alignItems: "center",
                                          }}
                                        >
                                          <Field
                                            name={`machineDetails.${index}.serial.${i}`}
                                          >
                                            {({ field }) => (
                                              <TextField
                                                {...field}
                                                size="small"
                                                placeholder={`S-${i + 1}`}
                                                sx={miniInputSx}
                                              />
                                            )}
                                          </Field>
                                          {i > 0 && (
                                            <IconButton
                                              size="small"
                                              onClick={() => remove(i)}
                                              sx={{ color: "#ef4444", p: 0.5 }}
                                            >
                                              <DeleteOutlineIcon
                                                sx={{ fontSize: 16 }}
                                              />
                                            </IconButton>
                                          )}
                                        </Box>
                                      ))}
                                      <Button
                                        size="small"
                                        startIcon={
                                          <AddIcon sx={{ fontSize: 14 }} />
                                        }
                                        onClick={() => push("")}
                                        sx={{
                                          fontSize: "11px",
                                          color: "#334155",
                                          p: 0.25,
                                          textTransform: "none",
                                          "&:hover": {
                                            backgroundColor: "#f1f5f9",
                                          },
                                        }}
                                      >
                                        Add Serial
                                      </Button>
                                    </Box>
                                  )}
                                </FieldArray>
                              ) : (
                                <Field name={`machineDetails.${index}.serial`}>
                                  {({ field }) => (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      size="small"
                                      placeholder="Serial No"
                                      value={
                                        Array.isArray(field.value)
                                          ? field.value[0]
                                          : field.value
                                      }
                                      onChange={(e) =>
                                        setFieldValue(
                                          `machineDetails.${index}.serial`,
                                          [e.target.value],
                                        )
                                      }
                                      sx={miniInputSx}
                                    />
                                  )}
                                </Field>
                              )}
                            </Box>

                            {/* Delete Machine Button */}
                            {index > 0 && (
                              <IconButton
                                onClick={() => remove(index)}
                                sx={{
                                  color: "#ef4444",
                                  backgroundColor: "#fef2f2",
                                  mt: 0.5,
                                  flexShrink: 0,
                                  "&:hover": { backgroundColor: "#fee2e2" },
                                }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  );
                }}
              </FieldArray>
            </Box>
          </Box>
          ;{/* --- FIXED FOOTER --- */}
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
              position: "sticky",
              bottom: 0,
              zIndex: 10,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => modStat(true)}
              disabled={isSubmitting}
              sx={{
                m: 0,
                px: 3.5,
                py: 1.1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
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
                m: 0,
                px: 4,
                py: 1.1,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
                  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.45)",
                  transform: "translateY(-1px)",
                },
                "&:active": { transform: "translateY(0)" },
                "&:disabled": {
                  background: "#94a3b8",
                  boxShadow: "none",
                  transform: "none",
                },
              }}
            >
              {isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} color="inherit" />
                  Submitting...
                </Box>
              ) : (
                "Save System Entry"
              )}
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
    <Box
      sx={{
        backgroundColor: "#f1f5f9",
        p: 0.5,
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#334155",
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

export default MachineEntry;
