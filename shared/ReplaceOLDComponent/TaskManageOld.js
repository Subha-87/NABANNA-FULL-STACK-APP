import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import "../CSS/ModalForm.css";
import * as Yup from "yup";

import { useAuth } from "@/app/Hook/useAuth";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";

const TaskManage = ({ editableInfo, modalStat,onRefresh }) => {
  //console.log(editableInfo)
  const { authName } = useAuth();
  const axios = useAxios();
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
    "JE_IT_Nabanna",
  ];

  const addedFieldValue = {
    it_personnel: "",
    remarks: "",
  };
  const newFieldValue = { ...editableInfo, ...addedFieldValue };
  const validation = Yup.object().shape({
    remarks: Yup.string().required("Kindly Make Comment !!"),
    it_personnel: Yup.string().required("Choose IT-Personnel !!"),
  });

  const statusName = ["Pending", "In Progress", "Complete"];

  const handleTaskSubmit = async (values, { resetForm, setSubmitting }) => {
    //console.log(values)
    // 1. Formik sets isSubmitting to true automatically here
    const { _id, username, remarks, status, it_personnel } = values;
    const setRemarks = authName.split(" ")[0] + ":" + " " + remarks;

    try {
      const isVoice = it_personnel === "Partha Nag Choudhury";

      // 🔥 Always required
      const netApi = axios.put(`/TaskData/updateNetTask/${_id}`, {
        setRemarks,
        status,
        it_personnel,
      });

      // ✅ Admin always runs
      const adminApi = axios.put(`/ItReq/letterUpdatefrom105/${_id}`, {
        username,
        it_personnel,
        setRemarks,
        status,
      });

      // 🔥 Optional (only for voice when net personnle send data to voice person)
      const voiceApi = isVoice
        ? axios.put(`/voiceTask/editVoice/${_id}`, {
            setRemarks,
            status,
            it_personnel,
          })
        : null;

      // 🧠 Build dynamic promise array

      const promises = isVoice
        ? [netApi, voiceApi, adminApi]
        : [netApi, adminApi];

      //🚀 Run both in parallel
      const results = await Promise.allSettled(promises);

      // 🎯 Extract results safely
      const netRes = results[0];
      const voiceRes = isVoice ? results[1] : null;
      const adminRes = isVoice ? results[2] : results[1];

      // ❗ Critical: Network must succeed

      if (netRes.status !== "fulfilled") {
        throw new Error("Task Updated Failed");
      }

      // ❗ If voice case → voice must also succeed
      if (isVoice && voiceRes.status !== "fulfilled") {
        throw new Error("Task update failed");
      }
      onRefresh()
      // ✅ Success UI
      SweetSwal.fire({
        icon: "success",
        title: isVoice
          ? `Task updated to ${it_personnel}`
          : `Task updated to ${it_personnel}`,
        timer: 1500,
        showConfirmButton: false,
      });

      // ⚠️ Admin failure = warning only
      if (adminRes.status === "rejected") {
        console.warn("Admin update failed");
        toast.warning("Admin update failed");
      }
      resetForm();
      modalStat(true);
     
    } catch (error) {
      //console.log(error);
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something went wrong!");
    } finally {
      // 2. MUST manually set false when using .finally()
      setSubmitting(false);
      
    }
  };
  return (
    <Formik
      initialValues={newFieldValue}
      onSubmit={handleTaskSubmit}
      validationSchema={validation}
    >
      {({ values, isSubmitting }) => (
        <Form className="w-[612px]" style={{ backgroundColor: "#FFFDCE" }}>
          <Container className="p-3 border-1 border-primary rounded-2 netEdit">
            <Row className="text-3xl font-serif text-center text-purple-600">
              <Col>Update Task For :{values.lettertype[0]}</Col>
            </Row>

            <Row>
              <Col md={3} className="font-bold  text-blue-800">
                Work Status:
              </Col>
              <Col md={9}>
                <div className="font-semibold font-serif">
                  {statusName.map((s, i) => {
                    return (
                      <span className="m-2" key={i}>
                        <label>{s} &nbsp;</label>
                        <Field type="radio" name="status" value={s} />
                      </span>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row className="items-center">
              <Col md={3} className="font-bold  text-blue-800">
                Remarks:
              </Col>
              <Col md={9}>
                <Field
                  as="textarea"
                  name="remarks"
                  className="border-1 border-black rounded-2 w-[250px] "
                />
                <ErrorMessage
                  name="remarks"
                  component="div"
                  className="error_message text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row>
              <Col md={3} className="font-bold  text-blue-800">
                Refer Task:
              </Col>
              <Col md={9}>
                <Field
                  name="it_personnel"
                  as="select"
                  className="border-1 border-black rounded-2"
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
                <ErrorMessage
                  name="it_personnel"
                  component="div"
                  className="error_message text-danger font-semibold"
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={6} className="flex justify-content-center">
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  {" "}
                  {isSubmitting ? "Editing..." : "Update Task"}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default TaskManage;
