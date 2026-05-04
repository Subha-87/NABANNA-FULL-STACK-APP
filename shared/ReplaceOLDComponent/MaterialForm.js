import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import { TextField, InputLabel, MenuItem } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { Label } from "reactstrap";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdDeleteForever } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";

//import axiosInstance from "../AxiosInstance/ItemInstance";

import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import "./Form.css";
import { customStyle } from "./TextFieldStyle";
import * as Yup from "yup";
import { toast } from "react-toastify";

//;
const MaterialForm = ({ modStat, onSuccess }) => {
  const axios = useAxios();
  const formInitialValues = {
    date: "",
    sender: "",
    customSender: "",
    challan: "",
    itItems: [
      {
        item: "",
        model: "",
        make: "",
        qty: 0,
        serial: "",
      },
    ],
    stock: "",
    allocation: "",
    room: "",
    remarks: "",
  };
  const itemSenders = [
    "Writers Building(IT)",
    "Pascal Computer",
    "Consulting Technologies",
    "Compunet System",
    "Prakash Electricals",
    "Aircon",
    "Iris System",
    "Embee",
    "Others",
  ];
  const stockStatus = ["YES", "NO"];
  const CustomSelect = () => {
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
      if (values.sender !== "others") {
        setFieldValue("customSender", ""); // --?
      }
    }, [values.sender, setFieldValue]);
    return null;
  };
  const [itItemData, setItItemData] = useState([]);
  const validation = Yup.object().shape({
    date: Yup.date().required("Date is required!"),
    sender: Yup.string().required("Select Sender!"),
    //customSender: Yup.string().required("Select Sender!"),
    challan: Yup.string().required("Challan is required!"),
    allocation: Yup.string().required("No Blank Field"),
    //room: Yup.string().required("Room No is required!"), not required
  });

  const handleItemSubmit = async (values, action) => {
    const { sender, customSender } = values;
    const { resetForm, setSubmitting } = action;

    values.sender = sender != "others" ? sender : customSender;

    try {
      //const response = await axiosInstance.post("/itemNabanna/incoming",values)// why not working //

      const response = await axios.post("/itemNabanna/incoming", values);

      //console.log(response);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      //setItItemData([...itItemData, response.data.data]); // <- Reflect Updated data on Display Table //? is it working ?
      onSuccess(); // instant refresh page //
      resetForm();
      modStat(true);
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validation}
      onSubmit={handleItemSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        handleBlur,
        touched,
        isSubmitting,
      }) => (
        <Form
          className="border-1 border-black m-1 p-3 rounded"
          style={{ backgroundColor: "#FFF0DB" }}
        >
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
            <Col>
              <CustomSelect />
              <TextField
                select
                label="Select Sender"
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth="true"
                name="sender"
                value={values.sender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sender && Boolean(errors.sender)}
                helperText={touched.sender && errors.sender}
                sx={customStyle}
              >
                {itemSenders.map((vendor, index) => {
                  return (
                    <MenuItem key={index} value={vendor.toLowerCase()}>
                      {vendor}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Col>

            {values.sender === "others" && (
              <Col>
                <TextField
                  label="Mention Agency"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  name="customSender"
                  fullWidth="true"
                  value={values.customSender}
                  onChange={handleChange}
                  sx={customStyle}
                  //onBlur={handleBlur}
                  //error={touched.customSender && Boolean(errors.customSender)}
                  //helperText={touched.customSender && errors.customSender}
                />
              </Col>
            )}

            <Col>
              <TextField
                size="small"
                label="Challan No"
                name="challan"
                value={values.challan}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                sx={customStyle}
                onBlur={handleBlur}
                error={touched.challan && Boolean(errors.challan)}
                helperText={touched.challan && errors.challan}
              />
            </Col>
          </Row>
          <Row>
            <FieldArray name="itItems">
              {({ push, remove }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "3px",
                    }}
                  >
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => push("")}
                      >
                        ADD DETAILS
                      </Button>
                    </div>

                    {values.itItems.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="itemAddClass"
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            margin: "3px",
                          }}
                        >
                          <span className="mr-1">{index + 1}.</span>
                          <Field
                            name={`itItems.${index}.item`}
                            placeholder="Enter Item"
                          />

                          <Field
                            name={`itItems.${index}.model`}
                            placeholder="Enter Model"
                          />

                          <Field
                            name={`itItems.${index}.make`}
                            placeholder="Model Make"
                          />
                          <Label>Qty:</Label>
                          <Field
                            type="number"
                            min="0"
                            max="20"
                            name={`itItems.${index}.qty`}
                            style={{ width: "50px" }}
                          />

                          <Field
                            name={`itItems.${index}.serial`}
                            placeholder="Serial No"
                          />
                          {index > 0 && (
                            //<DeleteIcon onClick={() => remove(index)} />
                            <MdDeleteForever
                              style={{ color: "red", fontSize: "28px" }}
                              onClick={() => remove(index)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
          </Row>
          <Row>
            <Col className=" align-content-center font-semibold font-serif">
              <Label>Stock IT:</Label>
              {stockStatus.map((s, i) => {
                return (
                  <span className="m-1" key={i}>
                    <Label>{s} &nbsp;</Label>
                    <Field type="radio" name="stock" value={s} />
                  </span>
                );
              })}
            </Col>

            <Col>
              <TextField
                label="Allocation"
                variant="outlined"
                name="allocation"
                value={values.allocation}
                onChange={handleChange}
                margin="normal"
                size="small"
                fullWidth="true"
                sx={customStyle}
                onBlur={handleBlur}
                error={touched.allocation && Boolean(errors.allocation)}
                helperText={touched.allocation && errors.allocation}
              />
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
                fullWidth="true"
                sx={customStyle}
                onBlur={handleBlur}
              />
            </Col>

            <Col>
              <TextField
                label="Remarks"
                variant="outlined"
                name="remarks"
                value={values.remarks}
                onChange={handleChange}
                margin="normal"
                size="small"
                fullWidth="true"
                sx={customStyle}
              />
            </Col>
          </Row>
          <Row style={{ height: "70px" }}>
            <Col className="text-center mt-3">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                style={{ marginRight: "10px" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                onClick={() => modStat(true)}
              >
                CLOSE
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default MaterialForm;
