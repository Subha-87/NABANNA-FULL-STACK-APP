// HomePage.js
"use client";
import Styles from "./HomePage.module.css"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Import images
import GovtLogo from "../../../public/IT PERSONNEL IMAGE/Emblem_of_West_Bengal_(2018-present).svg.png";
import GroupPic from "../../../public/IT PERSONNEL IMAGE/Cover.jpg";
import Logo from "../../../public/LogoImage/02631e9d74234d5fb9e91722f92fc519-free.png";
import Susipra from "../../../public/IT PERSONNEL IMAGE/Susipra.jpg";
import joydeep from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/joydeep.jpg";
import swagatam from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/swagatam.jpg";
import shirshendu from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/shirshendu3.jpg";
import suman from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/suman.jpg";
import debasish from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/deba.jpg";
import rittik from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/rittik.jpg";
import rajdip from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/rajdip.jpg";
import biplab from "../../../public/IT PERSONNEL IMAGE/NETWORK TEAM/Biplab.jpg";
import parthaNag from "../../../public/IT PERSONNEL IMAGE/VOICE TEAM/partha nag.jpg";
import sudipta from "../../../public/IT PERSONNEL IMAGE/VOICE TEAM/sudipta2.jpg";
import joydeb from "../../../public/IT PERSONNEL IMAGE/VOICE TEAM/joydeb2.jpg";
import parthPur from "../../../public/IT PERSONNEL IMAGE/Hardware Team/partha2.jpg";
import subhasis from "../../../public/IT PERSONNEL IMAGE/Hardware Team/subhasis1.jpg";
import akhter from "../../../public/IT PERSONNEL IMAGE/Audio Video/Akhter.jpg";
import Santanu from "../../../public/IT PERSONNEL IMAGE/Audio Video/Santanuda.jpg";
import Suhrid from "../../../public/IT PERSONNEL IMAGE/Audio Video/Surid.jpg"
import Souvik from "../../../public/IT PERSONNEL IMAGE/Audio Video/Souvik.jpg";
import Sougata from "../../../public/IT PERSONNEL IMAGE/Office Team/sougata.jpg";
import Somnath from "../../../public/IT PERSONNEL IMAGE/Office Team/somnath.jpg";
import Priyanka from "../../../public/IT PERSONNEL IMAGE/Office Team/Priyanka.jpg";
import Sanjib from "../../../public/IT PERSONNEL IMAGE/Office Team/sanjib.jpg";
import Sumana from "../../../public/IT PERSONNEL IMAGE/Office Team/sumana.jpg";

import AchivImg1 from "../../../public/IT PERSONNEL IMAGE/Remarkable/0429a2fe-a5dc-4dfe-b8f0-52f30009edf5.jpg";
import AchivImg2 from "../../../public/IT PERSONNEL IMAGE/Remarkable/77e13c8a-daa8-468d-b29c-2f427ab10e66.jpg";
import AchivImg3 from "../../../public/IT PERSONNEL IMAGE/Remarkable/b5949b85-0372-4218-a9dc-05ee9bacf966.jpg";
import AchivImg4 from "../../../public/IT PERSONNEL IMAGE/Remarkable/Rabindra Bhavan.jpg"
import AchivImg5 from "../../../public/IT PERSONNEL IMAGE/Remarkable/car parking.jpg"
import AchivImg6 from "../../../public/IT PERSONNEL IMAGE/Remarkable/auditorium.jpg"

const teamData = [
  {
    category: "Network Engineering Research, Design, Planning & Monitoring",
    members: [
      { name: "Joydeep Ghosh", pic: joydeep },
      { name: "Swagatam Dutta", pic: swagatam },
      { name: "Shirshendu Mukherjee", pic: shirshendu },
    ],
  },
  {
    category: "Ground Zero Network Troubleshooting,Development & Execution",
    members: [
      { name: "Suman Sarder", pic: suman },
      { name: "Debasish Halder", pic: debasish },
      { name: "Rittik Kurmar Dey", pic: rittik },
      { name: "Rajdeep Saha", pic: rajdip },
      { name: "Biplab Majumder", pic: biplab },
    ],
  },
  {
    category: "Hardware & Software Testing,Installation & Product Evaluation",
    members: [
      { name: "Subhasis Das", pic: subhasis },
      { name: "Partha Purkait", pic: parthPur },
    ],
  },
  {
    category:
      "Integrated EPABX System Planning, Testing & Installation Management",
    members: [
      { name: "Partha Nag Choudhury", pic: parthaNag },
      { name: "Sudipta Sarder", pic: sudipta },
      { name: "Joydeb Saha", pic: joydeb },
    ],
  },
  {
    category: "Audio & Video Management System,Planning,Monitoring & Zonal Execution",
    members: [
      { name: "Sk. Akhteruddin", pic: akhter },
      { name: "Santanu Banerjee", pic: Santanu },
      { name: "Suhrid Sen", pic: Suhrid },
      { name: "Souvik Haldar", pic: Souvik },
    ],
  },
  {
    category: "SubDivisional Office Management,Project Estimate & Cost Analytics",
    members: [
      { name: "Sougata Das", pic: Sougata },
      { name: "Somnath Panda", pic: Somnath },
      { name: "Sanjib Rakhshit", pic: Sanjib },
      { name: "Priyanka Halder", pic: Priyanka },
      { name: "Sumana Roy", pic: Sumana },
    ],
  },
];

