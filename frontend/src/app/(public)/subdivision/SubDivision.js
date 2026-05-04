"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./ImageSlide.css";

import nabanna from "../../../../public/SlideImage/Nabanna_(নবান্ন)_building_facade.jpg";
import writers from "../../../../public/SlideImage/writers-building-kolkata-tourism-entry-fee-timings-holidays-reviews-header.jpg";
import alipore from "../../../../public/SlideImage/1681456745_dhono.jpg";
// import required modules

import Link from "next/link";

const SubDivision = () => {
  const ITsubDivisions = [
    {
      name: "Nabanna IT-SubDivision",
      slug: "nabanna",
      image: nabanna,
    },
    {
      name: "Writers IT-SubDivision",
      slug: "writers",
      image: writers,
    },
    {
      name: "Alipore IT-SubDivision",
      slug: "alipore",
      image: alipore,
    },
  ];
  const imgLink = {
    border: "2px solid blue",
    borderRadius: "8px",
    color: "green",
    fontSize: "20px",
  };
  return (
    <Swiper
      effect="coverflow"
      centeredSlides={true}
      grabCursor={true}
      slidesPerView="auto"
      modules={[EffectCoverflow, Autoplay]}
      
      coverflowEffect={{
        rotate: 20,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: true,
      }}
    >
      {ITsubDivisions.map((item) => (
        <SwiperSlide key={item.slug} className="swiper-slide">
          <Link href={`/subdivision/${item.slug}`}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="slideImage"
             
            />
            <div className="overlay">
              <h3>{item.name}</h3>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SubDivision;
