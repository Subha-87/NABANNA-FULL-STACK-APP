import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
} from "@mui/material";

const DeviceCard = ({ title, icon, device, highlight = false }) => {

  if (!device) return null;

  // CPU serial can be array
  const serial = Array.isArray(device.serial)
    ? device.serial.join(", ")
    : device.serial;

  // Warranty / AMC Status
  const status = device.remainingWarranty;

  let chipColor = "success";

  if (
    status === "Expired" ||
    status === "AMC Expired" ||
    status === "AMC Required"
  ) {
    chipColor = "error";
  } else if (status !== "Expired" && status !== "AMC Expired") {
    chipColor = "success";
  }

  return (
    <Card
      elevation={highlight ? 8 : 2}
      sx={{
        borderRadius: 3,
        border: highlight ? "3px solid #1976d2" : "1px solid #ddd",

        bgcolor: highlight ? "#E3F2FD" : "#fff",

        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 8,
        },

        height: "100%",
      }}
    >
      <CardContent>
        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          {icon}
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: 18,
            }}
          >
            {title}
          </Typography>

          {highlight && (
            <Chip label="SEARCH RESULT" color="primary" size="small" />
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography
          sx={{
            mb: 1,
            fontSize: 15,
          }}
        >
          <b>Make :</b> {device.make}
        </Typography>

        <Typography
          sx={{
            mb: 1,
            fontSize: 15,
          }}
        >
          <b>Model :</b> {device.model}
        </Typography>

        <Typography
          sx={{
            mb: 1,
            fontSize: 15,
          }}
        >
          <b>Serial :</b> {serial}
        </Typography>

        {device.capacity && (
          <Typography
            sx={{
              mb: 1,
              fontSize: 15,
            }}
          >
            <b>Capacity :</b> {device.capacity}
          </Typography>
        )}

        <Typography
          sx={{
            mb: 1,
            fontSize: 15,
          }}
        >
          <b>Warranty :</b>
        </Typography>

        <Chip
          label={status}
          color={chipColor}
          size="small"
          sx={{
            mt: 1,
            fontWeight: 700,
          }}
        />

        {device.installationDate && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <b>Installed :</b>{" "}
            {new Date(device.installationDate).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
