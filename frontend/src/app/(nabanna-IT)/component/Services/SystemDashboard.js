import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
} from "@mui/material";

import ComputerIcon from "@mui/icons-material/Computer";
import PrintIcon from "@mui/icons-material/Print";
import ScannerIcon from "@mui/icons-material/Scanner";
import MonitorIcon from "@mui/icons-material/Monitor";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import StorageIcon from "@mui/icons-material/Storage";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import DevicesIcon from "@mui/icons-material/Devices";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GppBadIcon from "@mui/icons-material/GppBad";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

const SystemDashboard = ({ dashboardData }) => {
  if (!dashboardData) return null;

  const {
    totalSystems = 0,
    cpu = 0,
    monitor = 0,
    allInOne = 0,
    laptop = 0,
    printer = 0,
    scanner = 0,
    ups = 0,

    underWarranty = 0,
    amcCovered = 0,
    amcExpired = 0,
    amcRequired = 0,

    printerHP = 0,
    printerCanon = 0,
    printerBrother = 0,
    printerOthers = 0,
  } = dashboardData;

  const totalStatus = underWarranty + amcCovered + amcRequired + amcExpired || 1;

  /* =============================================
     HARDWARE SYSTEM CARDS DATA
  ============================================= */
  const systemCards = [
    {
      title: "Total Systems",
      subtitle: "All registered hardware",
      value: totalSystems,
      icon: <DevicesIcon />,
      color: "#4F46E5",
      gradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
      bg: "#EEF2FF",
      chip: null,
      highlight: true,
    },
    {
      title: "Desktop CPU",
      subtitle: "Tower & SFF units",
      value: cpu,
      icon: <ComputerIcon />,
      color: "#2563EB",
      gradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
      bg: "#EFF6FF",
      chip: totalSystems ? `${((cpu / totalSystems) * 100).toFixed(0)}%` : null,
    },
    {
      title: "All-In-One",
      subtitle: "Integrated systems",
      value: allInOne,
      icon: <ComputerIcon />,
      color: "#7C3AED",
      gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
      bg: "#F5F3FF",
      chip: totalSystems ? `${((allInOne / totalSystems) * 100).toFixed(0)}%` : null,
    },
    {
      title: "Laptop",
      subtitle: "Portable systems",
      value: laptop,
      icon: <LaptopMacIcon />,
      color: "#EA580C",
      gradient: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
      bg: "#FFF7ED",
      chip: totalSystems ? `${((laptop / totalSystems) * 100).toFixed(0)}%` : null,
    },
    {
      title: "Monitor",
      subtitle: "Display units",
      value: monitor,
      icon: <MonitorIcon />,
      color: "#0891B2",
      gradient: "linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)",
      bg: "#ECFEFF",
      chip: totalSystems ? `${((monitor / totalSystems) * 100).toFixed(0)}%` : null,
    },
    {
      title: "UPS",
      subtitle: "Power backup units",
      value: ups,
      icon: <BatteryChargingFullIcon />,
      color: "#CA8A04",
      gradient: "linear-gradient(135deg, #CA8A04 0%, #EAB308 100%)",
      bg: "#FEFCE8",
      chip: totalSystems ? `${((ups / totalSystems) * 100).toFixed(0)}%` : null,
    },
    {
      title: "Printer",
      subtitle: "All print devices",
      value: printer,
      icon: <PrintIcon />,
      color: "#DC2626",
      gradient: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
      bg: "#FEF2F2",
      chip: totalSystems ? `${((printer / totalSystems) * 100).toFixed(0)}%` : null,
    },
    {
      title: "Scanner",
      subtitle: "Scan devices",
      value: scanner,
      icon: <ScannerIcon />,
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
      bg: "#ECFDF5",
      chip: totalSystems ? `${((scanner / totalSystems) * 100).toFixed(0)}%` : null,
    },
  ];

  /* =============================================
     WARRANTY / AMC STATUS DATA
  ============================================= */
  const statusCards = [
    {
      title: "Under Warranty",
      subtitle: "Active warranty period",
      value: underWarranty,
      icon: <VerifiedUserIcon />,
      color: "#16A34A",
      gradient: "linear-gradient(135deg, #16A34A 0%, #22C55E 100%)",
      bg: "#F0FDF4",
      percentage: ((underWarranty / totalStatus) * 100).toFixed(1),
      severity: "success",
    },
    {
      title: "AMC Covered",
      subtitle: "Active AMC contract",
      value: amcCovered,
      icon: <AutorenewIcon />,
      color: "#2563EB",
      gradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
      bg: "#EFF6FF",
      percentage: ((amcCovered / totalStatus) * 100).toFixed(1),
      severity: "info",
    },
    {
      title: "AMC Required",
      subtitle: "Renewal needed soon",
      value: amcRequired,
      icon: <WarningAmberIcon />,
      color: "#D97706",
      gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
      bg: "#FFFBEB",
      percentage: ((amcRequired / totalStatus) * 100).toFixed(1),
      severity: "warning",
    },
    {
      title: "AMC Expired",
      subtitle: "Requires immediate action",
      value: amcExpired,
      icon: <GppBadIcon />,
      color: "#DC2626",
      gradient: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
      bg: "#FEF2F2",
      percentage: ((amcExpired / totalStatus) * 100).toFixed(1),
      severity: "error",
    },
  ];

  /* =============================================
     PRINTER BRAND DATA
  ============================================= */
  const totalPrinters = printerHP + printerCanon + printerBrother + printerOthers || 1;

  const printerCards = [
    {
      title: "HP",
      subtitle: "Hewlett-Packard",
      value: printerHP,
      color: "#0096D6",
      gradient: "linear-gradient(135deg, #0096D6 0%, #00A3E0 100%)",
      bg: "#E0F4FF",
      lightBar: "#BAE6FD",
      midBar: "#38BDF8",
    },
    {
      title: "Canon",
      subtitle: "Canon Inc.",
      value: printerCanon,
      color: "#CC0000",
      gradient: "linear-gradient(135deg, #CC0000 0%, #E60000 100%)",
      bg: "#FFE5E5",
      lightBar: "#FECACA",
      midBar: "#F87171",
    },
    {
      title: "Brother",
      subtitle: "Brother Industries",
      value: printerBrother,
      color: "#004B87",
      gradient: "linear-gradient(135deg, #004B87 0%, #0066B3 100%)",
      bg: "#E0EEFF",
      lightBar: "#BFDBFE",
      midBar: "#60A5FA",
    },
    {
      title: "Others",
      subtitle: "Epson, Ricoh, etc.",
      value: printerOthers,
      color: "#64748B",
      gradient: "linear-gradient(135deg, #64748B 0%, #94A3B8 100%)",
      bg: "#F1F5F9",
      lightBar: "#E2E8F0",
      midBar: "#CBD5E1",
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", p: { xs: 2, md: 3 } }}>

      {/* =============== PAGE HEADER =============== */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              "& svg": { fontSize: 23 },
            }}
          >
            <DashboardRoundedIcon />
          </Box>
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                color: "#0F172A",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                fontSize: { xs: "1.4rem", md: "1.9rem" },
              }}
            >
              Nabanna Hardware Inventory
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "#64748B",
            ml: 7,
            fontWeight: 400,
            fontSize: "0.88rem",
          }}
        >
          Real-time overview of installed systems, peripherals, printer brands & warranty/AMC coverage
        </Typography>
      </Box>

      {/* =============== INSTALLED SYSTEMS =============== */}
      <SectionHeader
        icon={<DevicesIcon sx={{ fontSize: 20 }} />}
        title="Installed Systems"
        subtitle={`${totalSystems} total assets across 7 categories`}
        color="#4F46E5"
      />

      <Grid container spacing={2.5} sx={{ mb: 5 }}>
        {systemCards.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.title}>
            <HardwareCard {...item} />
          </Grid>
        ))}
      </Grid>

      {/* =============== WARRANTY / AMC STATUS =============== */}
      <SectionHeader
        icon={<SecurityRoundedIcon sx={{ fontSize: 20 }} />}
        title="Warranty & AMC Status"
        subtitle={`${totalStatus} systems tracked for coverage`}
        color="#16A34A"
      />

      <Grid container spacing={2.5} sx={{ mb: 5 }}>
        {statusCards.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <StatusCard {...item} />
          </Grid>
        ))}
      </Grid>

      {/* =============== PRINTER BRAND DETAILS =============== */}
      <SectionHeader
        icon={<PrintRoundedIcon sx={{ fontSize: 20 }} />}
        title="Printer Brand Breakdown"
        subtitle={`${printer} printers across ${new Set(printerCards.filter(c => c.value > 0).map(c => c.title)).size || 0} brands`}
        color="#DC2626"
      />

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top accent */}
        <Box
          sx={{
            height: 3,
            background: "linear-gradient(90deg, #0096D6 0%, #CC0000 33%, #004B87 66%, #64748B 100%)",
          }}
        />

        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2.5}>
            {printerCards.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <PrinterBrandCard
                  {...item}
                  total={totalPrinters}
                />
              </Grid>
            ))}
          </Grid>

          {/* Stacked bar at bottom */}
          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#94A3B8", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.5px" }}
              >
                BRAND DISTRIBUTION
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.75rem" }}
              >
                {printer} total printers
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 10,
                borderRadius: 5,
                backgroundColor: "#F1F5F9",
                overflow: "hidden",
                display: "flex",
              }}
            >
              {printerCards
                .filter((c) => c.value > 0)
                .map((item) => (
                  <Box
                    key={item.title}
                    sx={{
                      height: "100%",
                      width: `${(item.value / totalPrinters) * 100}%`,
                      background: item.gradient,
                      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      "&:first-of-type": {
                        borderRadius: "5px 0 0 5px",
                      },
                      "&:last-of-type": {
                        borderRadius: "0 5px 5px 0",
                      },
                      "&:only-of-type": {
                        borderRadius: 5,
                      },
                    }}
                  />
                ))}
            </Box>

            {/* Legend */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 1.5,
              }}
            >
              {printerCards.map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: item.gradient,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.72rem" }}
                  >
                    {item.title}{" "}
                    <Box component="span" sx={{ color: "#94A3B8", fontWeight: 400 }}>
                      ({item.value})
                    </Box>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Box>
  );
};


