import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import {
  Autorenew,
  CalendarMonth,
  Inventory2,
  WarningAmber,
  CheckCircle,
  Assignment,
  Description,
  Business,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export const RenewalCard = ({ onClose, onRenew, amcDetails }) => {
  //console.log(amcDetails)
  const { previousContract, suggestedStartDate, suggestedEndDate } = amcDetails;
  const minimumDate = suggestedStartDate.split("T")[0];
  const calculateEndDate = (startDate) => {
    //console.log(startDate)
    if (!startDate) return "";

    const end = new Date(startDate);

    end.setFullYear(end.getFullYear() + 1);

    end.setDate(end.getDate() - 1);

    return end.toLocaleDateString("en-GB");
  };
  const renewalValidationSchema = Yup.object({
    agencyName: Yup.string().trim().required("Agency Name is required"),

    workOrderNo: Yup.string().trim().required("Work Order Number is required"),

    contractNo: Yup.string().trim().required("Contract Number is required"),

    startDate: Yup.date()
      .min(minimumDate, `Start date cannot be earlier than ${minimumDate}`)
      .required("AMC Start Date is required"),

    remarks: Yup.string().max(300, "Maximum 300 characters"),
  });
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Card
      sx={{
        width: { xs: "95vw", sm: 760 },
        maxWidth: 760,
        height: { xs: "90vh", sm: 700 },
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#1565c0",
          color: "#fff",
          p: 2.5,
          flexShrink: 0,
        }}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Autorenew sx={{ fontSize: 36 }} />

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Renew AMC Contract
            </Typography>

            <Typography variant="body2">
              Create the next Annual Maintenance Contract
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent
        sx={{
          p: 4,
          flex: "1 1 0%",
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        {/* Previous Contract */}
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          Previous AMC Contract
        </Typography>

        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            mb: 4,
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Contract Name
                </Typography>

                <Typography fontWeight={700}>
                  {previousContract.contractName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Agency
                </Typography>

                <Box display="flex" gap={1} alignItems="center">
                  <Business fontSize="small" color="primary" />

                  <Typography fontWeight={700}>
                    {previousContract.vendor}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Work Order No
                </Typography>

                <Box display="flex" gap={1} alignItems="center">
                  <Description fontSize="small" color="primary" />

                  <Typography fontWeight={700}>
                    {previousContract.workOrderNo}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Contract No
                </Typography>

                <Typography fontWeight={700}>
                  {previousContract.contractNo}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  AMC Period
                </Typography>

                <Box display="flex" gap={1} alignItems="center">
                  <CalendarMonth fontSize="small" color="primary" />

                  <Typography fontWeight={700}>
                    {formatDate(previousContract.startDate)} -{" "}
                    {formatDate(previousContract.endDate)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="caption" color="text.secondary">
                  Covered Devices
                </Typography>

                <Box display="flex" gap={1} alignItems="center">
                  <Inventory2 fontSize="small" color="success" />

                  <Typography fontWeight={700}>
                    {previousContract.coveredDevices}
                  </Typography>
                </Box>
              </Grid>

              {/*<Grid item xs={3}>
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>

                <Box mt={0.5}>
                  <Chip
                    label={previousContract.status}
                    color={
                      previousContract.status === "ACTIVE" ? "success" : "error"
                    }
                    size="small"
                  />
                </Box>
              </Grid>*/}
            </Grid>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 4 }} />

        {/* Form */}
        <Formik
          initialValues={{
            agencyName: "",
            workOrderNo: "",
            contractNo: "",
            startDate: suggestedStartDate.split("T")[0],
            remarks: "",
          }}
          validationSchema={renewalValidationSchema}
          onSubmit={(values) => onRenew(values)}
        >
          {({ values }) => (
            <Form>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                New AMC Contract
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="agencyName">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Agency Name"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field name="workOrderNo">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Work Order No."
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field name="contractNo">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Contract Number"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field name="startDate">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        label="AMC Start Date"
                        InputLabelProps={{ shrink: true }}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="AMC End Date"
                    value={calculateEndDate(values.startDate)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field name="remarks">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        label="Remarks"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>

              <Alert severity="warning" icon={<WarningAmber />} sx={{ mt: 4 }}>
                Renewing AMC will:
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  <li>Expire the previous AMC contract.</li>
                  <li>Create a new AMC contract.</li>
                  <li>
                    Activate all AMC Expired devices under the new contract.
                  </li>
                </ul>
              </Alert>

              {/* FIXED FOOTER */}
              <Box
                sx={{
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  px: 4,
                  py: 2.5,
                  borderTop: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                }}
              >
                <Button variant="outlined" color="inherit" onClick={onClose}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Autorenew />}
                >
                  Renew AMC
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export const ActiveAMCCard = ({ onClose, onActivate, amcData }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Card
      elevation={0}
      sx={{
        width: 720,
        borderRadius: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#2e7d32",
          color: "#fff",
          p: 2.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <CheckCircle sx={{ fontSize: 34 }} />

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Activate AMC
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Link all pending AMC devices with the current active contract.
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Devices entered as <b>AMC / OLD</b> are currently waiting for
          activation. This operation will attach them to the active AMC
          contract.
        </Alert>

        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          Current AMC Contract
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Contract Name
            </Typography>

            <Typography fontWeight={700}>{amcData.contractName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Contract Number
            </Typography>

            <Box display="flex" gap={1} alignItems="center">
              <Assignment color="primary" fontSize="small" />

              <Typography fontWeight={700}>{amcData.contractNo}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Work Order No.
            </Typography>

            <Box display="flex" gap={1} alignItems="center">
              <Description color="primary" fontSize="small" />

              <Typography fontWeight={700}>{amcData.workOrderNo}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>

            <Box mt={0.5}>
              <Chip label={amcData.status} color="success" size="small" />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              AMC Start Date
            </Typography>

            <Box display="flex" gap={1} alignItems="center">
              <CalendarMonth color="primary" fontSize="small" />

              <Typography fontWeight={700}>
                {formatDate(amcData.startDate)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              AMC End Date
            </Typography>

            <Box display="flex" gap={1} alignItems="center">
              <CalendarMonth color="error" fontSize="small" />

              <Typography fontWeight={700}>
                {formatDate(amcData.endDate)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                mt: 1,
                p: 2,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                border: "1px dashed #bdbdbd",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Inventory2 color="success" />

                <Typography fontWeight={700}>
                  Devices Waiting for Activation
                </Typography>
              </Box>

              <Typography
                variant="h4"
                color="success.main"
                fontWeight={700}
                mt={1}
              >
                {amcData.machinesWaiting}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Alert severity="warning" icon={<WarningAmber />}>
          <Typography fontWeight={700}>Confirm AMC Activation</Typography>
          All pending devices will be linked with the current AMC contract.
          <br />
          This action cannot be undone.
        </Alert>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            onClick={onActivate}
            disabled={amcData.machinesWaiting === 0}
          >
            Activate AMC
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
