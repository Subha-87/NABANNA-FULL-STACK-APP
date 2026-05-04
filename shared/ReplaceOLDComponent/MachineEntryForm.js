import { Box, Modal, Button, Typography, Label } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { MdDeleteForever } from "react-icons/md";
import { handleAxiosError } from "@/app/utils/axiosError";
import AddIcon from "@mui/icons-material/Add";

import "../CSS/FormikForm.css";
import * as Yup from "yup";
import { toast } from "react-toastify";

const MachineEntry = ({ onSuccess, modStat }) => {
  const axios = useAxios();
  const [floors, setFloors] = useState([]);
  const departmentFloorMap = {
    PWD: ["Ground Floor", "1st Floor", "8th Floor"],
    CMO: ["Nabanna South Entry", "Ground FLoor", "13th Floor", "14th Floor"],
    Misc: ["Ground Floor", "1st Floor"],
  };
  const MACHINE_TYPES = [
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
    // 🔑 NEW FIELD
    warrantyType: "WARRANTY", // or "AMC"

    // installation date
    date: "",
    supplier: "",
    machineDetails: [
      {
        name: "",
        model: "",
        make: "",
        serial: [""],
      },
    ],
  };

  const machineSchema = Yup.object().shape({
    name: Yup.string().required("System type is required"),

    //model: Yup.string().required("Model is required"), no needed //

    make: Yup.string().required("Make is required"),

    /*serial: Yup.array()
      .of(Yup.string().required("Serial required"))
      .min(1, "At least one serial required"),*/
  });

  const validationSystemEntry = Yup.object().shape({
    department: Yup.string().required("Mention Any Department !"),
    floor: Yup.string().required("Select Floor"),
    office: Yup.string().required("Mention Office Name!"),
    //date: Yup.date().required("Installation Date is Must !!"),
    date: Yup.date().when("warrantyType", {
      is: "WARRANTY",
      then: (schema) => schema.required("Installation Date is Must !!"),
      otherwise: (schema) => schema.notRequired(),
    }),
    //supplier: Yup.string().required("Choose Supplier!"),
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
    //console.log(values);
    //return alert('submitted')
    try {
      const resp = await axios.post("/NabannaSystem", values);
      const success_msg = resp.data?.message || "Entry Successfull";
      SweetSwal.fire({
        title: success_msg,
        icon: "success",
        draggable: true,
      });
      onSuccess(); // 🔥 notify parent // instant refelct on data table //
      resetForm();
      modStat();
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={baseSystemData}
      onSubmit={handleMachineEntry}
      validationSchema={validationSystemEntry}
    >
      {({ values, setFieldValue, handleChange, isSubmitting }) => (
        <Form className="w-[900px] Machine">
          <div
            className="flex justify-center items-center h-[60px]"
            style={{ backgroundColor: "#1A2CA3" }}
          >
            <span className="text-3xl font-semibold text-white text-center">
              Enter Nabanna User Machine Details
            </span>
          </div>
          <Container className="mt-2">
            <Row>
              <Col md={2}>Employee Name:</Col>
              <Col md={3}>
                <Field name="username" placeholder="Enter Name" />
              </Col>
              <Col md={2}>Designation:</Col>
              <Col md={4}>
                <Field name="rank" placeholder="Enter Rank" />
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Department Dropdown */}
                <Field
                  as="select"
                  name="department"
                  onChange={(e) => {
                    const department = e.target.value;
                    setFieldValue("department", department);
                    setFieldValue("floor", ""); // reset floor
                    setFloors(departmentFloorMap[department] || []);
                  }}
                >
                  <option value="">Select Department</option>
                  {Object.keys(departmentFloorMap).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  style={{ fontSize: "12px" }}
                  className="text-danger text-center font-semibold"
                />
              </Col>
              <Col>
                {/* Floor Dropdown */}
                <Field as="select" name="floor" disabled={!floors.length}>
                  <option value="">Select Floor</option>
                  {floors.map((floor) => (
                    <option key={floor} value={floor}>
                      {floor}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="floor"
                  component="div"
                  style={{ fontSize: "12px" }}
                  className="text-danger text-center font-semibold"
                />
              </Col>
              <Col>
                <Field placeholder="Office Name" name="office" />
                <ErrorMessage
                  name="office"
                  component="div"
                  style={{ fontSize: "12px" }}
                  className="text-danger text-center font-semibold"
                />
              </Col>
              <Col>
                <Field placeholder="Room No" name="room" />
              </Col>
            </Row>
            <Row>
              <Col md={2}>Warranty Type :</Col>
              <Col md={3}>
                <Field
                  as="select"
                  name="warrantyType"
                  className="input border-1 border-black"
                >
                  <option value="WARRANTY">Under Warranty</option>
                  <option value="AMC">AMC / Old Machine</option>
                </Field>
              </Col>

              {values.warrantyType === "WARRANTY" && (
                <>
                  <Col md={2}>Installation Date:</Col>
                  <Col md={2}>
                    <Field type="date" name="date" className="input" />
                    <ErrorMessage
                      name="date"
                      component="div"
                      style={{ fontSize: "12px" }}
                      className="text-danger font-semibold"
                    />
                  </Col>
                  <Col md={3}>
                    <Field
                      as="select"
                      name="supplier"
                      className="input border-1 border-black"
                    >
                      <option>Select Supplier</option>
                      {vendor.map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="supplier"
                      component="div"
                      style={{ fontSize: "12px" }}
                      className="text-danger text-center font-semibold"
                    />
                  </Col>
                </>
              )}
            </Row>
            <Row>
              <FieldArray name="machineDetails">
                {({ push, remove }) => (
                  <div className="flex flex-column m-3">
                    <div className="flex justify-center">
                      <Button
                        onClick={() =>
                          push({
                            name: "",
                            model: "",
                            make: "",
                            serial: [""],
                          })
                        }
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                      >
                        ADD DETAILS
                      </Button>
                    </div>
                    {values.machineDetails.map((machine, index) => {
                      const selectedSystems = values.machineDetails.map(
                        (m) => m.name,
                      );
                      return (
                        <div
                          key={index}
                          className="flex flex-start justify-evenly items-center m-1 p-2 systemClass"
                        >
                          <span className="mr-1">{index + 1}.</span>
                          {/* 🔽 Machine Type Dropdown */}
                          <div>
                            <Field
                              as="select"
                              name={`machineDetails.${index}.name`}
                              className="border p-1 rounded"
                            >
                              <option value="">Select System</option>
                              {MACHINE_TYPES.map((type) => (
                                <option
                                  key={type}
                                  value={type}
                                  disabled={
                                    selectedSystems.includes(type) &&
                                    machine.name !== type
                                  }
                                >
                                  {type}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={`machineDetails.${index}.name`}
                              component="div"
                              className="text-red-600 text-center text-xs"
                            />
                          </div>
                          <div>
                            <Field
                              name={`machineDetails.${index}.model`}
                              placeholder="Model"
                            />
                          </div>
                          <div>
                            <Field
                              name={`machineDetails.${index}.make`}
                              placeholder="Make"
                            />
                            <ErrorMessage
                              name={`machineDetails.${index}.make`}
                              component="div"
                              className="text-red-600 text-center text-xs"
                            />
                          </div>
                          {machine.name === "CPU" ? (
                            <FieldArray name={`machineDetails.${index}.serial`}>
                              {({ push, remove }) => (
                                <div>
                                  {machine.serial.map((s, i) => (
                                    <div key={i} className="flex items-center">
                                      <Field
                                        name={`machineDetails.${index}.serial.${i}`}
                                        placeholder="Serial No"
                                      />

                                      {i > 0 && (
                                        <MdDeleteForever
                                          onClick={() => remove(i)}
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                          }}
                                        />
                                      )}
                                    </div>
                                  ))}

                                  <button
                                    type="button"
                                    onClick={() => push("")}
                                    startIcon={<AddIcon />}
                                  >
                                    Add Serial
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          ) : (
                            // 🔥 SINGLE SERIAL INPUT
                            <Field
                              name={`machineDetails.${index}.serial`}
                              placeholder="Serial No"
                            />
                          )}

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
                )}
              </FieldArray>
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

export default MachineEntry;
