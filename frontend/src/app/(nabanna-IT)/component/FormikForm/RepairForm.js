import { Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Icons
//import { RsIcon } from "@/component/Icons/RsIcon"; // Assuming you might have one, otherwise use text

const RepairForm = ({ edit_id, modStat, refreshData }) => {
  const axios = useAxios();

  const repairData = {
    repairDate: "",
    repairPart: "",
    otherRepairPart: "",
    priceValue: "",
    remarks: "",
  };

  const machineParts = [
    "SSD",
    "HDD",
    "Motherboard",
    "RAM",
    "SMPS",
    "UPS",
    "Processor",
    "UPS Battery",
    "CMOS Battery",
    "Mouse",
    "Keyboard",
    "Speaker",
    "Graphics Card",
    "Laptop Battery",
    "Monitor",
    "Powercable",
    "Printer-Parts",
  ];

  const validationRepairForm = Yup.object().shape({
    repairDate: Yup.date().required("Date is Required"),
    repairPart: Yup.string().required("Select Any Parts"),
    priceValue: Yup.number()
      .typeError("Must be a number")
      .required("Please mention Price"),
  });

  const handleRepairDetails = async (values, { resetForm, setSubmitting }) => {
    const payload = {
      ...values,
      repairPart:
        values.repairPart === "OTHER"
          ? values.otherRepairPart
          : values.repairPart,
    };
    delete payload.otherRepairPart;

    try {
      const response = await axios.put(
        `/NabannaSystem/e-repair/${edit_id}`,
        payload,
      );

      toast.success(response.data?.message || "Updated Successfully");
      refreshData();
      resetForm();
      modStat();
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-8">
      <Formik
        initialValues={repairData}
        onSubmit={handleRepairDetails}
        validationSchema={validationRepairForm}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                Update System Repair
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter the details of the repair performed.
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Date Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Repair Date <span className="text-red-500">*</span>
                </label>
                <Field
                  type="date"
                  name="repairDate"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
                />
                <ErrorMessage
                  name="repairDate"
                  component="div"
                  className="text-xs text-red-600 font-medium mt-1"
                />
              </div>

              {/* Repair Part Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Repair Part <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="repairPart"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-gray-700 cursor-pointer"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("repairPart", value);
                      if (value !== "OTHER") {
                        setFieldValue("otherRepairPart", "");
                      }
                    }}
                  >
                    <option value="">Select a part...</option>
                    {machineParts.map((part, i) => (
                      <option key={i} value={part}>
                        {part}
                      </option>
                    ))}
                    <option value="OTHER">Other (Specify below)</option>
                  </Field>
                  {/* Custom Arrow Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <ErrorMessage
                  name="repairPart"
                  component="div"
                  className="text-xs text-red-600 font-medium mt-1"
                />
              </div>

              {/* Conditional Other Field */}
              {values.repairPart === "OTHER" && (
                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="text-sm font-semibold text-gray-700">
                    Specify Part <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="otherRepairPart"
                    placeholder="e.g. Cooling Fan"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
                  />
                </div>
              )}

              {/* Price Field with Icon */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Repair Cost (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-gray-500 font-bold">₹</span>
                  </div>
                  <Field
                    type="number"
                    name="priceValue"
                    min="0"
                    placeholder="0.00"
                    className="block w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-4 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <ErrorMessage
                  name="priceValue"
                  component="div"
                  className="text-xs text-red-600 font-medium mt-1"
                />
              </div>

              {/* Remarks Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Remarks
                </label>
                <Field
                  as="textarea"
                  name="remarks"
                  rows="3"
                  placeholder="Additional details..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700 resize-y"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 mt-2">
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#2563eb", // Tailwind blue-600
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
                  "&:hover": {
                    backgroundColor: "#1d4ed8", // Tailwind blue-700
                    boxShadow: "0 6px 8px -1px rgba(37, 99, 235, 0.3)",
                  },
                  "&:disabled": {
                    backgroundColor: "#9ca3af",
                    color: "#fff",
                  },
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Update"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RepairForm;
