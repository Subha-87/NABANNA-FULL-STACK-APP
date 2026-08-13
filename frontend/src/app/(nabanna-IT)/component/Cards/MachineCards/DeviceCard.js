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
  console.log(device);

  // CPU serial can be array
  const serial = Array.isArray(device.serial)
    ? device.serial.join(", ")
    : device.serial;

  // Warranty / AMC Status
  const warrantyStatus = device.remainingWarranty;
  const amcStatus = device.amcStatus;
  console.log(device.installationDate);

  // -------------------------
  // AMC CHIP COLOR
  // -------------------------
  const getAmcChipColor = (status) => {
    switch (status) {
      case "ON":
        return "success";

      case "REQUIRED":
      case "EXPIRED":
        return "error";

      case "NONE":
      default:
        return "default";
    }
  };

  // -------------------------
  // WARRANTY COLOR
  // -------------------------
  const warrantyColor =
    warrantyStatus && warrantyStatus !== "Expired" ? "success" : "error";

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

        {/* ========================= */}
        {/* WARRANTY DEVICE */}
        {/* ========================= */}

        {device.installationDate ? (
          <>
            <Typography
              sx={{
                mb: 1,
                fontSize: 15,
              }}
            >
              <b>Warranty :</b>
              <Chip
                label={device.remainingWarranty}
                color={warrantyColor}
                size="small"
                sx={{
                  ml: 0.5,
                  fontWeight: 700,
                }}
              />
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <b>Installed :</b>{" "}
              {new Date(device.installationDate).toLocaleDateString()}
            </Typography>
          </>
        ) : (
          /* ========================= */
          /* AMC DEVICE */
          /* ========================= */
          <Typography
            sx={{
              mb: 1,
              fontSize: 15,
            }}
          >
            <b>AMC Status :</b>
            <Chip
              label={amcStatus || "NONE"}
              color={getAmcChipColor(amcStatus)}
              size="small"
              sx={{
                fontWeight: 700,
              }}
            />
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