/* =====================================================
   SECTION HEADER
===================================================== */
const SectionHeader = ({ icon, title, subtitle, color }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 2.5,
      pb: 1.5,
      borderBottom: "2px solid #E2E8F0",
      position: "relative",
    }}
  >
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: 1.5,
        background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ color: "#0F172A", lineHeight: 1.3, fontSize: "1.05rem" }}
      >
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500 }}>
        {subtitle}
      </Typography>
    </Box>
    <Box
      sx={{
        position: "absolute",
        bottom: -2,
        left: 0,
        width: 80,
        height: 2,
        borderRadius: 1,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }}
    />
  </Box>
);


/* =====================================================
   HARDWARE CARD — INSTALLED SYSTEMS
===================================================== */
const HardwareCard = ({ title, subtitle, value, icon, color, gradient, bg, chip, highlight }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      borderRadius: 3,
      border: "1px solid #E2E8F0",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      background: highlight
        ? `linear-gradient(135deg, ${bg} 0%, #F8FAFC 100%)`
        : "#FFFFFF",

      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: `0 12px 32px ${color}15, 0 4px 12px rgba(0,0,0,0.06)`,
        borderColor: `${color}40`,
        "& .hw-icon": {
          transform: "scale(1.08)",
          boxShadow: `0 6px 20px ${color}30`,
        },
        "& .hw-value": {
          color: color,
        },
      },
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: gradient,
        opacity: highlight ? 1 : 0.6,
        transition: "opacity 0.3s ease",
      }}
    />

    <CardContent sx={{ p: 2.5, pt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box
          className="hw-icon"
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: gradient,
            color: "#FFFFFF",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: `0 4px 12px ${color}25`,
            "& svg": { fontSize: 26 },
          }}
        >
          {icon}
        </Box>

        {chip && (
          <Chip
            label={chip}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.7rem",
              fontWeight: 700,
              backgroundColor: bg,
              color: color,
              border: `1px solid ${color}20`,
              borderRadius: 1.5,
            }}
          />
        )}

        {highlight && (
          <Chip
            label="TOTAL"
            size="small"
            sx={{
              height: 24,
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.5px",
              backgroundColor: color,
              color: "#FFFFFF",
              borderRadius: 1.5,
            }}
          />
        )}
      </Box>

      <Typography
        className="hw-value"
        variant="h3"
        fontWeight={800}
        sx={{
          color: "#0F172A",
          lineHeight: 1,
          mt: 2.5,
          fontSize: "2rem",
          transition: "color 0.3s ease",
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ mt: 1, color: "#334155", fontSize: "0.9rem", lineHeight: 1.3 }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#94A3B8", fontWeight: 500, fontSize: "0.75rem", display: "block", mt: 0.25 }}
      >
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);


