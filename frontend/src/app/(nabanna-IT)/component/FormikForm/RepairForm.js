import { Box, Modal, Button, Typography, Label } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import "../CSS/FormikForm.css";
import * as Yup from "yup";
import { toast } from "react-toastify";
const RepairForm = ({ edit_id, modStat, refreshData }) => {
  const axios = useAxios();
  const repairData = {
    repairDate: "",
    repairPart: "",
    otherRepairPart: "", // TEMP only
    priceValue: "",
    remarks: "",
  };

  const machineParts = [
    "SSD",
    "HDD",
    "Motherboard",
    "RAM",
    "SMPS",
    "UPS",
    "Processor",
    "UPS Battery",
    "CMOS Battery",
    "Mouse",
    "Keyboard",
    "Speaker",
    "Graphics Card",
    "Laptop Battery",
    "Monitor",
    "Powercable",
    "Printer-Parts",
  ];
  const validationRepairForm = Yup.object().shape({
    repairDate: Yup.date().required("Date is Required !"),
    repairPart: Yup.string().required("Select Any Parts"),
    priceValue: Yup.number().required("Please mention Price"),
  });

  const handleRepairDetails = async (values, { resetForm, setSubmitting }) => {
    const payload = {
      ...values,
      repairPart:
        values.repairPart === "OTHER"
          ? values.otherRepairPart
          : values.repairPart,
    };
    delete payload.otherRepairPart; // ❌ not needed in DB
    //console.log(payload)
    //return alert("submit")
    try {
      const response = await axios.put(
        `/NabannaSystem/e-repair/${edit_id}`,
        payload,
      );

      toast.success(response.data?.message || "Updated");

      refreshData(); // 🔥 INSTANT TABLE UPDATE

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
      initialValues={repairData}
      onSubmit={handleRepairDetails}
      validationSchema={validationRepairForm}
    >
      {({ values, field, form, setFieldValue, isSubmitting }) => (
        <Form className="editMachineForm w-[400px]">
          <Container>
            <Row>
              <Col className="text-center text-blue-700 text-3xl font-semibold">
                Update System Repair
              </Col>
            </Row>

            <Row>
              <Col md={4}>Repair Done :</Col>
              <Col md={8}>
                <Field
                  type="date"
                  name="repairDate"
                  className="border-1 border-black rounded"
                />
                <ErrorMessage
                  name="repairDate"
                  component="div"
                  style={{ fontSize: "12px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>Reparir Parts:</Col>
              <Col md={8}>
                <Field
                  as="select"
                  name="repairPart"
                  className="input border-1 border-black"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("repairPart", value);
                    if (value !== "OTHER") {
                      setFieldValue("otherRepairPart", "");
                    }
                  }}
                >
                  <option value="">Select Parts</option>
                  {machineParts.map((part, i) => (
                    <option key={i} value={part}>
                      {part}
                    </option>
                  ))}
                  <option value="OTHER">Others</option>
                </Field>
                <ErrorMessage
                  name="repairPart"
                  component="div"
                  style={{ fontSize: "12px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            {values.repairPart === "OTHER" && (
              <Row>
                <Col md={4}>Specify Part:</Col>
                <Col>
                  <Field
                    name="otherRepairPart"
                    placeholder="Enter Repair Part"
                    className="border-1 border-black rounded w-full"
                  />
                </Col>
              </Row>
            )}
            <Row>
              <Col md={4}>Repair Cost :</Col>
              <Col md={8}>
                <div className="flex items-center border border-black rounded px-2">
                  <span className="font-semibold text-gray-700">₹</span>
                  <Field
                    type="number"
                    name="priceValue"
                    min="0"
                    className="flex-1 outline-none ml-2"
                    placeholder="Repair Cost"
                  />
                </div>
                <ErrorMessage
                  name="priceValue"
                  component="div"
                  style={{ fontSize: "12px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>Remarks:</Col>
              <Col md={8} className="flex">
                <Field
                  as="textarea"
                  name="remarks"
                  style={{ width: "100%", boxSizing: "border-box" }}
                  className="border-1 border-black rounded"
                />
              </Col>
            </Row>
            <Row className="justify-center">
              <Col md={6} className="flex justify-center">
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  className="w-[200px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default RepairForm;
