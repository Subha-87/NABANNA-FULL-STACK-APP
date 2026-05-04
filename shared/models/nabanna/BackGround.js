"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import NabannaImg from "../../../../../public/LoginImage/1610054768_nabanna.jpg";
import ITLogin from "../../../frontend/src/app/(public)/subdivision/LoginFormSubdivision/ITLogin";
import { Suspense } from "react";

const BackGround = () => {
  return (
    <div className="relative flex h-100 items-center justify-center overflow-hidden">
      <Image
        src={NabannaImg}
        alt="Cover Background"
        objectPosition="center"
        objectFit="cover"
        layout="fill"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-white text-center m-3">
          IT Personnel Login
        </h2>
        <Suspense fallback={null}>
          <ITLogin />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default BackGround;
