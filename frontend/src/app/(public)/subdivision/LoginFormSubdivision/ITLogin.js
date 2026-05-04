"use client";
import { Formik, Form, Field } from "formik";
import { TextField, Button, MenuItem } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { Login_IT_User } from "../../../actions/itPersonLog";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ITLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionMsg, setSessionMsg] = useState("");
  const [error, setError] = useState(null);
  const domain_name = [
    "NETWORKING",
    "VOICE",
    "CCTV",
    "HARDWARE-APP",
    "CONFERENCING",
  ];

  const dashboardRoutes = {
    networking: "/nabanna/networking",
    voice: "/nabanna/voice",
    "hardware-app": "/nabanna/pc-hardware",
  };
  const initialValues = {
    fusername: "",
    fpassword: "",
    fdomain: "",
  };
  const validation = Yup.object().shape({
    fusername: Yup.string().required("Username is Required !!"),
    fpassword: Yup.string().required("Password is Required !!"),
    fdomain: Yup.string().required("Select Any Domain !!"),
  });

  useEffect(() => {
    const session = searchParams.get("session");
    if (session === "expired") {
      //toast.error("Session Expired. Please Login Again.")
      setSessionMsg("Session Expired. Please Login Again.");
    }
  }, [searchParams]);
  const handleSubmit = async (values, action) => {
    //console.log(values);
    const { resetForm, setSubmitting } = action;

    try {
      const result = await Login_IT_User(values);
      if (result?.success) {
        //alert(result.data)
        toast.success("Login Successful");
        /*if (result.data == "networking") router.push("/nabanna/networking");
        if (result.data == "voice") router.push("/nabanna/voice");
        if (result.data == "hardware-app") router.push("/nabanna/pc-hardware");*/
        const route = dashboardRoutes[result.data];
        if (!route) {
          toast.error("Invalid User Domain");
          return;
        }
        router.push(route);
        router.refresh();
        resetForm();
      } else {
        //alert(result.error);
        //toast.error(result?.error || "Login Failed");
        setError(result?.error || "Login Failed")
      }
    } catch (error) {
      console.error("Login Error", error);
      //toast.error("Something Went Wrong,Please try again");
      setError("Something Went Wrong,Please try again")
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form className="d-flex flex-column p-3 m-3">
            { error && <span className="text-red-700 text-center" >**{error}**</span>}
            <TextField
              variant="outlined"
              label="Enter Username"
              name="fusername"
              value={values.fusername}
              onChange={handleChange}
              margin="normal"
              size="small"
              fullWidth="true"
              onBlur={handleBlur}
              error={touched.fusername && Boolean(errors.fusername)}
              helperText={touched.fusername && errors.fusername}
            />
            <TextField
              variant="outlined"
              label="Enter Password"
              name="fpassword"
              value={values.fpassword}
              onChange={handleChange}
              margin="normal"
              size="small"
              fullWidth="true"
              type="password"
              onBlur={handleBlur}
              error={touched.fpassword && Boolean(errors.fpassword)}
              helperText={touched.fpassword && errors.fpassword}
            />
            <TextField
              select
              label="Select Your Domain"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth="true"
              name="fdomain"
              value={values.fdomain}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fdomain && Boolean(errors.fdomain)}
              helperText={touched.fdomain && errors.fdomain}
            >
              {domain_name.map((dom, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={dom.toLowerCase()}
                    style={{ fontSize: "14px" }}
                  >
                    {dom}
                  </MenuItem>
                );
              })}
            </TextField>
            <div className="d-flex justify-content-center m-2">
              <Button
                style={{ width: "150px" }}
                variant="contained"
                color="success"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logingg..." : "Login"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {sessionMsg && <Alert variant="danger">{sessionMsg}</Alert>}
    </Container>
  );
};

export default ITLogin;
