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
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const RenewalCard = ({ onClose, onRenew, amcData }) => {
  const validationSchema = Yup.object({
    vendor: Yup.string().required("Agency name is required"),

    contractNo: Yup.string().required("Contract number is required"),

    startDate: Yup.date().required("Start date is required"),
  });
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
          bgcolor: "#1565c0",
          color: "#fff",
          p: 2.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Autorenew sx={{ fontSize: 34 }} />

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Renew Annual AMC
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Create a new AMC contract and activate all eligible machines.
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          This process will create a new AMC contract and activate every
          eligible machine currently waiting for AMC coverage.
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              Contract Name
            </Typography>

            <Typography fontWeight={700}>{amcData.contractName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Machines Waiting
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Inventory2 color="success" />

              <Typography fontWeight={700}>
                {amcData.machinesWaiting}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Suggested Start Date
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonth color="primary" />

              <Typography fontWeight={700}>
                {formatDate(amcData.suggestedStartDate)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* These will later be connected to Formik */}
        <Formik
          enableReinitialize
          initialValues={{
            contractName: amcData.contractName,
            vendor: "",
            contractNo: "",
            startDate: amcData.suggestedStartDate?.split("T")[0] || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => onRenew(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                New AMC Details
              </Typography>

              <Grid container spacing={2}>
                {/* Agency */}
                <Grid item xs={12}>
                  <Field name="vendor">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Agency / Vendor"
                        placeholder="Enter Agency Name"
                        error={touched.vendor && Boolean(errors.vendor)}
                        helperText={touched.vendor && errors.vendor}
                      />
                    )}
                  </Field>
                </Grid>

                {/* Contract Number */}
                <Grid item xs={6}>
                  <Field name="contractNo">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Contract Number"
                        placeholder="AMC/2026/001"
                        error={touched.contractNo && Boolean(errors.contractNo)}
                        helperText={touched.contractNo && errors.contractNo}
                      />
                    )}
                  </Field>
                </Grid>

                {/* Start Date */}
                <Grid item xs={6}>
                  <Field name="startDate">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        label="AMC Start Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={touched.startDate && Boolean(errors.startDate)}
                        helperText={touched.startDate && errors.startDate}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Alert severity="warning" icon={<WarningAmber />}>
                Are you sure you want to create a new AMC contract and activate{" "}
                <b>{amcData.machinesWaiting}</b> waiting machines?
              </Alert>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
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
