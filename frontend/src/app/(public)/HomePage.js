// HomePage.js
"use client";
import Styles from "./HomePage.module.css";
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
import Suhrid from "../../../public/IT PERSONNEL IMAGE/Audio Video/Surid.jpg";
import Souvik from "../../../public/IT PERSONNEL IMAGE/Audio Video/Souvik.jpg";
import Sougata from "../../../public/IT PERSONNEL IMAGE/Office Team/sougata.jpg";
import Somnath from "../../../public/IT PERSONNEL IMAGE/Office Team/somnath.jpg";
import Priyanka from "../../../public/IT PERSONNEL IMAGE/Office Team/Priyanka.jpg";
import Sanjib from "../../../public/IT PERSONNEL IMAGE/Office Team/sanjib.jpg";
import Sumana from "../../../public/IT PERSONNEL IMAGE/Office Team/sumana.jpg";

import AchivImg1 from "../../../public/IT PERSONNEL IMAGE/Remarkable/0429a2fe-a5dc-4dfe-b8f0-52f30009edf5.jpg";
import AchivImg2 from "../../../public/IT PERSONNEL IMAGE/Remarkable/77e13c8a-daa8-468d-b29c-2f427ab10e66.jpg";
import AchivImg3 from "../../../public/IT PERSONNEL IMAGE/Remarkable/b5949b85-0372-4218-a9dc-05ee9bacf966.jpg";
import AchivImg4 from "../../../public/IT PERSONNEL IMAGE/Remarkable/Rabindra Bhavan.jpg";
import AchivImg5 from "../../../public/IT PERSONNEL IMAGE/Remarkable/car parking.jpg";
import AchivImg6 from "../../../public/IT PERSONNEL IMAGE/Remarkable/auditorium.jpg";

