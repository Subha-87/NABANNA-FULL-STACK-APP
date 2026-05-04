"use client";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions/logAdmin";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const AdminLogin = () => {
  const searchParams = useSearchParams();
  const [sessionMsg, setSessionMsg] = useState("");
  useEffect(() => {
    const session = searchParams.get("session");
    if (session === "expired") {
      //toast.error("Session Expired. Please Login Again.")
      setSessionMsg("Session Expired. Please Login Again.");
    }
  }, [searchParams]);

  const validation = Yup.object().shape({
    email: Yup.string().required("Email is Required !!"),
    password: Yup.string().required("Password is Required !!"),
  });
  const router = useRouter();
  const handleSubmit = async (values, action) => {
    const { resetForm, setSubmitting } = action;
    try {
      const result = await loginUser(values); // Call Server Actions//
      if (result?.success) {
        toast.success("Login Successful");
        router.push("/dashboard");
        router.refresh(); // ensures server components reload
        resetForm();
      } else {
        //alert(result.error);
        toast.error(result?.error || "Login Failed");
      }
    } catch (error) {
      console.error("Login Error", error);
      toast.error("Something Went Wrong,Please try again");
    } finally {
      setSubmitting(false); // Formik stops loading
    }
  };
  return (
    <div className="flex flex-col w-[350px] p-6 border border-gray-300 rounded-xl shadow-xl" style={{backgroundColor:"#FFF0F5"}}>
      {sessionMsg && <Alert variant="danger">{sessionMsg}</Alert>}
      <div className="flex justify-center mb-2 text-blue-700">
        <AdminPanelSettingsIcon style={{ fontSize: 40 }} />
      </div>
      <div className="text-2xl font-serif text-center text-blue-800 font-semibold mb-4">
        ADMIN LOGIN
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form className="flex flex-col gap-2" action={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth="true"
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              className="mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in.." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLogin;
