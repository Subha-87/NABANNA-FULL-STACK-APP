"use client";

import { useState } from "react";

export default function ITcontact() {
  const [activeTab, setActiveTab] = useState("se");

  const offices = [
    {
      id: "se",
      title: "Office of The Superintending Engineer",
      designation: "Superintending Engineer, IT Circle, PWD",
      address: [
        "P-16, Indian Exchange Place Extension",
        "K.I.T BUILDING (Annex), Kolkata - 700073",
        "IT Circle, Public Works Department",
        "Govt. of West Bengal",
      ],
      email: "seitpwd@wb.gov.in",
      phone: "919073362222",
      phoneDisplay: "+91 90733 62222",
      mapCoords: "22.5686,88.3485",
      mapZoom: 16,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      id: "ee",
      title: "Office of The Executive Engineer",
      designation: "Executive Engineer, Kolkata IT Division, PWD",
      address: [
        "Main Block, Ground Floor",
        "Writers' Building, Kolkata - 700 001",
      ],
      email: "eeitpwd@wb.gov.in",
      phone: "03322544921",
      phoneDisplay: "033 2254-4921 / 4451",
      phoneSecondary: "03322143801",
      phoneSecondaryDisplay: "033 2214-3801",
      mapCoords: "22.5726,88.3489",
      mapZoom: 17,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
        </svg>
      ),
    },
    {
      id: "ae",
      title: "Office of The Assistant Engineer",
      designation: "Assistant Engineer, Nabanna IT-Sub Division, PWD",
      address: [
        "Nabanna Building, Room No - 110",
        "Mandirtala, Howrah - 711102",
      ],
      email: "ae2itpwd@gmail.com",
      phone: "03322535282",
      phoneDisplay: "033 2253-5282 / 5018",
      mapCoords: "22.5761,88.2636",
      mapZoom: 16,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
  ];

  const activeOffice = offices.find((o) => o.id === activeTab);

  return (
    <div className="w-full bg-slate-50">
      {/* ───── Top Government Banner ───── */}
      <div className="bg-gradient-to-r from-[#1a3a5c] via-[#1e4d7b] to-[#1a3a5c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-full border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0">
              <svg className="w-12 h-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <p className="text-amber-300 text-xs tracking-[0.25em] uppercase font-semibold mb-1">Government of West Bengal</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                PWD — IT Department
              </h1>
              <p className="text-blue-200 text-sm sm:text-base mt-1.5 max-w-2xl">
                Public Works Department, Information Technology Circle, West Bengal
              </p>
            </div>
          </div>
        </div>
        <div className="h-1 flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
      </div>

      {/* ───── Page Title ───── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1a3a5c] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Contact Us</h2>
              <p className="text-slate-500 text-sm">Get in touch with our offices</p>
            </div>
          </div>
        </div>
      </div>

      {/* ───── Main Content ───── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ─── LEFT: Office Cards + Map ─── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Office Tab Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200">
                <nav className="flex" aria-label="Office selection">
                  {offices.map((office) => (
                    <button
                      key={office.id}
                      onClick={() => setActiveTab(office.id)}
                      className={`flex-1 px-3 sm:px-5 py-4 text-xs sm:text-sm font-semibold transition-all duration-200 text-center ${
                        activeTab === office.id
                          ? "bg-[#1a3a5c] text-white shadow-inner"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="hidden sm:inline">{office.title.replace("Office of The ", "")}</span>
                      <span className="sm:hidden">
                        {office.id === "se" ? "S.E." : office.id === "ee" ? "E.E." : "A.E."}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Active Office Detail */}
              <div className="p-6 sm:p-8 animate-[fadeIn_0.3s_ease]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                    {activeOffice.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{activeOffice.title}</h3>
                    <p className="text-sm text-[#1a3a5c] font-medium mt-0.5">{activeOffice.designation}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Visit Us */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-md bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Visit Us</p>
                      {activeOffice.address.map((line, i) => (
                        <p key={i} className="text-slate-700 text-sm leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>

                  {/* Call Us */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Call Us</p>
                      <a href={`tel:${activeOffice.phone}`} className="text-slate-700 text-sm font-medium hover:text-[#1a3a5c] transition-colors">
                        {activeOffice.phoneDisplay}
                      </a>
                      {activeOffice.phoneSecondary && (
                        <p className="text-slate-500 text-sm mt-0.5">
                          <a href={`tel:${activeOffice.phoneSecondary}`} className="hover:text-[#1a3a5c] transition-colors">
                            {activeOffice.phoneSecondaryDisplay}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Us */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Us</p>
                      <a href={`mailto:${activeOffice.email}`} className="text-[#1a3a5c] text-sm font-medium hover:underline">
                        {activeOffice.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1a3a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Location Map</span>
                <span className="text-xs text-slate-400 ml-auto">
                  {activeOffice.title.replace("Office of The ", "")}
                </span>
              </div>
              <div className="aspect-[16/9] sm:aspect-[16/10]">
                <iframe
                  key={activeOffice.id}
                  title="Office Location"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(activeOffice.mapCoords.split(",")[1]) - 0.005},${parseFloat(activeOffice.mapCoords.split(",")[0]) - 0.004},${parseFloat(activeOffice.mapCoords.split(",")[1]) + 0.005},${parseFloat(activeOffice.mapCoords.split(",")[0]) + 0.004}&layer=mapnik&marker=${activeOffice.mapCoords}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
                <a
                  href={`https://www.openstreetmap.org/?mlat=${activeOffice.mapCoords.split(",")[0]}&mlon=${activeOffice.mapCoords.split(",")[1]}#map=${activeOffice.mapZoom}/${activeOffice.mapCoords}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1a3a5c] hover:underline"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Open in Full Map
                </a>
              </div>
            </div>

            {/* Quick Reference — All Offices */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-800">Quick Reference — All Offices</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {offices.map((office) => (
                  <div key={office.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="sm:w-44 flex-shrink-0">
                      <p className="text-xs font-bold text-[#1a3a5c]">
                        {office.id === "se" ? "S.E." : office.id === "ee" ? "E.E." : "A.E."}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{office.address[0]}</p>
                    </div>
                    <div className="flex-1 text-xs text-slate-600">
                      <span className="hidden sm:inline">{office.address.slice(1).join(", ")}</span>
                      <span className="sm:hidden">{office.address[1]}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <a href={`tel:${office.phone}`} className="text-xs text-[#1a3a5c] font-medium hover:underline whitespace-nowrap">
                        {office.phoneDisplay}
                      </a>
                      <a href={`mailto:${office.email}`} className="text-xs text-blue-500 hover:underline whitespace-nowrap">
                        Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Contact Form ─── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#1a3a5c] to-[#1e4d7b] px-6 py-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Write to Us
                </h3>
                <p className="text-blue-200 text-xs mt-1">Fields marked with * are mandatory</p>
              </div>

              {/* Formik-ready form — just UI, no formik logic yet */}
              <form
                className="p-6 space-y-5"
                onSubmit={(e) => e.preventDefault()}
                noValidate
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors placeholder:text-slate-400 bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors placeholder:text-slate-400 bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors placeholder:text-slate-400 bg-white"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    defaultValue=""
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors text-slate-700 bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Enquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="network">Network Issues</option>
                    <option value="website">Website Related</option>
                    <option value="software">Software / License</option>
                    <option value="hardware">Hardware / Procurement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Office Preference */}
                <div>
                  <label htmlFor="office" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Address to Office
                  </label>
                  <select
                    id="office"
                    name="office"
                    defaultValue="se"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors text-slate-700 bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
                  >
                    <option value="se">S.E. — IT Circle, K.I.T. Building</option>
                    <option value="ee">E.E. — Kolkata IT Division, Writers' Building</option>
                    <option value="ae">A.E. — Nabanna IT-Sub Division</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Describe your query or concern in detail..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-colors placeholder:text-slate-400 resize-none bg-white"
                  />
                  <p className="text-right text-[10px] text-slate-400 mt-1">Max 1000 characters</p>
                </div>

                {/* Captcha placeholder */}
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center">
                  <p className="text-xs text-slate-500">
                    <svg className="w-4 h-4 inline-block mr-1 text-slate-400 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    CAPTCHA verification will appear here
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1a3a5c] to-[#1e4d7b] text-white font-semibold text-sm py-3 rounded-lg hover:from-[#142d49] hover:to-[#173d62] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Submit Enquiry
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  By submitting this form, you agree that the information provided is accurate.
                  <br />This is a Government of West Bengal portal.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ───── Footer ───── */}
      <footer className="bg-[#0f2740] text-white mt-12">
        <div className="h-1 flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-amber-300 text-xs tracking-[0.2em] uppercase font-semibold">Government of West Bengal</p>
              <p className="text-blue-200 text-sm mt-1">PWD — IT Circle | Public Works Department</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-blue-300">
              <a href="mailto:seitpwd@wb.gov.in" className="hover:text-white transition-colors">seitpwd@wb.gov.in</a>
              <span className="hidden sm:inline text-blue-500">|</span>
              <a href="tel:919073362222" className="hover:text-white transition-colors">+91 90733 62222</a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-4 text-center">
            <p className="text-[11px] text-blue-400/60">
              © {new Date().getFullYear()} PWD IT Department, Govt. of West Bengal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
