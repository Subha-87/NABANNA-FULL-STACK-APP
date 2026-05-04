"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";



const ITLoginAlipore = () => {
   // ✅ validation schema
    const validationSchema = Yup.object({
      username: Yup.string()
        .min(3, "Too short")
        .required("Username is required"),
      password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required("Password is required"),
    });
  
    // ✅ submit handler
    const handleSubmit = (values, { setSubmitting }) => {
      console.log("Login Data:", values);
  
      // simulate API call
      setTimeout(() => {
        setSubmitting(false);
        alert("Login Successful (Demo)");
      }, 1000);
    };
  return (
   <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          {/* Username */}
          <div>
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 rounded border"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-400 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 rounded border"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-400 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ITLoginAlipore
