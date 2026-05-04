import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import NabannaImg from "../../../../public/SlideImage/Nabanna_(নবান্ন)_building_facade.jpg";
import WritersImg from "../../../../public/SlideImage/writers-building-kolkata-tourism-entry-fee-timings-holidays-reviews-header.jpg";
import AliporeImg from "../../../../public/SlideImage/1681456745_dhono.jpg";
import LoginContainer from "./LoginContainer";
import BiswaBangla from "../../../../public/LoginImage/Emblem_of_West_Bengal_(2018-present).svg.png";
import { Suspense } from "react";
import "./mainShow.css";

const config = {
  nabanna: {
    title: "Nabanna IT Sub-Division",
    image: NabannaImg,
  },
  writers: {
    title: "Writers IT Sub-Division",
    image: WritersImg,
  },
  alipore: {
    title: "Alipore IT Sub-Division",
    image: AliporeImg,
  },
};
const LoginPageSubDivision = ({ subdivision }) => {
  const data = config[subdivision];
  if (!data) return <div>Invalid Subdivision</div>;
  return (
    <div className="relative flex h-100 items-center justify-center overflow-hidden">
      <Image
        src={data.image}
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
       
          <div className="flex justify-center items-center">
            <Image
              src={BiswaBangla}
              alt="Biswa Bangla Logo"
              height={90}
              width={90}
            />
          </div>
          <div className="loginTitle">
            IT Personnel Login
          </div>

          <Suspense fallback={null}>
            <LoginContainer subdivision={subdivision} />
          </Suspense>
          <div className="divisionTitle"> {data.title}</div>
      
      </motion.div>
    </div>
  );
};

export default LoginPageSubDivision;
