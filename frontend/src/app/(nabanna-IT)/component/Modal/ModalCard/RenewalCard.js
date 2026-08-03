import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import {
  Autorenew,
  CalendarMonth,
  Business,
  Inventory2,
  WarningAmber,
} from "@mui/icons-material";

const RenewalCard = ({ onClose, onRenew, amcData }) => {
  // Dummy Data (replace with API later)
  /*const amcData = {
    contractName: "Nabanna Hardware AMC",
    vendor: "PASCAL",
    machines: 500,
    startDate: "06-03-2026",
    endDate: "05-03-2027",
    status: "ACTIVE",
  };*/
  // Date Conversion Helper Function //
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
        <Box display="flex" alignItems="center" gap={1.5}>
          <Autorenew sx={{ fontSize: 34 }} />

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Renew Annual AMC
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Activate the current AMC contract for all eligible machines.
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          This operation will activate the active AMC contract for all eligible
          hardware currently marked as <b>AMC Required</b>.
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography color="text.secondary" variant="caption">
              Contract
            </Typography>

            <Typography fontWeight={700}>{amcData.contractName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography color="text.secondary" variant="caption">
              Vendor
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Business color="primary" fontSize="small" />

              <Typography fontWeight={700}>{amcData.vendor}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography color="text.secondary" variant="caption">
              Machines Covered
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Inventory2 color="success" fontSize="small" />

              <Typography fontWeight={700}>{amcData.machineCovered}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography color="text.secondary" variant="caption">
              Contract Status
            </Typography>

            <Chip label={amcData.status} color="success" size="small" />
          </Grid>

          <Grid item xs={6}>
            <Typography color="text.secondary" variant="caption">
              AMC Start Date
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonth color="primary" fontSize="small" />

              <Typography fontWeight={700}>
                {formatDate(amcData.startDate)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography color="text.secondary" variant="caption">
              AMC End Date
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonth color="error" fontSize="small" />

              <Typography fontWeight={700}>
                {formatDate(amcData.endDate)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Alert severity="warning" icon={<WarningAmber />}>
          Are you sure you want to activate this AMC contract?
          <br />
          This will update all eligible machines currently showing
          <b> "AMC Required"</b>.
        </Alert>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Autorenew />}
            onClick={onRenew}
          >
            Renew AMC
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RenewalCard;
