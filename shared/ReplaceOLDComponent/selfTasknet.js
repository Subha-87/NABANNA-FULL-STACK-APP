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

const SelfTaskNet = ({ editData, modalStat, onRefresh }) => {
  const { authName } = useAuth();
  const axios = useAxios();
  const taskValidation = Yup.object().shape({
    remarks: Yup.string().required("Update Remarks"),
  });

  const handleSelfEdit = async (values, { resetForm, setSubmitting }) => {
    const { _id, remarks, it_personnel } = values;
    const setRemarks = authName.split(" ")[0] + ":" + " " + remarks;

    try {
      const netRespSelf = axios.put(`/TaskData/updateNetTask/${_id}`, {
        setRemarks,
        it_personnel,
      });
      const netRespJE = axios.put(`/ItReq/letterUpdatefrom105/${_id}`, {
        setRemarks,
      });

      //🚀 Run both in parallel
      const respResult = await Promise.allSettled([netRespSelf, netRespJE]);

      //console.log(respResult);
      // Handle results
      const [netRes, netJERes] = respResult;

      if (netRes.status !== "fulfilled") {
        throw new Error("Updated Failed");
      }
      toast.success("Updated Information");

      // ⚠️ Non-critical warning
      if (netJERes.status === "rejected") {
        console.warn("Update to JE is failed");
        toast.warning("Update to JE is failed");
      }
      resetForm();
      modalStat();
    } catch (error) {
      toast.error(error.response.data?.message || "Updated");
      /*SweetSwal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Soemthing Went Wrong",
      });*/
    } finally {
      setSubmitting(false);

      onRefresh();
    }
  };
  return (
    <Formik
      initialValues={{ ...editData, remarks: "" }}
      onSubmit={handleSelfEdit}
      validationSchema={taskValidation}
    >
      {({ values, handleChange, isSubmitting, touched, errors }) => (
        <Form className="w-[300px]">
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
                {isSubmitting ? "Updating..." : "Post"}
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default SelfTaskNet;
