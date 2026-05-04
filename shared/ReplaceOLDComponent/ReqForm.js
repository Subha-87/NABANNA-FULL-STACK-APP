import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { customStyle } from "./TextFieldStyle";
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
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";

import { Label } from "reactstrap";

import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import "./Form.css";
import { toast } from "react-toastify";

const RequisitionForm = ({ modStat, onPostData, onSuccess }) => {
  const axios = useAxios();
  const roles = ["Admin", "Editor", "Viewer"];
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
  const Letter = ["Internet", "Voice", "PC_Hardware", "Cable-TV", "Misc"];
  const [checked, setChecked] = useState(false);
  //const status = ['Pending', 'Complet']
  const primaryReqValue = {
    date: "",
    letter: null,
    username: "",
    designation: "",
    department: "",
    subgroup: "NA",
    lcategory: [],
    room: "",
    contact: "",
    status: "Pending",
  };
  const MAX_FILE_SIZE = 10240000; //10mb

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  }
  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required!"),
    letter: Yup.mixed()
      .required("Letter is required!")
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image"),
      )
      .test(
        "is-valid-size",
        "Max allowed size is 10MB",
        (value) => value && value.size <= MAX_FILE_SIZE,
      ),
    username: Yup.string().required("Name is required!"),
    designation: Yup.string().required("Rank is required!"),
    department: Yup.string().required("Select Any Department!"),
    lcategory: Yup.array()
      .min(1, "Select at least one option !")
      .required("Select at least one Type option"),
    room: Yup.string().required("Room No is required!"),
    contact: Yup.string().required("Contact is required!"),
  });
  const handleLetterReq = async (values, { resetForm, setSubmitting }) => {
    //console.log(values);

    const formData = new FormData();
    /*for (const key in values) {
      formData.append(key, values[key]);
    }*/
    for (const key in values) {
      if (key === "lcategory") {
        formData.append("lcategory", JSON.stringify(values.lcategory));
      } else {
        formData.append(key, values[key]);
      }
    }
    try {
      const response = await axios.post("/ItReq/sendReq", formData);
      //console.log(response);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.msg || "Letter saved successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      //onPostData(response.data.data);
      // Code next to instant reflect update on data table //
      onSuccess();
      resetForm();
      // Trigger Modal Close function //
      modStat(true);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={primaryReqValue}
      validationSchema={validationSchema}
      onSubmit={handleLetterReq}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        handleFile,
        errors,
        touched,
        handleBlur,
        isSubmitting,
      }) => (
        <Form
          className="border-4 border-primary rounded m-1 p-3"
          style={{ backgroundColor: "#FFF0DB" }}
        >
          <Container className="">
            <Row>
              <Col className="text-3xl text-center font-serif text-blue-600 font-bold m-1">
                Enter (Nabanna) Requisition Details
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Enter Date"
                  name="date"
                  format={"DD/MM/YYY"}
                  margin="normal"
                  size="small"
                  fullWidth="true"
                  variant="outlined"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: { shrink: true, style: { color: "blue" } },
                  }}
                  sx={customStyle}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Col>
              <Col className="d-flex">
                <TextField
                  type="file"
                  name="letter"
                  label="Upload File"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth="true"
                  onChange={(e) =>
                    setFieldValue("letter", e.currentTarget.files[0])
                  }
                  slotProps={{
                    inputLabel: { shrink: true, style: { color: "blue" } },
                  }}
                  sx={customStyle}
                  onBlur={handleBlur}
                  error={touched.letter && Boolean(errors.letter)}
                  helperText={touched.letter && errors.letter}
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
                  size="small"
                  fullWidth="true"
                  sx={customStyle}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Col>
              <Col>
                <TextField
                  label="Designation"
                  variant="outlined"
                  name="designation"
                  value={values.designation}
                  onChange={handleChange}
                  margin="normal"
                  size="small"
                  fullWidth="true"
                  sx={customStyle}
                  onBlur={handleBlur}
                  error={touched.designation && Boolean(errors.designation)}
                  helperText={touched.designation && errors.designation}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  select
                  label="Select Department"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth="true"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.department && Boolean(errors.department)}
                  helperText={touched.department && errors.department}
                  sx={{ ...customStyle, width: "225px" }}
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
              <Col>
                <TextField
                  label="Group/Cell"
                  variant="outlined"
                  name="subgroup"
                  value={values.subgroup}
                  onChange={handleChange}
                  margin="normal"
                  size="small"
                  fullWidth="true"
                  sx={customStyle}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className="flex flex-row">
                  <Label className="font-serif font-semibold">
                    Letter Type: &nbsp;
                  </Label>
                  {Letter.map((type, i) => {
                    return (
                      <span key={i} className="font-semibold flex font-serif">
                        <Label>{type} &nbsp;</Label>
                        <div className="mr-2">
                          <Field
                            type="checkbox"
                            name="lcategory"
                            value={type}
                            className="custom-field"
                          />
                        </div>
                      </span>
                    );
                  })}
                </FormGroup>
                <ErrorMessage
                  name="lcategory"
                  style={{ fontSize: "16px" }}
                  component="div"
                  className="text-danger text-center font-semibold"
                />
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
                  size="small"
                  fullWidth="true"
                  sx={customStyle}
                  onBlur={handleBlur}
                  error={touched.room && Boolean(errors.room)}
                  helperText={touched.room && errors.room}
                />
              </Col>
              <Col>
                <TextField
                  label="Contact"
                  variant="outlined"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                  margin="normal"
                  size="small"
                  fullWidth="true"
                  sx={customStyle}
                  onBlur={handleBlur}
                  error={touched.contact && Boolean(errors.contact)}
                  helperText={touched.contact && errors.contact}
                />
              </Col>
            </Row>

            <Row className="flex justify-content-center">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ width: "200px" }}
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

export default RequisitionForm;