/* =====================================================
   STATUS CARD — WARRANTY / AMC
===================================================== */
const StatusCard = ({ title, subtitle, value, icon, color, gradient, bg, percentage, severity }) => {
  const severityMap = {
    success: { light: "#DCFCE7", mid: "#86EFAC", bar: "#22C55E" },
    info:    { light: "#DBEAFE", mid: "#93C5FD", bar: "#3B82F6" },
    warning: { light: "#FEF3C7", mid: "#FCD34D", bar: "#F59E0B" },
    error:   { light: "#FEE2E2", mid: "#FCA5A5", bar: "#EF4444" },
  };
  const palette = severityMap[severity] || severityMap.info;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid #E2E8F0",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 12px 32px ${color}15, 0 4px 12px rgba(0,0,0,0.06)`,
          borderColor: `${color}40`,
          "& .st-icon": {
            transform: "scale(1.08)",
            boxShadow: `0 6px 20px ${color}30`,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: gradient,
        }}
      />

      <CardContent sx={{ p: 2.5, pt: 3 }}>
        <Box
          className="st-icon"
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: gradient,
            color: "#FFFFFF",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: `0 4px 12px ${color}25`,
            "& svg": { fontSize: 26 },
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="h3"
          fontWeight={800}
          sx={{ color: "#0F172A", lineHeight: 1, mt: 2.5, fontSize: "2rem", letterSpacing: "-0.5px" }}
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={700}
          sx={{ mt: 1, color: "#334155", fontSize: "0.9rem", lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#94A3B8", fontWeight: 500, fontSize: "0.75rem", display: "block", mt: 0.25 }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ mt: 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 600, fontSize: "0.7rem" }}>
              COVERAGE
            </Typography>
            <Typography variant="caption" sx={{ color: color, fontWeight: 800, fontSize: "0.75rem" }}>
              {percentage}%
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 6,
              borderRadius: 3,
              backgroundColor: palette.light,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${Math.min(parseFloat(percentage), 100)}%`,
                borderRadius: 3,
                background: `linear-gradient(90deg, ${palette.bar}, ${palette.mid})`,
                transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                  animation: "shimmer 2.5s infinite",
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};


/* =====================================================
   PRINTER BRAND CARD
===================================================== */
const PrinterBrandCard = ({ title, subtitle, value, color, gradient, bg, lightBar, midBar, total }) => {
  const percentage = ((value / total) * 100).toFixed(1);

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        bgcolor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

        "&:hover": {
          borderColor: `${color}40`,
          boxShadow: `0 8px 24px ${color}12`,
          transform: "translateY(-3px)",
          "& .printer-icon": {
            transform: "scale(1.08)",
            boxShadow: `0 6px 20px ${color}30`,
          },
        },
      }}
    >
      {/* Left accent bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 4,
          background: gradient,
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", pl: 0.5 }}>
        <Box
          className="printer-icon"
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: gradient,
            color: "#FFFFFF",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: `0 4px 12px ${color}20`,
            "& svg": { fontSize: 24 },
          }}
        >
          <PrintIcon />
        </Box>

        <Chip
          label={`${percentage}%`}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.68rem",
            fontWeight: 700,
            backgroundColor: bg,
            color: color,
            border: `1px solid ${color}18`,
            borderRadius: 1.5,
          }}
        />
      </Box>

      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          color: "#0F172A",
          lineHeight: 1,
          mt: 2,
          fontSize: "1.75rem",
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ mt: 0.75, color: "#334155", fontSize: "0.88rem", lineHeight: 1.2 }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#94A3B8", fontWeight: 500, fontSize: "0.72rem", display: "block", mt: 0.15 }}
      >
        {subtitle}
      </Typography>

      {/* Mini progress */}
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            width: "100%",
            height: 5,
            borderRadius: 3,
            backgroundColor: lightBar,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${Math.min(parseFloat(percentage), 100)}%`,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${color}, ${midBar})`,
              transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                animation: "shimmer 2.5s infinite",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SystemDashboard;