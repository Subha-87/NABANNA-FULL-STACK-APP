import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { customComplainStyle } from "./TextFieldStyle";
import {
  TextField,
  InputLabel,
  createTheme,
  ThemeProvider,
  MenuItem,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";

import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import "./Form.css";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";

const ComplainForm = ({ modStat, onSuccess }) => {
  // Function to get today's date in YYYY-MM-DD format
  //console.log(modStat);
  const axios = useAxios();
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
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
  const domains = {
    Internet: [
      "No Internet",
      "Low Internet Speed",
      "IP Issue",
      "Wi-FI",
      "Webpage Not Opening",
      "Server Related",
    ],
    Voice: ["Telephone Dead", "No-Dial Tone", "No-Display", "Low-Volume"],
    Cable_TV: [
      "No-Display",
      "No-Recharge",
      "Remote Not Working",
      "Box-Issue",
      "Channel Error",
    ],
    PC_Hardware: [
      "Printer-Xerox",
      "Scanner",
      "System Hang",
      "System No Power",
      "All-In-One",
      "Laptop",
      "CPU",
      "Montior",
      "Keyboard",
      "Mouse",
      "Speaker",
      "Pendrive",
      "Antivirus",
      "Software(MS-Office/PDF/Misc.)",
      "Operating System",
    ],
  };

  const validation = Yup.object().shape({
    domain: Yup.string().required("Select IT Category !"),
    type: Yup.string().required("Select Type !"),
    username: Yup.string().required("Name is required!"),
    designation: Yup.string().required("Rank is required!"),
    department: Yup.string().required("Select Any Department!"),

    room: Yup.string().required("Room No is required!"),
    contact: Yup.string().required("Contact is required!"),
  });

  const handleComplain = async (values, { resetForm, setSubmitting }) => {
    //console.log(values);
    //const { domain } = values;

    try {
      // POST TO DATABASE//
      // 1️⃣ Save complaint (CRITICAL)
      const { data: dbResponse } = await axios.post(
        "/complain/postData",
        values,
        { timeout: 10000 },
      );
      //console.log(dbResponse);

      // Twilo Trial Account is Suspended //
      // 2️⃣ Trigger notifications in parallel (NON-CRITICAL)
      const notifications = [
        await axios.post("/publicMsg/send-sms", values), // POST TO SMS//
        //await axios.post("/publicMsg/send-whatsapp", values), //POST TO WHATS-APP// activate later
      ];
      const result = await Promise.allSettled(notifications);
      //console.log(result); // Check Here // if sms/whats app msg posting success or not//

      // 3️⃣ Extract messages
      const smsResult = result[0];
      //const whatsappResult = result[1]; activate letter

      let message = "Complaint submitted successfully";

      if (smsResult.status === "fulfilled") {
        message = smsResult.value.data.message;
      } /*else if (whatsappResult.status === "fulfilled") {
        message = whatsappResult.value.data.message;
      }*/
      //let message = dbResponse?.message || "Complain submitted successfully";
      toast.success(message || "Complain Submitted successfully");
      // Send Complain to IT Personnel based on domain : IT||Voice||Cable-TV||PC //
      /*SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });*/
      onSuccess();
      resetForm();
      // trigger to modal off //
      modStat();
    } catch (error) {
      console.error(error);
      /*SweetSwal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Unable to submit complaint. Please try again.",
      });*/
      toast.error("Unable to submit complaint,Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={complainDetails}
      onSubmit={handleComplain}
      validationSchema={validation}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <Container style={{ backgroundColor: "#F8F3E1" }}>
            <Row>
              <Col className="text-3xl text-center font-serif text-blue-600 font-bold m-1">
                Enter User Complain
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Date"
                  name="date"
                  format={"DD/MM/YYY"}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: { shrink: true, style: { color: "blue" } },
                  }}
                  sx={customComplainStyle}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  name="domain"
                  as={TextField}
                  select
                  label="IT-Domain"
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("domain", e.target.value);
                    setFieldValue("type", ""); // reset state when country changes
                  }}
                  sx={{ ...customComplainStyle, mb: 2 }}
                  onBlur={handleBlur}
                  error={touched.domain && Boolean(errors.domain)}
                  helperText={touched.domain && errors.domain}
                >
                  {Object.keys(domains).map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Field>

                <Field
                  name="type"
                  as={TextField}
                  select
                  label="Problem Type"
                  fullWidth
                  disabled={!values.domain}
                  onBlur={handleBlur}
                  error={touched.type && Boolean(errors.type)}
                  helperText={touched.type && errors.type}
                  sx={{ ...customComplainStyle, mb: 2 }}
                >
                  {(domains[values.domain] || []).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Specify Complain If Needed"
                  name="complain"
                  value={values.complain}
                  onChange={handleChange}
                  multiline
                  rows={3} // Sets the initial height to 4 rows
                  variant="outlined" // Can also use "filled" or "standard"
                  margin="normal"
                  size="small"
                  fullWidth
                  sx={customComplainStyle}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <TextField
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={customComplainStyle}
                />
              </Col>
            </Row>
            <Col>
              <TextField
                label="Designation"
                variant="outlined"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                margin="normal"
                fullWidth
                onBlur={handleBlur}
                error={touched.designation && Boolean(errors.designation)}
                helperText={touched.designation && errors.designation}
                sx={customComplainStyle}
              />
            </Col>
            <Row>
              <Col>
                <TextField
                  select
                  label="Select Department"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.department && Boolean(errors.department)}
                  helperText={touched.department && errors.department}
                  sx={customComplainStyle}
                >
                  {departments.map((dept, index) => {
                    return (
                      <MenuItem key={index} value={dept.toLowerCase()}>
                        {dept}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Room No"
                  variant="outlined"
                  name="room"
                  value={values.room}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  onBlur={handleBlur}
                  error={touched.room && Boolean(errors.room)}
                  helperText={touched.room && errors.room}
                  sx={customComplainStyle}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Contact:Calling Number"
                  variant="outlined"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  onBlur={handleBlur}
                  error={touched.contact && Boolean(errors.contact)}
                  helperText={touched.contact && errors.contact}
                  sx={customComplainStyle}
                />
              </Col>
            </Row>
            <Row className="flex justify-content-center">
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{ width: "200px", mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ComplainForm;
