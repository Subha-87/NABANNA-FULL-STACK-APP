import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";

import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";

const TaskFormik = ({ rowTask, modalStat, onRefresh }) => {
  const axios = useAxios();
  const itLetter = [
    "Internet",
    "Voice",
    "Cable TV",
    "PC-Peripherals",
    "Conference",
    "Net & Voice",
  ];

  const taskOptions = {
    Internet: [
      "New LAN Connection",
      "New IP Allocation",
      "Wi-Fi Requirement",
      "Site Unrestriction",
      "IP Conflict",
    ],
    Voice: ["Telephone Connection", "New Telephone Set"],
    "PC-Peripherals": ["Computer Set", "Laptop", "Printer"],
    "Cable TV": ["Cable Connection", "Set Top Box"],
    Conference: ["Conference Setup", "Microphone Issue"],
    "Net & Voice": ["Lan & Telephone Connection"],
  };

  const itPersonnel = [
    "Joydeep Ghosh",
    "Suman Sarder",
    "Swagatam Dutta",
    "Shirshendu Mukherjee",
    "Partha Nag Choudhury",
    "Rittick Kumar Dey",
    "Debashis Halder",
    "Rajdeep Saha",
    "Baladeb Mukherjee",
    "Biplab Majumder",
  ];
  const priorityLevel = ["High", "Medium", "Low"];
  const newfieldValue = {
    itTask: "",
    lettertype: [],
    it_personnel: "",
    assignDate: "",
    p_level: "",
  };
  const primaryValue = { ...rowTask, ...newfieldValue };
  const validation = Yup.object().shape({
    itTask: Yup.string().required(" !Please Select Letter Type"),
    lettertype: Yup.array()
      .min(1, "Select at least one option !")
      .required("Select at least one option"),
    it_personnel: Yup.string().required("Choose IT-Personnel !!"),
    assignDate: Yup.date().required("Date is Required !!"),
    p_level: Yup.string().required("Select Priority Level !!"),
  });

  const TASK_API_MAP = {
    Internet: "/TaskData/netTask",
    Voice: "/voiceTask/setTask",
  };
  const handleSetTask = async (values, { resetForm, setSubmitting }) => {
    //console.log(values);

    const { it_personnel, itTask, _id } = values;
    //console.log({ selectName: it_personnel });

    try {
      let taskPromise = [];
      // Call Both APIs //
      if (itTask === "Net & Voice") {
        const netTaskValues = {
          ...values,
          it_personnel: "Suman Sarder",
        };

        const voiceTaskValues = {
          ...values,
          it_personnel: "Partha Nag Choudhury",
        };
        // call both APIs//
        taskPromise.push(
          axios.post("/TaskData/netTask", netTaskValues),
          axios.post("/voiceTask/setTask", voiceTaskValues),
        );
      } else {
        const apiUrl = TASK_API_MAP[itTask];
        if (!apiUrl) {
          throw new Error("Invalid Task Type");
        }
        taskPromise.push(axios.post(apiUrl, values));
      }

      // admin update always
      const adminPersonnel =
        itTask === "Net & Voice"
          ? "Suman Sarder & Partha Nag Choudhury"
          : it_personnel;
      const updatePromise = axios.put(`/ItReq/letterItpersonUpdate/${_id}`, {
        it_personnel: adminPersonnel,
      });

      const [taskResponse] = await Promise.all([...taskPromise, updatePromise]);
      SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: taskResponse.data?.message || "Task Assigned Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      onRefresh();
      resetForm();
      modalStat(true); // Trigger to modal close function pass to TaskModal.js//
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      /*const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to assign task";*/

      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={primaryValue}
      onSubmit={handleSetTask}
      //validationSchema={validation}//? need correction //
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form
          className="text-xl font-semibold border-3 border-primary rounded p-3"
          style={{ backgroundColor: "#FFF0DB" }}
        >
          <Container className="taskReAssign">
            <Row className="align-items-start mb-3">
              <Col md={4}>
                <label className="font-bold  text-blue-800">Letter For :</label>
              </Col>

              <Col>
                <Field
                  as="select"
                  name="itTask"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("itTask", value);
                    // reset task when letter type changes
                    setFieldValue("letterType", "");
                  }}
                >
                  <option value="">Select Type</option>
                  {itLetter.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="itTask"
                  component="div"
                  style={{ fontSize: "16px" }}
                  className="text-danger font-semibold"
                />
              </Col>
            </Row>
            {values.itTask && (
              <Row>
                <Col md={3}>
                  <label className="font-bold  text-blue-800">
                    Specified Task:
                  </label>
                </Col>
                <Col md={9}>
                  <div className="d-flex flex-wrap gap-3 border p-2 rounded">
                    {values.itTask &&
                      taskOptions[values.itTask]?.map((task, index) => (
                        <div key={index} className="form-check">
                          <Field
                            type="checkbox"
                            name="lettertype"
                            value={task}
                            className="form-check-input border border-dark"
                          />

                          <label className="form-check-label ms-1">
                            {task}
                          </label>
                        </div>
                      ))}
                  </div>
                  <ErrorMessage
                    name="lettertype"
                    style={{ fontSize: "16px" }}
                    component="div"
                    className="text-danger text-center font-semibold"
                  />
                </Col>
              </Row>
            )}

            <Row className="align-items-start mb-3">
              {values.itTask !== "Net & Voice" && (
                <>
                  <Col md={3}>
                    <label className="font-bold  text-blue-800">
                      Assign Task :
                    </label>
                  </Col>
                  <Col md={3}>
                    <Field
                      name="it_personnel"
                      as="select"
                      className="border-1 border-black rounded-2 form-control w-100"
                    >
                      <option value="">Select IT Personnel</option>
                      {itPersonnel.map((engg, i) => {
                        return (
                          <option key={i} value={engg}>
                            {engg}
                          </option>
                        );
                      })}
                    </Field>
                  </Col>
                </>
              )}
              <Col md={3}>
                <label className="font-bold  text-blue-800">Assign Date:</label>
              </Col>
              <Col md={3}>
                <Field
                  type="date"
                  name="assignDate"
                  className="border-1 border-black rounded-2 form-control w-100"
                />
                <ErrorMessage
                  name="assignDate"
                  component="div"
                  className="text-danger small text-center"
                  style={{ fontSize: "16px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <label className="font-bold text-blue-800">Priority:</label>
              </Col>
              <Col md={10}>
                {" "}
                {priorityLevel.map((l, i) => {
                  return (
                    <span className="m-2" key={i}>
                      <label>{l} &nbsp;</label>
                      <Field type="radio" name="p_level" value={l} />
                    </span>
                  );
                })}
                <ErrorMessage
                  name="p_level"
                  component="div"
                  className="text-danger font-semibold"
                  style={{ fontSize: "16px" }}
                />
              </Col>
            </Row>
            <Row className="flex justify-content-center">
              <Button
                variant="contained"
                type="submit"
                color="success"
                sx={{ width: "200px" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Assiging..." : "Assign Task"}
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default TaskFormik;
