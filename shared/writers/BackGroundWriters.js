"use client"

import writersImg from "../../../../../public/SlideImage/writers-building-kolkata-tourism-entry-fee-timings-holidays-reviews-header.jpg"
import React from 'react'
import Image from "next/image"

const BackGroundWriters = () => {
  return (
     <div className="relative w-full h-screen">
      
      {/* Background Image */}
      <Image
        src={writersImg}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Center Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        
        {/* Card */}
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 text-white">
          
          {/* Title (optional) */}
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">
            Welcome Back
          </h2>

          {/* Placeholder for Login Component */}
          <div className="text-center text-gray-500">
            {/* Replace this with your Login Component */}
            Login Component Here
          </div>

        </div>
      </div>
    </div>
  )
}

export default BackGroundWriters
