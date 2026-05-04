import {
  Box,
  Modal,
  Button,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Paper,
  Divider,
  Alert,
  Chip,
} from "@mui/material";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
// import axios from "axios";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
// import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";
import "../CSS/FormikForm.css";

const EditMachine = ({ editData, modStat, refreshData }) => {
  const axios = useAxios();

  const getDerivedAmcStatus = (editData) => {
    if (
      editData.remainingWarranty === "Expired" &&
      editData.amcStatus === "NONE"
    ) {
      return "REQUIRED";
    }
    return editData.amcStatus;
  };

  const systemCondition = ["GOOD", "AVERAGE", "BAD"];

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
    
    const editableData = {
      department,
      designation,
      employeeName,
      floor,
      office,
      roomNo,
      amcStatus,
      systemCondition,
      remarks,
    };

    try {
      const response = await axios.patch(
        `/NabannaSystem/update/${_id}`,
        editableData
      );

      toast.success(response.data?.message || "Updated Successfully");
      refreshData();
      resetForm();
      modStat();
    } catch (error) {
      const { generarlError } = handleAxiosError(error);
      toast.error(generarlError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper style for input wrapper to ensure consistent spacing
  const inputGroupStyle = { marginBottom: "0.5rem" };

  return (
    <Formik initialValues={editData} onSubmit={handleEditSystem} enableReinitialize>
      {({ values, handleChange, setFieldValue, isSubmitting }) => (
        <FormikForm className="">
          {/* Main Card Container */}
          <Container className="d-flex justify-content-center">
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                height:"600px",
                minWidth: "850px", // Wider for better spacing
                p: 4,
                bgcolor: "#ffffff",
                borderRadius: 2,
              }}
            >
              {/* Header Section */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" color="primary.main">
                  Update Nabanna System Status
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Please verify the information below before updating.
                </Typography>
              </Box>

              {/* Section 1: Employee Details */}
              <Box sx={{ mb: 2}}>
                <Typography
                  variant="overline"
                  display="block"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ letterSpacing: 1, mb: 2 }}
                >
                  EMPLOYEE DETAILS
                </Typography>
                <Row>
                  <Col md={4} style={inputGroupStyle}>
                    <Form.Label className="fw-semibold">User Name</Form.Label>
                    <Field
                      name="employeeName"
                      className="form-control form-control-lg"
                      placeholder="Enter Name"
                    />
                  </Col>
                  <Col md={4} style={inputGroupStyle}>
                    <Form.Label className="fw-semibold">Rank / Designation</Form.Label>
                    <Field
                      name="designation"
                      className="form-control form-control-lg"
                      placeholder="Enter Designation"
                    />
                  </Col>
                  <Col md={4} style={inputGroupStyle}>
                    <Form.Label className="fw-semibold">Department</Form.Label>
                    <Field
                      name="department"
                      className="form-control form-control-lg"
                      placeholder="Department Name"
                    />
                  </Col>
                </Row>
              </Box>

            

              {/* Section 2: Location Details */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="overline"
                  display="block"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ letterSpacing: 1, mb: 2 }}
                >
                  LOCATION DETAILS
                </Typography>
                <Row>
                  <Col md={4} style={inputGroupStyle}>
                    <Form.Label className="fw-semibold">Office</Form.Label>
                    <Field name="office" className="form-control form-control-lg" />
                  </Col>
                  <Col md={4} style={inputGroupStyle}>
                    <Form.Label className="fw-semibold">Floor</Form.Label>
                    <Field name="floor" className="form-control form-control-lg" />
                  </Col>
                  <Col md={4} style={inputGroupStyle}>
                    <Form.Label className="fw-semibold">Room No.</Form.Label>
                    <Field name="roomNo" className="form-control form-control-lg" />
                  </Col>
                </Row>
              </Box>

              {/* Section 3: AMC Status (Conditional) */}
              {(getDerivedAmcStatus(values) === "REQUIRED" ||
                getDerivedAmcStatus(values) === "ON") && (
                <Box sx={{ mb: 2 }}>
                  <Alert
                    severity="warning"
                    variant="outlined"
                    sx={{
                      bgcolor: "#fff5f5",
                      borderColor: "#feb2b2",
                      "& .MuiAlert-icon": { color: "#c53030" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Typography fontWeight="bold" color="#742a2a">
                        Warranty Expired: Activate AMC
                      </Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={values.amcStatus === "ON"}
                              disabled={getDerivedAmcStatus(values) === "ON"}
                              onChange={(e) =>
                                setFieldValue(
                                  "amcStatus",
                                  e.target.checked ? "ON" : "NONE"
                                )
                              }
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#16a34a",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  {
                                    backgroundColor: "#22c55e",
                                  },
                                "& .MuiSwitch-track": {
                                  backgroundColor: "#dc2626",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                color: "#742a2a",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                              }}
                            >
                              {values.amcStatus === "ON" ? "AMC Active" : "AMC Inactive"}
                            </Typography>
                          }
                        />
                      </FormGroup>
                    </Box>
                  </Alert>
                </Box>
              )}

              

              {/* Section 4: System Condition */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="overline"
                  display="block"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ letterSpacing: 1, mb: 2 }}
                >
                  SYSTEM CONDITION
                </Typography>
                <Row>
                  <Col xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: { xs: "flex-start", md: "flex-start" },
                      }}
                    >
                      {systemCondition.map((condition) => (
                        <label
                          key={condition}
                          style={{ cursor: "pointer", flex: 1, maxWidth: "150px" }}
                        >
                          <Field type="radio" name="systemCondition" value={condition} hidden />
                          <Box
                            sx={{
                              border: "2px solid",
                              borderColor:
                                values.systemCondition === condition
                                  ? condition === "GOOD"
                                    ? "#16a34a"
                                    : condition === "AVERAGE"
                                    ? "#ca8a04"
                                    : "#dc2626"
                                  : "#e5e7eb",
                              backgroundColor:
                                values.systemCondition === condition
                                  ? condition === "GOOD"
                                    ? "#dcfce7"
                                    : condition === "AVERAGE"
                                    ? "#fef9c3"
                                    : "#fee2e2"
                                  : "#ffffff",
                              borderRadius: 2,
                              padding: "10px",
                              textAlign: "center",
                              transition: "all 0.2s",
                              fontWeight: "bold",
                              color:
                                values.systemCondition === condition
                                  ? condition === "GOOD"
                                    ? "#14532d"
                                    : condition === "AVERAGE"
                                    ? "#713f12"
                                    : "#7f1d1d"
                                  : "#6b7280",
                              "&:hover": {
                                borderColor: "#93c5fd",
                                backgroundColor: "#eff6ff",
                              },
                            }}
                          >
                            {condition}
                          </Box>
                        </label>
                      ))}
                    </Box>
                  </Col>
                </Row>
              </Box>

              {/* Section 5: Remarks */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="overline"
                  display="block"
                  fontWeight="bold"
                  color="text.secondary"
                  sx={{ letterSpacing: 1, mb: 2 }}
                >
                  REMARKS
                </Typography>
                <Field
                  as="textarea"
                  name="remarks"
                  className="form-control"
                  rows={3}
                  placeholder="Add any additional notes or issues here..."
                  style={{ resize: "vertical" }}
                />
              </Box>

              {/* Footer / Action Button */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{
                    minWidth: "200px",
                    py: 1.5,
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update System"}
                </Button>
              </Box>
            </Paper>
          </Container>
        </FormikForm>
      )}
    </Formik>
  );
};

export default EditMachine;