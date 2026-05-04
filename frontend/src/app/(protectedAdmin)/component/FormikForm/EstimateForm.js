import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
//import toast from 'react-hot-toast'; // Import the toast function
import { toast } from "react-toastify";
import { customComplainStyle } from "./TextFieldStyle";
import "./Form.css";
import { useRouter } from "next/navigation";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import { handleAxiosError } from "@/app/utils/axiosError";

import {
  TextField,
  InputLabel,
  MenuItem,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useAxios } from "@/app/Hook/useAxios";

import { Label } from "reactstrap";

// ADD ESTIMATE FORM //
export const NabannaEstimateForm = ({ modStat }) => {
  const axios = useAxios();
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
    //apprv_copy: null,
    status: "Pending",
    remarks: "none",
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
  const validation = Yup.object().shape({
    memo: Yup.number().required("Memo is required!"),
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
      .required("Requistion Copy is required!")
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image"),
      )
      .test(
        "is-valid-size",
        "Max allowed size is 10MB",
        (value) => value && value.size <= MAX_FILE_SIZE,
      ),
  });
  const router = useRouter();
  const handleEstimateNabanna = async (
    values,
    { resetForm, setSubmitting },
  ) => {
    //console.log(values);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    try {
      const response = await axios.post("/estimateReg", formData);
      //console.log(response);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();
      modStat();
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
        <Form style={{ backgroundColor: "#FFECC0" }}>
          <Container>
            <Row>
              <Col className="text-3xl text-center font-serif text-blue-600 font-bold m-1">
                Enter Estimate Details
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Memo No"
                  variant="outlined"
                  name="memo"
                  value={values.memo}
                  onChange={handleChange}
                  margin="normal"
                  size="small"
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.memo && Boolean(errors.memo)}
                  helperText={touched.memo && errors.memo}
                />
              </Col>
              <Col>
                <TextField
                  label="Date"
                  name="date"
                  format={"DD/MM/YYY"}
                  margin="normal"
                  size="small"
                  fullWidth
                  variant="outlined"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: { shrink: true, style: { color: "blue" } },
                  }}
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Col>
              <Col>
                <TextField
                  type="file"
                  name="est_copy"
                  label="Upload Estimate"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setFieldValue("est_copy", e.currentTarget.files[0])
                  }
                  slotProps={{
                    inputLabel: { shrink: true, style: { color: "blue" } },
                  }}
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.est_copy && Boolean(errors.est_copy)}
                  helperText={touched.est_copy && errors.est_copy}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Work Name"
                  variant="outlined"
                  name="work_name"
                  value={values.work_name}
                  onChange={handleChange}
                  margin="normal"
                  size="normal"
                  fullWidth
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.work_name && Boolean(errors.work_name)}
                  helperText={touched.work_name && errors.work_name}
                />
              </Col>
              <Col>
                <TextField
                  label="Estimate Cost ₹"
                  variant="outlined"
                  name="cost"
                  value={values.cost}
                  onChange={handleChange}
                  margin="normal"
                  size="normal"
                  fullWidth
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.cost && Boolean(errors.cost)}
                  helperText={touched.cost && errors.cost}
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
                  fullWidth
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.department && Boolean(errors.department)}
                  helperText={touched.department && errors.department}
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
                  label="Room No"
                  variant="outlined"
                  name="room"
                  value={values.room}
                  onChange={handleChange}
                  margin="normal"
                  size="small"
                  fullWidth
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.room && Boolean(errors.room)}
                  helperText={touched.room && errors.room}
                />
              </Col>
              <Col>
                <TextField
                  type="file"
                  name="req_letter"
                  label="Requisition Letter"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setFieldValue("req_letter", e.currentTarget.files[0])
                  }
                  slotProps={{
                    inputLabel: { shrink: true, style: { color: "blue" } },
                  }}
                  sx={customComplainStyle}
                  onBlur={handleBlur}
                  error={touched.req_letter && Boolean(errors.req_letter)}
                  helperText={touched.req_letter && errors.req_letter}
                />
              </Col>
            </Row>
            <Row className="flex justify-content-center">
              <Button
                variant="contained"
                color="error"
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

// EDIT ESTIMATE WORK STATUS & UPLOAD APPROVAL //

