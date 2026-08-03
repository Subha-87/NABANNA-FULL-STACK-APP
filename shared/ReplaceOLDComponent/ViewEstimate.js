import { useEffect, useState } from "react";
import Image from "next/image";
import { useAxios } from "@/app/Hook/useAxios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Dialog,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//const BASE_IMAGE_URL = "http://localhost:5000";
//const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_API_BASE;;



export const Challan_Estimate = ({ id }) => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [work_order_no, setWork_order_no] = useState("");
  const [open, setOpen] = useState(false);
  const [orderImage, setOrderImage] = useState("");

  const axios = useAxios()

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`/estimateReg/view/${id}`); // your API
      //console.log(res);
      setImages(res.data.challan_img || []);
      setOrderImage(res.data.order_img || "");
      setWork_order_no(res.data.order_no);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images.length) {
    return <Typography>No Order or Challan Copy Yet.</Typography>;
  }
  return (
    <>
      <div className="w-[900px] flex">
        <div className="w-1/2 border-2 border-blue-600 flex flex-column">
          <div className="text-2xl font-semibold font-serif text-center">
            Work Order: <span className="text-red-700">{work_order_no}</span>
          </div>
          <div className="border-1 border-black flex-1">
            {orderImage ? (
              <Image
                alt="Order Image"
                src={`http://10.10.119.160/api${orderImage}`}
                width={0} // Arbitrary value for srcset generation
                height={0} // Arbitrary value for srcset generation
                sizes="100vw" // Image will be 100% of viewport width
                style={{
                  width: "100%",
                  height: "auto", // Maintain aspect ratio
                }}
              />
            ) : (
              <Typography className="text-center text-danger font-semibold">
                Work-Order is Not Ready Yet !!
              </Typography>
            )}
          </div>
        </div>
        <div className="border-1 border-black w-1/2 flex flex-column">
          {images && images.length > 0 ? (
            <>
            <div className="text-center font-semibold text-2xl">Recived Challan</div>
            <Card sx={{ width: 400, mx: "auto" }}>
              <CardMedia
                component="img"
                height="260"
                image={`${BASE_IMAGE_URL}${images[index]}`}
                crossOrigin="anonymous"
                alt="Challan"
                sx={{ objectFit: "contain" }}
                onClick={() => setOpen(true)}
              />
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <IconButton
                    onClick={() =>
                      setIndex(index === 0 ? images.length - 1 : index - 1)
                    }
                    disabled={images.length === 1}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <Typography>
                    {" "}
                    {index + 1} / {images.length}
                  </Typography>
                  <IconButton
                    onClick={() => setIndex((index + 1) % images.length)}
                    disabled={images.length === 1}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
            </>
          ) : (
            <Typography className="text-center text-danger font-semibold">
              Challan Not Recived Yet !!
            </Typography>
          )}
        </div>
      </div>
      {/* FULL IMAGE MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <Box position="relative">
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={`${BASE_IMAGE_URL}${images[index]}`}
            alt="Full Challan"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
            crossOrigin="anonymous"
          />
        </Box>
      </Dialog>
    </>
  );
};