const achievements = [
  {
    id: 1,
    image: AchivImg1,
    title: "Nabanna Sobhaghar",
    subtitle: "Kolkata Film Festival Inaguration",
  },
  {
    id: 2,
    image: AchivImg2,
    title: "PWD Convocation",
    subtitle: "Nabanna Sobhaghar",
  },
  {
    id: 3,
    image: AchivImg3,
    title: "Sobhaghar",
    subtitle: "Durga Pujo Inaguration",
  },
  {
    id: 4,
    image: AchivImg4,
    title: "Rabindrabhavan",
    subtitle: "Uluberia Auditorium Project",
  },
  {
    id: 5,
    image: AchivImg5,
    title: "Nabanna",
    subtitle: "Car Parking Nabanna",
  },
  {
    id: 6,
    image: AchivImg6,
    title: "Smart Auditorium",
    subtitle: "Dhonodhannya",
  },
];

const domainTags = [
  "Network Engineering",
  "Firewall & Security",
  "IP Telephony & EPABX",
  "CCTV Surveillance",
  "Video Conferencing",
  "Smart Auditorium",
  "RFID Access Control",
  "UVSS & Bollards",
  "LED Display Systems",
];


const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const router = useRouter();

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive carousel cards per view
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(4);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const maxSlide = Math.max(0, achievements.length - cardsPerView);

  // Clamp slide on resize
  useEffect(() => {
    if (currentSlide > maxSlide) setCurrentSlide(maxSlide);
  }, [maxSlide, currentSlide]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxSlide]);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () =>
    setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const slideOffset = -(currentSlide * (100 / cardsPerView));

  return (
    <div className={Styles.container}>
      {/* ─── Hero Section ─── */}
      <section className={Styles.hero}>
        <div
          className={Styles.heroBackground}
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,
            opacity: 1 - scrollY * 0.002,
          }}
        >
          <div className={Styles.overlay} />
          {/* Animated grid lines */}
          <div className={Styles.heroGrid} />
        </div>

        <div className={Styles.heroContent}>
          <div className={Styles.logoWrapper}>
            <Image
              src={Logo}
              alt="Govt Logo"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
              className={Styles.govtLogo}
            />
          </div>

          <p className={Styles.heroTag}>
            Government of West Bengal
          </p>

          <h1 className={Styles.welcomeTitle}>
            Welcome To PWD IT Division
          </h1>

          <div className={Styles.deptInfo}>
            <p className={Styles.department}>PUBLIC WORKS DIRECTORATE</p>
            <p className={Styles.division}>
              Kolkata IT Division, Govt of West Bengal
            </p>
          </div>

          <div className={Styles.heroButtons}>
            <button
              type="button"
              className={Styles.primaryBtn}
              onClick={() => router.push("/about")}
            >
              <span>Explore Services</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button
              type="button"
              className={Styles.secondaryBtn}
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={Styles.scrollIndicator}>
          <div className={Styles.scrollMouse}>
            <div className={Styles.scrollWheel} />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ─── Leader Section  ─── */}
      <section className={Styles.leaderSection}>
        <div className={Styles.sectionHeader}>
          <span className={Styles.subtitle}>Our Visionary Leader</span>
          <h2 className={Styles.sectionTitle}>
            The Banyan Tree of PWD IT
          </h2>
        </div>

        <div className={Styles.leaderCard}>
          <div className={Styles.leaderImageWrapper}>
            <div className={Styles.leaderImageBorder}>
              <Image
                src={Susipra}
                alt="Susipra Mallik"
                width={280}
                height={280}
                className={Styles.leaderImage}
              />
            </div>
            <div className={Styles.leaderBadge}>
              Superintending Engineer
            </div>
          </div>

          <div className={Styles.leaderInfo}>
            <h3 className={Styles.leaderName}>Shri Susipra Mallik</h3>
            <p className={Styles.leaderDesignation}>
              Superintending Engineer, PWD, Govt of West Bengal
            </p>
            <div className={Styles.leaderDivider} />
            <p className={Styles.leaderDesc}>
              The driving force behind PWD IT Division, whose vision and
              innovation have transformed the technological landscape of
              Government of West Bengal. Like a banyan tree providing shelter
              and direction, his guidance has nurtured every IT initiative.
              Under his distinguished leadership, the Division has evolved
              into a robust, end-to-end IT solutions ecosystem — serving as the
              technological backbone of public works infrastructure across the state.
            </p>
            <p className={Styles.leaderDescSecond}>
              From structured network cabling and advanced firewall architecture
              to integrated telephony, CCTV surveillance, smart auditorium systems,
              and state-of-the-art perimeter security — every initiative reflects
              his unwavering pursuit of engineering excellence and digital modernisation.
            </p>
            <div className={Styles.domainTags}>
              {domainTags.map((tag) => (
                <span key={tag} className={Styles.domainTag}>{tag}</span>
              ))}
            </div>
            <div className={Styles.leaderQuote}>
              <span className={Styles.quoteIcon}>"</span>
               Technology is not merely about innovation — it is about empowering
              people, strengthening institutions, and building sustainable
              solutions that serve generations to come.
              <span className={Styles.quoteIcon}>"</span>
            </div>
          </div>
        </div>
      </section>
   

      {/* ─── Team Section ─── */}
      <section className={Styles.teamSection}>
        <div className={Styles.sectionHeader}>
          <span className={Styles.subtitle}>Our Excellence</span>
          <h2 className={Styles.sectionTitle}>
            Dedicated Teams & Expertise
          </h2>
          <p className={Styles.sectionDesc}>
            Committed professionals working together to deliver technological
            excellence
          </p>
        </div>

        {/* ── Group Photo Banner ── */}
        <div className={Styles.groupImageBanner}>
          <div className={Styles.groupImageContainer}>
            <Image
              src={GroupPic}
              alt="PWD IT Division Team"
              fill
              className={Styles.groupImage}
              priority
            />
            <div className={Styles.groupImageOverlay} />
          </div>
          <div className={Styles.groupImageContent}>
            <div className={Styles.groupImageTag}>Our Unified Force</div>
            <h3 className={Styles.groupImageTitle}>
              Together We Engineer the Future
            </h3>
            <p className={Styles.groupImageDesc}>
              A collective of skilled professionals dedicated to building
              and maintaining West Bengal's digital infrastructure
            </p>
          </div>
        </div>

        {/* ── Team Categories ── */}
        {teamData.map((team, idx) => (
          <div key={idx} className={Styles.teamCategory}>
            <div className={Styles.categoryHeader}>
              <div className={Styles.categoryLine} />
              <h3 className={Styles.categoryTitle}>{team.category}</h3>
              <div className={Styles.categoryLineRight} />
            </div>
            <div className={Styles.membersGrid}>
              {team.members.map((member, midx) => (
                <div key={midx} className={Styles.memberCard}>
                  <div className={Styles.memberImageWrapper}>
                    <div className={Styles.memberImageRing} />
                    <Image
                      src={member.pic}
                      alt={member.name}
                      width={120}
                      height={120}
                      className={Styles.memberImage}
                    />
                  </div>
                  <div className={Styles.memberName}>{member.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Remarkable Achievements Section ─── */}
      <section className={Styles.achievementsSection}>
        <div className={Styles.achievementsBgPattern} />
        <div className={Styles.sectionHeader}>
          <span className={`${Styles.subtitle} ${Styles.subtitleLight}`}>
            Landmark Projects
          </span>
          <h2
            className={`${Styles.sectionTitle} ${Styles.sectionTitleLight}`}
          >
            Remarkable Achievements
          </h2>
          <p className={`${Styles.sectionDesc} ${Styles.sectionDescLight}`}>
            Showcasing our landmark infrastructure projects that redefine
            public works across West Bengal
          </p>
        </div>

        <div className={Styles.carouselContainer}>
          <div className={Styles.carouselViewport}>
            <div
              className={Styles.carouselTrack}
              style={{ transform: `translateX(${slideOffset}%)` }}
            >
              {achievements.map((item) => (
                <div key={item.id} className={Styles.achievementCardWrapper}>
                  <div className={Styles.achievementCard}>
                    <div className={Styles.achievementImageContainer}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={Styles.achievementImage}
                      />
                      <div className={Styles.achievementImageOverlay} />
                    </div>
                    <div className={Styles.achievementContent}>
                      <h4 className={Styles.achievementTitle}>
                        {item.title}
                      </h4>
                      <p className={Styles.achievementSubtitle}>
                        {item.subtitle}
                      </p>
                      <button className={Styles.achievementBtn}>
                        READ MORE DETAILS
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className={Styles.carouselNav}>
            <button
              className={`${Styles.carouselArrow} ${
                currentSlide === 0 ? Styles.arrowDisabled : ""
              }`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className={Styles.carouselDots}>
              {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`${Styles.carouselDot} ${
                    i === currentSlide ? Styles.dotActive : ""
                  }`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={`${Styles.carouselArrow} ${
                currentSlide >= maxSlide ? Styles.arrowDisabled : ""
              }`}
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide}
              aria-label="Next slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className={Styles.ctaSection}>
        <div className={Styles.ctaGlow} />
        <div className={Styles.ctaContent}>
          <h3 className={Styles.ctaTitle}>Ready to Collaborate?</h3>
          <p className={Styles.ctaDesc}>
            Connect with our teams for innovative IT solutions and technical
            expertise
          </p>
          <button
            className={Styles.ctaButton}
            onClick={() => router.push("/contact")}
          >
            <span>Get in Touch</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;