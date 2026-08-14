import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  Box,
  Chip,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import ComputerIcon from "@mui/icons-material/Computer";
import MonitorIcon from "@mui/icons-material/Monitor";
import PrintIcon from "@mui/icons-material/Print";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import ScannerIcon from "@mui/icons-material/Scanner";
import DeviceCard from "./DeviceCard";

const MachineInfoCard = ({ searchResult }) => {
  
  //console.log(searchResult)
  const { data, matchedDevice} = searchResult;
  //console.log(data);
  //console.log(matchedDevice);
  //console.log(matchedValue);
  if (!data) return null;

  return (
    <>
      {/* ================= Employee Information ================= */}

      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          mb: 3,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
            <PersonIcon />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {data.employeeName}
            </Typography>

            <Typography variant="body2">{data.designation}</Typography>
          </Box>
        </Box>

        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Employee Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="caption" color="text.secondary">
                Department
              </Typography>
              <Typography fontWeight={600}>{data.department}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="caption" color="text.secondary">
                Office
              </Typography>
              <Typography fontWeight={600}>{data.office}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="caption" color="text.secondary">
                Floor
              </Typography>
              <Typography fontWeight={600}>{data.floor}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="caption" color="text.secondary">
                Room No
              </Typography>
              <Typography fontWeight={600}>{data.roomNo}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="caption" color="text.secondary">
                Supplier
              </Typography>
              <Typography fontWeight={600}>{data.supplier || "-"}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="caption" color="text.secondary">
                System Condition
              </Typography>

              <Box mt={0.5}>
                <Chip
                  label={data.systemCondition}
                  color={
                    data.systemCondition === "GOOD"
                      ? "success"
                      : data.systemCondition === "AVERAGE"
                        ? "warning"
                        : "error"
                  }
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid
        container
        spacing={3}
        sx={{
          mt: 1,
        }}
      >
        {data.systems.LAPTOP && (
          <Grid item xs={12} md={6}>
            <DeviceCard
              title="LAPTOP"
              icon={<LaptopMacIcon color="primary" />}
              device={data.systems.LAPTOP}
              highlight={matchedDevice === "LAPTOP"}
            />
          </Grid>
        )}
        {data.systems.ALL_IN_ONE && (
          <Grid item xs={12} md={6}>
            <DeviceCard
              title="🖥 All-In-One"
              device={data.systems.ALL_IN_ONE}
              highlight={matchedDevice === "ALL_IN_ONE"}
            />
          </Grid>
        )}

        {data.systems.CPU && (
          <Grid item xs={12} md={6}>
            <DeviceCard
              title="🖥 CPU"
              device={data.systems.CPU}
              highlight={matchedDevice === "CPU"}
            />
          </Grid>
        )}

        {data.systems.MONITOR && (
          <Grid item xs={12} md={6}>
            <DeviceCard
              title="Monitor"
              icon={<MonitorIcon color="success" />}
              device={data.systems.MONITOR}
              highlight={matchedDevice === "MONITOR"}
            />
          </Grid>
        )}

        {data.systems.UPS && (
          <Grid item xs={12} md={6}>
            <DeviceCard
              title="UPS"
              icon={<BatteryChargingFullIcon color="warning" />}
              device={data.systems.UPS}
              highlight={matchedDevice === "UPS"}
            />
          </Grid>
        )}

        {data.systems.PRINTER?.map((printer, i) => (
          <Grid item xs={12} md={6} key={printer.serial || i}>
            <DeviceCard
              title={`Printer ${i + 1}`}
              device={printer}
              icon={<PrintIcon color="error" />}
              highlight={matchedDevice === "PRINTER"}
            />
          </Grid>
        ))}

        {data.systems.SCANNER?.map((scanner, i) => (
          <Grid item xs={12} md={6} key={scanner.serial || i}>
            <DeviceCard
              title={`📠 Scanner ${i + 1}`}
              device={scanner}
              highlight={matchedDevice === "SCANNER"}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MachineInfoCard;
