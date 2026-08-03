import { useEffect, useState } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import {
  Typography,
  Box,
  Dialog,
  IconButton,
  Chip,
  Paper,
  Tooltip,
  Zoom,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";
import { headerStyle, contentStyle, footerStyle, formWrapperStyle } from "../ModalForm/modalStyle";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_API_BASE || "";

const buildImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (!BASE_IMAGE_URL && path.startsWith("/")) {
    return path;
  }
  const base = BASE_IMAGE_URL.endsWith("/") 
    ? BASE_IMAGE_URL.slice(0, -1) 
    : BASE_IMAGE_URL;
  const finalPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${finalPath}`;
};

const ImageSkeleton = () => (
  <Box
    sx={{
      width: "100%",
      height: "300px",
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      borderRadius: "12px",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "200% 0" },
        "100%": { backgroundPosition: "-200% 0" },
      },
    }}
  />
);

const ImageDots = ({ total, current, onClick }) => (
  <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
    {Array.from({ length: total }, (_, i) => (
      <Box
        key={i}
        onClick={() => onClick(i)}
        sx={{
          width: current === i ? 24 : 8,
          height: 8,
          borderRadius: "4px",
          backgroundColor: current === i ? "#1a237e" : "#c5cae9",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#3949ab",
          },
        }}
      />
    ))}
  </Box>
);

// ==================== REUSABLE FULL IMAGE DIALOG ====================
const FullImageDialog = ({ open, onClose, imageUrl, alt, showNav, index, total, onPrev, onNext, onDotClick }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleClose = () => {
    setZoomLevel(1);
    onClose();
  };

  const handlePrev = () => {
    setZoomLevel(1);
    onPrev();
  };

  const handleNext = () => {
    setZoomLevel(1);
    onNext();
  };

  const handleDotClick = (i) => {
    setZoomLevel(1);
    onDotClick(i);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = alt || "image";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={300}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
          maxHeight: "95vh",
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* ===== TOP BAR ===== */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        >
          <Chip
            label={showNav ? `Image ${index + 1} of ${total}` : alt}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontWeight: 600,
              backdropFilter: "blur(10px)",
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Zoom Out">
              <IconButton
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.3)",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Chip
              label={`${Math.round(zoomLevel * 100)}%`}
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
                height: "40px",
              }}
            />
            <Tooltip title="Zoom In">
              <IconButton
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.3)",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton
                onClick={handleDownload}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                onClick={handleClose}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(211, 47, 47, 0.6)",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* ===== IMAGE ===== */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            overflow: "auto",
            p: 4,
          }}
        >
          <img
            src={imageUrl}
            alt={alt}
            crossOrigin="anonymous"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease",
              borderRadius: "8px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>

        {/* ===== BOTTOM NAVIGATION (only for multi-image) ===== */}
        {showNav && total > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              p: 2,
              background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
            }}
          >
            <Tooltip title="Previous">
              <IconButton
                onClick={handlePrev}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Tooltip>
            <ImageDots total={total} current={index} onClick={handleDotClick} />
            <Tooltip title="Next">
              <IconButton
                onClick={handleNext}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

// ==================== MAIN COMPONENT ====================
export const Challan_Estimate = ({ id }) => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [work_order_no, setWork_order_no] = useState("");
  const [orderImage, setOrderImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  // ===== NEW: Separate dialog states for Work Order and Challan =====
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isChallanDialogOpen, setIsChallanDialogOpen] = useState(false);

  const axios = useAxios();

  useEffect(() => {
    fetchImages();
  }, [id]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/estimateReg/view/${id}`);
      setImages(res.data.challan_img || []);
      setOrderImage(res.data.order_img || "");
      setWork_order_no(res.data.order_no);
    } catch (error) {
      console.error("Error fetching images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleDotClick = (i) => {
    setIndex(i);
  };

  const handleDownload = (imageUrl, filename) => {
    const fullUrl = buildImageUrl(imageUrl);
    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = filename || "image";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageLoad = (key) => {
    setImageLoaded((prev) => ({ ...prev, [key]: true }));
  };

  const handleImageError = (key) => {
    console.error(`Failed to load image: ${key}`);
    setImageLoaded((prev) => ({ ...prev, [key]: "error" }));
  };

  // No data state
  if (!loading && !images.length && !orderImage) {
    return (
      <Box sx={formWrapperStyle}>
        <Box sx={headerStyle}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)",
              }}
            >
              <ImageIcon style={{ fontSize: "1.5rem", color: "#1a237e" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontSize: "1.25rem",
                }}
              >
                Document Viewer
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ffd54f", fontSize: "0.85rem", fontWeight: 500 }}
              >
                View Work Order & Challan Copies
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            ...contentStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "16px",
              backgroundColor: "#fff3e0",
              border: "2px dashed #ff9800",
            }}
          >
            <ImageIcon sx={{ fontSize: "3rem", color: "#ff9800", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#e65100", fontWeight: 600 }}>
              No Documents Available
            </Typography>
            <Typography variant="body2" sx={{ color: "#ff9800", mt: 1 }}>
              Work order or challan copies have not been uploaded yet.
            </Typography>
          </Paper>
        </Box>
        <Box sx={footerStyle}>
          <Chip
            label="No Data"
            sx={{
              backgroundColor: "#fff3e0",
              color: "#e65100",
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={formWrapperStyle}>
      {/* ===== FIXED HEADER ===== */}
      <Box sx={headerStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(255, 193, 7, 0.4)",
            }}
          >
            <ImageIcon style={{ fontSize: "1.5rem", color: "#1a237e" }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontSize: "1.25rem",
              }}
            >
              Document Viewer
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#ffd54f", fontSize: "0.85rem", fontWeight: 500 }}
            >
              View Work Order & Challan Copies
            </Typography>
          </Box>
          {work_order_no && (
            <Chip
              icon={<DescriptionIcon style={{ color: "#1a237e" }} />}
              label={`WO: ${work_order_no}`}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffd54f",
                fontWeight: 600,
                fontSize: "0.85rem",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 213, 79, 0.3)",
                "& .MuiChip-icon": {
                  color: "#ffd54f",
                },
              }}
            />
          )}
        </Box>
      </Box>

      {/* ===== SCROLLABLE CONTENT ===== */}
      <Box sx={contentStyle}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            minHeight: "400px",
          }}
        >
          {/* ===== LEFT SIDE - WORK ORDER ===== */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #1a237e 0%, #3949ab 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DescriptionIcon style={{ color: "#fff", fontSize: "1.1rem" }} />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: "#1a237e",
                  fontSize: "1.05rem",
                }}
              >
                Work Order
              </Typography>
              {work_order_no && (
                <Chip
                  label={work_order_no}
                  size="small"
                  sx={{
                    backgroundColor: "#e8eaf6",
                    color: "#1a237e",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              )}
            </Box>

            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "2px solid #e8eaf6",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#9fa8da",
                  boxShadow: "0 8px 24px rgba(26, 35, 126, 0.12)",
                },
              }}
            >
              {loading ? (
                <ImageSkeleton />
              ) : orderImage ? (
                <Box sx={{ position: "relative", cursor: "pointer" }}>
                  {!imageLoaded["order"] && imageLoaded["order"] !== "error" && (
                    <ImageSkeleton />
                  )}
                  <img
                    alt="Work Order"
                    src={buildImageUrl(orderImage)}
                    crossOrigin="anonymous"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: imageLoaded["order"] ? "block" : "none",
                      objectFit: "contain",
                      backgroundColor: "#ffffff",
                    }}
                    onLoad={() => handleImageLoad("order")}
                    onError={() => handleImageError("order")}
                    onClick={() => setIsOrderDialogOpen(true)}
                  />
                  {/* Error State */}
                  {imageLoaded["order"] === "error" && (
                    <Box
                      sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "250px",
                        backgroundColor: "#ffebee",
                      }}
                    >
                      <Typography sx={{ color: "#d32f2f", fontWeight: 600 }}>
                        Failed to load image
                      </Typography>
                    </Box>
                  )}
                  {/* ===== Hover Overlay for Work Order ===== */}
                  {imageLoaded["order"] && imageLoaded["order"] !== "error" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(180deg, transparent 60%, rgba(26, 35, 126, 0.4) 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": { opacity: 1 },
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        pb: 2,
                        pointerEvents: "none",
                      }}
                    >
                      <Chip
                        icon={<ZoomInIcon sx={{ color: "#fff !important" }} />}
                        label="Click to Zoom"
                        sx={{
                          backgroundColor: "rgba(26, 35, 126, 0.8)",
                          color: "#ffffff",
                          backdropFilter: "blur(10px)",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  )}
                  {/* Action Buttons */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      display: "flex",
                      gap: 1,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      ".MuiPaper-root:hover > &": { opacity: 1 },
                    }}
                    className="image-actions"
                  >
                    <Tooltip title="Zoom">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOrderDialogOpen(true);
                        }}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "#1a237e",
                            color: "#fff",
                          },
                        }}
                      >
                        <ZoomInIcon sx={{ fontSize: "1.1rem" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(orderImage, `work_order_${work_order_no}`);
                        }}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: "#1a237e",
                            color: "#fff",
                          },
                        }}
                      >
                        <DownloadIcon sx={{ fontSize: "1.1rem" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "250px",
                    backgroundColor: "#fff3e0",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: "#ffe0b2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: "2rem", color: "#ff9800" }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "#e65100", fontWeight: 600 }}
                  >
                    Work Order Not Ready
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#ff9800", mt: 0.5 }}
                  >
                    Document pending upload
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>

          {/* ===== RIGHT SIDE - CHALLAN IMAGES ===== */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #e65100 0%, #ff6d00 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageIcon style={{ color: "#fff", fontSize: "1.1rem" }} />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: "#1a237e",
                  fontSize: "1.05rem",
                }}
              >
                Received Challan
              </Typography>
              {images.length > 0 && (
                <Chip
                  label={`${images.length} file${images.length > 1 ? "s" : ""}`}
                  size="small"
                  sx={{
                    backgroundColor: "#fff3e0",
                    color: "#e65100",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              )}
            </Box>

            <Paper
              elevation={0}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "2px solid #ffe0b2",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#ffcc80",
                  boxShadow: "0 8px 24px rgba(230, 81, 0, 0.12)",
                },
              }}
            >
              {loading ? (
                <ImageSkeleton />
              ) : images && images.length > 0 ? (
                <Box>
                  <Box
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                    onClick={() => setIsChallanDialogOpen(true)}
                  >
                    {!imageLoaded[`challan_${index}`] && imageLoaded[`challan_${index}`] !== "error" && (
                      <ImageSkeleton />
                    )}
                    <img
                      src={buildImageUrl(images[index])}
                      alt={`Challan ${index + 1}`}
                      crossOrigin="anonymous"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "contain",
                        backgroundColor: "#ffffff",
                        display: imageLoaded[`challan_${index}`] ? "block" : "none",
                        transition: "transform 0.3s ease",
                      }}
                      onLoad={() => handleImageLoad(`challan_${index}`)}
                      onError={() => handleImageError(`challan_${index}`)}
                    />
                    {imageLoaded[`challan_${index}`] === "error" && (
                      <Box
                        sx={{
                          p: 4,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "300px",
                          backgroundColor: "#ffebee",
                        }}
                      >
                        <Typography sx={{ color: "#d32f2f", fontWeight: 600 }}>
                          Failed to load image
                        </Typography>
                      </Box>
                    )}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(180deg, transparent 60%, rgba(230, 81, 0, 0.4) 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": { opacity: 1 },
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        pb: 2,
                        pointerEvents: "none",
                      }}
                    >
                      <Chip
                        icon={<ZoomInIcon sx={{ color: "#fff !important" }} />}
                        label="Click to Expand"
                        sx={{
                          backgroundColor: "rgba(230, 81, 0, 0.8)",
                          color: "#ffffff",
                          backdropFilter: "blur(10px)",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ p: 2, backgroundColor: "#ffffff" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tooltip title="Previous">
                        <span>
                          <IconButton
                            onClick={handlePrev}
                            disabled={images.length === 1}
                            sx={{
                              backgroundColor: "#e8eaf6",
                              color: "#1a237e",
                              "&:hover": { backgroundColor: "#1a237e", color: "#ffffff" },
                              "&.Mui-disabled": { backgroundColor: "#f5f5f5", color: "#bdbdbd" },
                            }}
                          >
                            <ArrowBackIosNewIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#1a237e", fontSize: "0.9rem" }}>
                          {index + 1}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#9e9e9e", fontSize: "0.9rem" }}>of</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#757575", fontSize: "0.9rem" }}>
                          {images.length}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Download">
                          <IconButton
                            onClick={() => handleDownload(images[index], `challan_${index + 1}`)}
                            sx={{
                              backgroundColor: "#e8f5e9",
                              color: "#2e7d32",
                              "&:hover": { backgroundColor: "#2e7d32", color: "#ffffff" },
                            }}
                          >
                            <DownloadIcon sx={{ fontSize: "1.1rem" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Next">
                          <span>
                            <IconButton
                              onClick={handleNext}
                              disabled={images.length === 1}
                              sx={{
                                backgroundColor: "#e8eaf6",
                                color: "#1a237e",
                                "&:hover": { backgroundColor: "#1a237e", color: "#ffffff" },
                                "&.Mui-disabled": { backgroundColor: "#f5f5f5", color: "#bdbdbd" },
                              }}
                            >
                              <ArrowForwardIosIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </Box>

                    {images.length > 1 && (
                      <ImageDots total={images.length} current={index} onClick={handleDotClick} />
                    )}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "250px",
                    backgroundColor: "#e8eaf6",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: "#c5cae9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <ImageIcon sx={{ fontSize: "2rem", color: "#3949ab" }} />
                  </Box>
                  <Typography variant="body1" sx={{ color: "#1a237e", fontWeight: 600 }}>
                    Challan Not Received
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5c6bc0", mt: 0.5 }}>
                    Awaiting challan copies from agency
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* ===== FIXED FOOTER ===== */}
      <Box sx={footerStyle}>
        <Chip
          icon={<DescriptionIcon style={{ fontSize: "0.9rem" }} />}
          label="Work Order"
          variant="outlined"
          sx={{
            borderColor: orderImage ? "#4caf50" : "#ff9800",
            color: orderImage ? "#2e7d32" : "#e65100",
            backgroundColor: orderImage ? "#e8f5e9" : "#fff3e0",
            fontWeight: 600,
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
        <Chip
          icon={<ImageIcon style={{ fontSize: "0.9rem" }} />}
          label={`${images.length} Challan${images.length !== 1 ? "s" : ""}`}
          variant="outlined"
          sx={{
            borderColor: images.length > 0 ? "#4caf50" : "#ff9800",
            color: images.length > 0 ? "#2e7d32" : "#e65100",
            backgroundColor: images.length > 0 ? "#e8f5e9" : "#fff3e0",
            fontWeight: 600,
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
        <Typography variant="caption" sx={{ color: "#9e9e9e", ml: 1 }}>
          Click image to zoom
        </Typography>
      </Box>

      {/* ===== WORK ORDER FULL SCREEN DIALOG ===== */}
      <FullImageDialog
        open={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
        imageUrl={buildImageUrl(orderImage)}
        alt={`Work Order - ${work_order_no}`}
        showNav={false}
      />

      {/* ===== CHALLAN FULL SCREEN DIALOG ===== */}
      <FullImageDialog
        open={isChallanDialogOpen}
        onClose={() => setIsChallanDialogOpen(false)}
        imageUrl={buildImageUrl(images[index])}
        alt={`Challan ${index + 1}`}
        showNav={true}
        index={index}
        total={images.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />
    </Box>
  );
};