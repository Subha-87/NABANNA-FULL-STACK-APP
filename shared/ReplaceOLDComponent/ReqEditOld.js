import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import { TextField, InputLabel, MenuItem } from "@mui/material";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Label } from "reactstrap";
import { Button } from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { useState } from "react";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { customStyle } from "./TextFieldStyle";
import { toast } from "react-toastify";

const ReqEditForm = ({ editReqInfo, modStat, onRefresh }) => {
  const axios = useAxios();
  const WorkStatus = ["Pending", "In Progress", "Complete"];
  const handleEditSubmit = async (values, { resetForm, setSubmitting }) => {
    const { _id, remarks, status } = values;
    //console.log(values)
    try {
      const response = await axios.put(`/ItReq/editRemarks/${_id}`, {
        remarks,
        status,
      });
      toast.success(response.data.message || "Updated");

      onRefresh();
      resetForm();
      modStat();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={editReqInfo} onSubmit={handleEditSubmit}>
      {({ values, handleChange, isSubmitting }) => (
        <Form
          className="text-xl font-semibold border-3 border-primary rounded p-3"
          style={{ backgroundColor: "#FFF0DB" }}
        >
          <Container>
            <Row>
              <Col className="text-3xl text-center font-bold text-blue-600 mb-2">
                Edit User Requistion Status
              </Col>{" "}
            </Row>
            <Row>
              <Col>Letter Date:</Col>
              <Col> {new Date(values.date).toLocaleDateString()}</Col>
            </Row>
            <Row>
              <Col>Letter For:</Col>
              <Col> {values.lcategory}</Col>
            </Row>
            <Row>
              <Col>Username :</Col>
              <Col>{values.username}</Col>
            </Row>
            <Row>
              <Col>Designation :</Col>
              <Col>{values.designation}</Col>
            </Row>
            <Row>
              <Col>Department :</Col>
              <Col>{values.department}</Col>
            </Row>
            <Row>
              <Col>Contact :</Col>
              <Col>{values.contact}</Col>
            </Row>

            <Row className="justify-center">
              <Col md={6}>
                <TextField
                  label="Remarks"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="remarks"
                  value={values.remarks}
                  onChange={handleChange}
                  sx={{ ...customStyle, width: "300px" }}
                />
              </Col>
            </Row>
            <Row className="justify-center">
              <Col>
                <div className="mt-2 font-semibold font-serif">
                  <Label>Work Status:</Label>
                  {WorkStatus.map((s, i) => {
                    return (
                      <span className="m-2" key={i}>
                        <Label>{s} &nbsp;</Label>
                        <Field type="radio" name="status" value={s} />
                      </span>
                    );
                  })}
                </div>
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
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ReqEditForm;
