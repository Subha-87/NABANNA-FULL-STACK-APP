import { Modal, Box, Typography, Button } from "@mui/material";
import { modalStyle } from "./styleModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { useAxios } from "@/app/Hook/useAxios";
import * as Yup from "yup";
import "../CSS/ModalForm.css";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";

import { useAuth } from "@/app/Hook/useAuth";
import { toast } from "react-toastify";

const EditComplainModal = ({
  isModalOpen,
  isModalClose,
  editData,
  onRefresh,
}) => {
  //console.log(editData);
  const { authName } = useAuth();
  const axios = useAxios()
  // Get the Complain Value //
  const { _id, status, domain, username, complain, type, remarks } = editData;

  // Use the value what to be edited in Formik Form //
  const initialDataforEdit = {
    _id,
    status, // default value pending coming from je complain form //
    remarks:"",
  };

  const validation = Yup.object().shape({
    remarks: Yup.string().required("Please Remark Something !!"),
  });
  const statusName = ["Pending", "In Progress", "Complete"]; 
  // EDIT ALL TYPE OF COMPLAIN FROM NABANNA USERS //
  const handleEditComplain = async (values, { setSubmitting }) => {
    //console.log(values);
    const { remarks, status } = values; // status & remarks is updated by IT Personnel //
    const setRemarks = authName.split(" ")[0] + ":" + " " + remarks;

    try {
      const response = await axios.put(
        //`http://10.10.119.160:5000/complain/edit/${_id}`,
        `/complain/edit/${_id}`,
        { setRemarks, status },
      );
      //console.log(response);
      toast.success(response.data.message)
      /*SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });*/
      isModalClose(true);
      onRefresh();
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      //console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <Formik
          initialValues={initialDataforEdit}
          onSubmit={handleEditComplain}
          validationSchema={validation}
        >
          {({ values, isSubmitting }) => (
            <Form className="w-[612px]" style={{ backgroundColor: "#FEF9E1" }}>
              <Container className="complainEdit">
                <Row className="text-3xl font-bold text-center uppercase">
                  <Col md={12}>Update {domain} Complain</Col>
                </Row>
                <Row>
                  <Col md={3} className="font-bold  text-blue-800">
                    Username:
                  </Col>
                  <Col md={9} className="text-green-900 font-semibold">
                    {username}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} className="font-bold  text-blue-800">
                    Problem :
                  </Col>
                  <Col md={9} className="text-red-600 font-semibold">
                    {complain ? type + ":" + complain : type}
                  </Col>
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
                  <Col md={9} className="flex items-center">
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
                <Row className="justify-content-center">
                  <Col md={6} className="flex justify-content-center">
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                      disabled={isSubmitting}
                    >
                      {" "}
                      {isSubmitting ? "Editing..." : "Update Status"}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditComplainModal;