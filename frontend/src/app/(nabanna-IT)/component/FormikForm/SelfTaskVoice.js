import { Box, Button, Typography, Label, TextField } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import "../CSS/ModalForm.css";
import * as Yup from "yup";
import { useAuth } from "@/app/Hook/useAuth";
import { toast } from "react-toastify";

const SelfTaskVoice = ({ editData, modalStat }) => {
  const { authName } = useAuth();
  const axios = useAxios();

  const taskValidation = Yup.object().shape({
    remarks: Yup.string().required("Update Remarks"),
  });

  const handleSelfTask = async (values, { resetForm, setSubmitting }) => {
    //console.log(values);
    const { _id, remarks, it_personnel } = values;
    const setRemarks = authName.split(" ")[0] + ":" + " " + remarks;

    try {
      const voiceRespSelf = axios.put(`/voiceTask/editVoice/${_id}`, {
        setRemarks,
        it_personnel,
      });
      const voiceResptoJE = axios.put(`/ItReq/letterUpdatefrom105/${_id}`, {
        setRemarks,
      });

      const [voiceRes, JERes] = await Promise.allSettled([
        voiceRespSelf,
        voiceResptoJE,
      ]);

      if (voiceRes.status !== "fulfilled") {
        throw new Error("Cant Update");
      }
      toast.success("Updated Information");

      //console.log(JERes.status)
      if (JERes.status === "rejected") {
        console.warn("update to JE not Possible");
        toast.warning("update to JE not Possible");
      }
      resetForm();
      modalStat();
    } catch (error) {
      /*SweetSwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });*/
      toast.error(error.response.data?.message || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{ ...editData, remarks: "" }}
      onSubmit={handleSelfTask}
      validationSchema={taskValidation}
    >
      {({ values, handleChange, isSubmitting, touched, errors }) => (
        <Form>
          <Container>
            <Row>
              <div className="text-2xl text-center font-semibold text-blue-700">
                Update Task Information
              </div>
            </Row>
            <Row>
              <TextField
                label="Remarks"
                multiline
                rows={3}
                variant="outlined"
                margin="normal"
                fullWidth
                name="remarks"
                value={values.remarks}
                onChange={handleChange}
                error={touched.remarks && Boolean(errors.remarks)}
                helperText={touched.remarks && errors.remarks}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "darkblue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "purple",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "18px",
                    color: "green",
                    "&.Mui-focused": {
                      color: "darkgreen",
                    },
                  },
                }}
              />
            </Row>
            <Row>
              <Button
                variant="contained"
                color="info"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating.." : "Post"}
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default SelfTaskVoice;