const teamData = [
  {
    category: "Network Engineering Research, Design, Planning & Monitoring",
    icon: "◈",
    members: [
      { name: "Joydeep Ghosh", pic: joydeep },
      { name: "Swagatam Dutta", pic: swagatam },
      { name: "Shirshendu Mukherjee", pic: shirshendu },
    ],
  },
  {
    category: "Ground Zero Network Troubleshooting, Development & Execution",
    icon: "◉",
    members: [
      { name: "Suman Sarder", pic: suman },
      { name: "Debasis Halder", pic: debasish },
      { name: "Rittik Kumar Dey", pic: rittik },
      { name: "Rajdip Dutta", pic: rajdip },
      { name: "Biplab Majumder", pic: biplab },
    ],
  },
  {
    category: "Hardware & Software Testing, Installation & Product Evaluation",
    icon: "◧",
    members: [
      { name: "Subhasis Das", pic: subhasis },
      { name: "Partha Purkait", pic: parthPur },
    ],
  },
  {
    category: "Integrated EPABX System Planning, Testing & Installation Management",
    icon: "◎",
    members: [
      { name: "Partha Nag Choudhury", pic: parthaNag },
      { name: "Sudipta Sarder", pic: sudipta },
      { name: "Joydeb Saha", pic: joydeb },
    ],
  },
  {
    category: "Audio & Video Management System, Planning, Monitoring & Zonal Execution",
    icon: "◈",
    members: [
      { name: "Sk. Akhteruddin", pic: akhter },
      { name: "Santanu Banerjee", pic: Santanu },
      { name: "Suhrid Sen", pic: Suhrid },
      { name: "Souvik", pic: Souvik },
    ],
  },
  {
    category: "SubDivisional Office Management, Project Estimate & Cost Analytics",
    icon: "◐",
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
    subtitle: "Kolkata Film Festival Inauguration",
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
    subtitle: "Durga Puja Inauguration",
  },
  {
    id: 4,
    image: AchivImg4,
    title: "Rabindra Bhavan",
    subtitle: "Uluberia Auditorium Project",
  },
  {
    id: 5,
    image: AchivImg5,
    title: "Nabanna",
    subtitle: "Car Parking Management — Nabanna",
  },
  {
    id: 6,
    image: AchivImg6,
    title: "Smart Auditorium",
    subtitle: "Dhonodhannya Auditorium",
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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (currentSlide > maxSlide) setCurrentSlide(maxSlide);
  }, [maxSlide, currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxSlide]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const slideOffset = -(currentSlide * (100 / cardsPerView));

  return (
    <div className={Styles.container}>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className={Styles.hero}>
        <div
          className={Styles.heroBackground}
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,
            opacity: 1 - scrollY * 0.002,
          }}
        >
          <div className={Styles.overlay} />
          <div className={Styles.heroGrid} />
        </div>

        {/* Floating accent lines */}
        <div className={Styles.heroAccentTop} />
        <div className={Styles.heroAccentBottom} />

        <div className={Styles.heroContent}>
          <div className={Styles.logoWrapper}>
            <div className={Styles.logoRing}>
              <Image
                src={Logo}
                alt="PWD IT Division Logo"
                width={90}
                height={90}
                style={{ borderRadius: "50%" }}
                className={Styles.govtLogo}
              />
            </div>
          </div>

          <p className={Styles.heroTag}>
            <span className={Styles.heroTagLine} />
            Government of West Bengal
            <span className={Styles.heroTagLine} />
          </p>

          <h1 className={Styles.welcomeTitle}>
            Welcome To<br />
            <span className={Styles.titleAccent}>PWD IT Division</span>
          </h1>

          <div className={Styles.deptInfo}>
            <p className={Styles.department}>PUBLIC WORKS DIRECTORATE</p>
            <p className={Styles.division}>Kolkata IT Division · Govt of West Bengal</p>
          </div>

          <div className={Styles.heroButtons}>
            <button
              type="button"
              className={Styles.primaryBtn}
              onClick={() => router.push("/about")}
            >
              <span>Explore Services</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
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

        <div className={Styles.scrollIndicator}>
          <div className={Styles.scrollMouse}>
            <div className={Styles.scrollWheel} />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LEADER SECTION — REDESIGNED
      ═══════════════════════════════════════ */}
      <section className={Styles.leaderSection}>
        <div className={Styles.bgOrb1} />
        <div className={Styles.bgOrb2} />
        <div className={Styles.bgGrid} />

        <div className={Styles.sectionHeader}>
          <span className={Styles.eyebrow}>
            <span className={Styles.eyebrowLine} />
            Department Head
            <span className={Styles.eyebrowLine} />
          </span>
          <h2 className={Styles.sectionTitle}>The Banyan Tree of PWD IT</h2>
          <p className={Styles.sectionSubtitleLeader}>
            Visionary leadership that has shaped the digital future of West Bengal
          </p>
        </div>

        <div className={Styles.leaderCard}>
          {/* Portrait Column */}
          <div className={Styles.portraitColumn}>
            <div className={Styles.portraitFrame}>
              <div className={Styles.portraitRing}>
                <Image
                  src={Susipra}
                  alt="Shri Susipra Mallik — Superintending Engineer, PWD"
                  width={300}
                  height={300}
                  className={Styles.portraitImage}
                />
              </div>
              <div className={Styles.portraitGlow} />
            </div>

            <div className={Styles.badgeStack}>
              <div className={Styles.rankBadge}>
                <span className={Styles.rankIcon}>★</span>
                Superintending Engineer
              </div>
              <div className={Styles.deptBadge}>PWD · Govt of West Bengal</div>
            </div>

            <div className={Styles.statRow}>
              <div className={Styles.statPill}>
                <span className={Styles.statNum}>11+</span>
                <span className={Styles.statLabel}>IT Domains</span>
              </div>
              <div className={Styles.statPill}>
                <span className={Styles.statNum}>State</span>
                <span className={Styles.statLabel}>Wide Impact</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={Styles.contentColumn}>
            <div className={Styles.nameBlock}>
              <h3 className={Styles.leaderName}>Shri Susipra Mallik</h3>
              <div className={Styles.titleDivider}>
                <span className={Styles.dividerLine} />
                <span className={Styles.dividerDiamond} />
                <span className={Styles.dividerLine} />
              </div>
              <p className={Styles.leaderDesignation}>
                Superintending Engineer, Public Works Department
              </p>
            </div>

            <p className={Styles.leaderDesc}>
              The driving force behind the PWD IT Division, Shri Mallik's
              strategic vision and commitment to innovation have profoundly
              transformed the technological landscape of the Government of West
              Bengal. Under his distinguished leadership, the Division has evolved
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

            <blockquote className={Styles.leaderQuote}>
              <span className={Styles.quoteAccent}>"</span>
              Technology is not merely about innovation — it is about empowering
              people, strengthening institutions, and building sustainable
              solutions that serve generations to come.
              <span className={Styles.quoteAccent}>"</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEAM SECTION — ENHANCED
      ═══════════════════════════════════════ */}
      <section className={Styles.teamSection}>
        <div className={Styles.teamBgOrb} />

        <div className={Styles.sectionHeader}>
          <span className={Styles.eyebrow}>
            <span className={Styles.eyebrowLine} />
            Our Excellence
            <span className={Styles.eyebrowLine} />
          </span>
          <h2 className={Styles.sectionTitle}>Dedicated Teams &amp; Expertise</h2>
          <p className={Styles.sectionDesc}>
            Committed professionals working together to deliver technological excellence
            across West Bengal&apos;s public works infrastructure
          </p>
        </div>

        {/* Group Photo Banner */}
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
              and maintaining West Bengal&apos;s digital infrastructure
            </p>
          </div>
        </div>

        {/* Team Categories */}
        {teamData.map((team, idx) => (
          <div key={idx} className={Styles.teamCategory}>
            <div className={Styles.categoryHeader}>
              <div className={Styles.categoryLine} />
              <h3 className={Styles.categoryTitle}>
                <span className={Styles.categoryIcon}>{team.icon}</span>
                {team.category}
              </h3>
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
                    <div className={Styles.memberImageShine} />
                  </div>
                  <div className={Styles.memberName}>{member.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════
          ACHIEVEMENTS SECTION — ENHANCED
      ═══════════════════════════════════════ */}
      <section className={Styles.achievementsSection}>
        <div className={Styles.achievementsBgPattern} />
        <div className={Styles.achievementsBgOrb} />

        <div className={Styles.sectionHeader}>
          <span className={`${Styles.eyebrow} ${Styles.eyebrowGold}`}>
            <span className={Styles.eyebrowLineGold} />
            Landmark Projects
            <span className={Styles.eyebrowLineGold} />
          </span>
          <h2 className={`${Styles.sectionTitle} ${Styles.sectionTitleLight}`}>
            Remarkable Achievements
          </h2>
          <p className={`${Styles.sectionDesc} ${Styles.sectionDescLight}`}>
            Showcasing landmark infrastructure projects that redefine
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
                      <div className={Styles.achievementAccent} />
                      <h4 className={Styles.achievementTitle}>{item.title}</h4>
                      <p className={Styles.achievementSubtitle}>{item.subtitle}</p>
                      <button className={Styles.achievementBtn}>
                        View Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.carouselNav}>
            <button
              className={`${Styles.carouselArrow} ${currentSlide === 0 ? Styles.arrowDisabled : ""}`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className={Styles.carouselDots}>
              {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`${Styles.carouselDot} ${i === currentSlide ? Styles.dotActive : ""}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={`${Styles.carouselArrow} ${currentSlide >= maxSlide ? Styles.arrowDisabled : ""}`}
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide}
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION — ENHANCED
      ═══════════════════════════════════════ */}
      <section className={Styles.ctaSection}>
        <div className={Styles.ctaGlow} />
        <div className={Styles.ctaBgGrid} />
        <div className={Styles.ctaContent}>
          <span className={Styles.ctaEyebrow}>Start a Conversation</span>
          <h3 className={Styles.ctaTitle}>Ready to Collaborate?</h3>
          <p className={Styles.ctaDesc}>
            Connect with our expert teams for end-to-end IT solutions,
            network infrastructure, and integrated technology services
          </p>
          <div className={Styles.ctaButtons}>
            <button
              className={Styles.ctaButton}
              onClick={() => router.push("/contact")}
            >
              <span>Get in Touch</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <button
              className={Styles.ctaButtonOutline}
              onClick={() => router.push("/about")}
            >
              Our Services
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