export const EditNabannaEstimateForm = ({ editData, modStat,onRefresh }) => {
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
    //console.log(values);
    const { status, remarks } = values;
    /*const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }*/
    try {
      const response = await axios.put(
        //`http://10.10.119.160:5000/api/estimateReg/update/${_id}`,
        `/estimateReg/update/${_id}`,
        { status, remarks },
      );
      //console.log(response);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      //router.push("/dashboard/estimate");
      onRefresh()
      resetForm();
      modStat();
    } catch (error) {
      //console.error(error);
      /*SweetSwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });*/
      toast.error("Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={primaryEditValue} onSubmit={handleEditEstimate}>
      {({ values, setFieldValue }) => (
        <Form className="estimateEdit">
          <Container>
            <Row>
              <Col className="text-3xl text-center font-bold text-blue-600 mb-2">
                Edit Nabanna Estimate
              </Col>
            </Row>
            <Row>
              <Col md={4}>Project Name :</Col>
              <Col className="font-semibold">{values.work_name}</Col>
            </Row>

            <Row>
              <Col md={4}>Work Status:</Col>
              <Col>
                {WorkStatus.map((s, i) => {
                  return (
                    <span className="m-2" key={i}>
                      <Label>{s} &nbsp;</Label>
                      <Field type="radio" name="status" value={s} />
                    </span>
                  );
                })}
              </Col>
            </Row>
            <Row>
              <Col md={4}>Remarks :</Col>
              <Col>
                <Field
                  as="textarea"
                  name="remarks"
                  className="border-1 border-black rounded-2 w-[300px]"
                />
              </Col>
            </Row>
            <Row className="flex justify-content-center">
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{ width: "200px", margin: "5px" }}
              >
                Update
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

// UPLOAD ESTIMATE CHALLAN //

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

  const FILE_SIZE = 1048576; // 1MB
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const challanValidation = Yup.object().shape({
    chl_date: Yup.date().required("Mention Challan Incoming Date!"),
    memo: Yup.number().required("Memo No is required! ** Important"),
    nit_no: Yup.string().required("NIT/Acceptance No is required!"),
    agency: Yup.string().required("Select Working Agency !"),
    work_order: Yup.mixed()
      .required("Work Order is required!")
      .nullable() // Allows null values

      .test("fileSize", "File size too large, max size is 1MB", (value) => {
        // Check if value is null/undefined before checking size
        return value === null || (value && value.size <= FILE_SIZE);
      })
      .test("fileFormat", "Unsupported file type", (value) => {
        // Check if value is null/undefined before checking type
        return (
          value === null || (value && SUPPORTED_FORMATS.includes(value.type))
        );
      }),
  });
  const handleChallan = async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    const formData = new FormData();
    /*for (const key in values) {
      formData.append(key, values[key]);
    }*/
    formData.append("chl_date", values.chl_date);
    formData.append("memo", values.memo);
    formData.append("nit_no", values.nit_no);
    formData.append("agency", values.agency);
    formData.append("work_order", values.work_order);

    // append files(img) correctly
    if (Array.isArray(values.challan_img)) {
      values.challan_img.forEach((file) => {
        formData.append("challan_img", file);
      });
    }
    //return alert('data sending ...')
    try {
      const response = await axios.patch(
        //"http://10.10.119.160:5000/api/estimateReg/challan",
        "/estimateReg/challan",
        formData,
      );
      //console.log(response);
      toast.success(response.data.message || "Upload Successfull");
      /*if (response.status === 200) {
        SweetSwal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }*/
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
        <Form className="estChallan">
          <Container>
            <Row>
              <Col className="text-3xl text-center font-bold text-blue-600 mb-2">
                UPLOAD ESTIMATED ITEM CHALLAN
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label>Challan Date :</label>
              </Col>
              <Col md={8}>
                <Field
                  type="date"
                  name="chl_date"
                  onChange={handleChange}
                  className="border-1 border-black"
                />
                <ErrorMessage
                  name="chl_date"
                  component="div"
                  style={{ fontSize: "16px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label htmlFor="">Memo No:</label>
              </Col>
              <Col md={8}>
                <Field
                  name="memo"
                  placeholder="Estimate Memo"
                  onChange={handleChange}
                  className="border-1 border-black"
                />
                <ErrorMessage
                  name="memo"
                  component="div"
                  style={{ fontSize: "16px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label htmlFor="">Tender No:</label>
              </Col>
              <Col md={8}>
                <Field
                  name="nit_no"
                  placeholder="NIT/Acceptance No"
                  onChange={handleChange}
                  className="border-1 border-black"
                />
                <ErrorMessage
                  name="nit_no"
                  component="div"
                  style={{ fontSize: "16px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label htmlFor="">Select Agency :</label>
              </Col>
              <Col md={8}>
                <Field
                  as="select"
                  name="agency"
                  className="border-1 border-black"
                >
                  <option value="">Select Challan Sender</option>
                  {sender.map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="agency"
                  component="div"
                  style={{ fontSize: "16px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <label htmlFor="">Upload Work-Order :</label>
              </Col>
              <Col md={8}>
                <input
                  type="file"
                  name="work_order"
                  onChange={(e) =>
                    setFieldValue("work_order", e.currentTarget.files[0])
                  }
                  className="border-1 border-black w-[300px]"
                />
                <ErrorMessage
                  name="work_order"
                  component="div"
                  style={{ fontSize: "16px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <label htmlFor="">Upload Challan :</label>
              </Col>
              <Col md={8}>
                <FieldArray name="challan_img">
                  {({ push, remove }) => (
                    <div className=" flex flex-column justify-center items-center">
                      {values.challan_img.map((file, index) => (
                        <div
                          key={index}
                          style={{ marginBottom: 10, display: "flex" }}
                        >
                          <input
                            type="file"
                            className="border-1 border-black w-[300px]"
                            onChange={(event) => {
                              const selectedFile =
                                event.currentTarget.files?.[0] || null;
                              setFieldValue(
                                `challan_img.${index}`,
                                selectedFile,
                              );
                            }}
                          />

                          {file && <span>{file.name}</span>}

                          <button type="button" onClick={() => remove(index)}>
                            <RiDeleteBack2Fill
                              style={{
                                color: "red",
                                marginLeft: 4,
                                fontSize: "30px",
                              }}
                            />
                          </button>
                          <button type="button" onClick={() => push(null)}>
                            <MdOutlineAddCircle
                              style={{ color: "green", fontSize: "30px" }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </Col>
            </Row>
            <Row className="flex justify-content-center">
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{ width: "200px", m: 1 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload"}
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};
