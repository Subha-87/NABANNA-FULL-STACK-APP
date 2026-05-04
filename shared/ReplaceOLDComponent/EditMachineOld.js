import {
  Box,
  Modal,
  Button,
  Typography,
  Label,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
//import axios from "axios";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";
import "../CSS/FormikForm.css";

const EditMachine = ({ editData, modStat, refreshData }) => {
  //console.log(editData.remainingWarranty);
  //console.log(editData);
  const { department, designation, employeeName, floor, office, roomNo } =
    editData;
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
  //console.log(getDerivedAmcStatus(editData));
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
        editableData,
      );

      toast.success(response.data?.message || "Updated");
      refreshData();
      resetForm();
      modStat();
    } catch (error) {
      //console.log(error);
      const { generarlError } = handleAxiosError(error);
      toast.error(generarlError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={editData} onSubmit={handleEditSystem}>
      {({ values, handleChange, setFieldValue, isSubmitting }) => (
        <Form className="editMachineForm w-[600px]">
          <Container>
            <Row>
              <Col className="text-center text-blue-700 text-3xl font-semibold">
                Update Nabanna System Status
              </Col>
            </Row>
            <Row>
              <div className="flex justify-between items-center department mb-3">
                User : <Field name="employeeName" />
                Rank: <Field name="designation" />
                <label>Department:</label>
                <Field name="department" />
              </div>
              <div className="flex justify-between items-center department">
                <label>Office:</label>
                <Field name="office" />
                <label>Floor:</label>
                <Field name="floor" />
                Room No:
                <Field name="roomNo" />
              </div>
            </Row>

            {(getDerivedAmcStatus(values) === "REQUIRED" ||
              getDerivedAmcStatus(values) === "ON") && (
              <Row>
                <Col className="flex justify-center">
                  <FormGroup>
                    {" "}
                    <FormControlLabel
                      label="Activate AMC"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontWeight: "bold",
                          fontFamily: "serif",
                          color: "#991b1b", // red-800
                          fontSize: "20px",
                        },
                      }}
                      control={
                        <Switch
                          checked={values.amcStatus === "ON"}
                          disabled={getDerivedAmcStatus(values) === "ON"}
                          onChange={(e) =>
                            setFieldValue(
                              "amcStatus",
                              e.target.checked ? "ON" : "NONE",
                            )
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#16a34a", // thumb color (green)
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: "#22c55e",
                              },
                            "& .MuiSwitch-track": {
                              backgroundColor: "#dc2626", // OFF (red)
                            },
                          }}
                        />
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}

            <Row>
              <Col md={4}>System Condition :</Col>
              <Col md={8}>
                <div className="mt-2 font-semibold font-serif">
                  {systemCondition.map((s, i) => {
                    return (
                      <span className="m-2" key={i}>
                        <label>{s} &nbsp;</label>
                        <Field type="radio" name="systemCondition" value={s} />
                      </span>
                    );
                  })}
                </div>
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

export default EditMachine;
