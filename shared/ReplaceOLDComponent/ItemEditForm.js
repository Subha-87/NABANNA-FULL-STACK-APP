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

const ItemEditForm = ({ info, modStat, onRefresh }) => {
  //console.log(info);
  const axios = useAxios();
  const stockStatus = ["YES", "NO"];
  const [isInStock, setIsInStock] = useState(info.stock);
  const handleEdit = async (values, { resetForm, setSubmitting }) => {
    //console.log(values);
    //return alert("hello")
    const { _id, allocation, room, remarks, stock } = values;

    try {
      const response = await axios.put(
        //`http://10.10.119.160:5000/itemNabanna/update/${_id}`,
        `/itemNabanna/update/${_id}`,
        { allocation, remarks, room, stock },
      );
      //console.log(response);
      toast.success(response.data?.message || "Updated");
      /*SweetSwal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });*/
      onRefresh();
      resetForm();
      modStat();
    } catch (error) {
      toast.error(error.response.data?.message || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={info} onSubmit={handleEdit}>
      {({ values, handleChange, isSubmitting }) => (
        <Form
          className="border-1 rounded border-black overflow-auto w-[550px]"
          style={{ backgroundColor: "#FFF0DB" }}
        >
          <Container className="text-xl">
            <Row>
              <Col className="text-3xl text-center font-bold text-blue-600 p-3">
                Update Nabanna Materials Entry
              </Col>{" "}
            </Row>
            <Row>
              <Col md={2}>Date:</Col>
              <Col md={3} className="font-semibold text-blue-700">
                {new Date(values.date).toLocaleDateString()}
              </Col>
              <Col md={3}>Sender:</Col>
              <Col md={4} className="uppercase font-semibold text-blue-700">
                {values.sender}
              </Col>
            </Row>
            <Row className="justify-center text-2xl font-serif mb-2">
              <Col md={6} className="text-fuchsia-950">
                Incoming ITEM
              </Col>
            </Row>
            <Row>
              <Col>
                <Table
                  style={{ fontSize: "15px" }}
                  striped
                  bordered
                  hover
                  variant="dark"
                >
                  <thead>
                    <tr>
                      <th>Serial</th>
                      <th>Item</th>
                      <th>Model</th>
                      <th>Make</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.itItems.map(({ item, model, make, qty }, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item}</td>
                        <td>{model}</td>
                        <td>{make}</td>
                        <td>{qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  label="Current Allocation"
                  variant="outlined"
                  margin="normal"
                  name="allocation"
                  fullWidth
                  value={values.allocation}
                  onChange={handleChange}
                  sx={customStyle}
                />
              </Col>
              <Col>
                <TextField
                  label="Remarks"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="remarks"
                  value={values.remarks}
                  onChange={handleChange}
                  sx={customStyle}
                />
              </Col>
            </Row>

            <div className="flex justify-evenly">
              <div>
                <Label>Room No:</Label>
              </div>
              <div>
                <Field
                  name="room"
                  className="w-[100px] text-center border-1 border-black rounded"
                />
              </div>
              <div>
                <Label>Stock :</Label>
              </div>
              <div>
                {stockStatus.map((s, i) => {
                  return (
                    <span key={i}>
                      <Label>{s} &nbsp;</Label>
                      <Field type="radio" name="stock" value={s} />
                    </span>
                  );
                })}
              </div>
            </div>
            <Row style={{ height: "70px" }}>
              <Col className="text-center mt-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "10px" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Updated"}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ItemEditForm;
