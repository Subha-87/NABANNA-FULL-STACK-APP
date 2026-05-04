"use client"
import { Container } from "react-bootstrap";
import SubDivision from "./SubDivision";
import "./mainShow.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import backCoverImg from "../../../../public/backgroundImg/6106991.jpg";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 🔥 Background (ONLY content area) /* Animated Background * */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 ,filter: "brightness(0.9)"}}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          backgroundImage: `url(${backCoverImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🎯 Content */}
      <div className="relative z-10 flex flex-col h-full items-center justify-between py-6">
        {/* Title */}
        <div className="text-center mt-4">
          <div className="text-3xl font-bold text-white drop-shadow-lg">
            KOLKATA IT DIVISION PWD
          </div>

          <div className="text-lg text-gray-200 flex items-center justify-center gap-2 mt-2">
            <ArrowCircleLeftIcon />
            Select Your IT SubDivision
            <ArrowCircleRightIcon />
          </div>
        </div>

        {/* Slider */}
        <div className="w-full max-w-5xl pb-6">
          <SubDivision />
        </div>
      </div>
    </div>
  );
}
