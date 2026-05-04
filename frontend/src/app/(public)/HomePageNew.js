// HomePage.js
"use client";
import Styles from "./HomePage.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Import images directly from the provided paths
import GovtLogo from "../../../public/IT PERSONNEL IMAGE/Emblem_of_West_Bengal_(2018-present).svg.png";
import GroupPic from "../../../public/IT PERSONNEL IMAGE/Cover.jpg"
import Logo from "../../../public/LogoImage/02631e9d74234d5fb9e91722f92fc519-free.png"
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
import Santanu from "../../../public/IT PERSONNEL IMAGE/Audio Video/Santanu.jpg";
import Souvik from "../../../public/IT PERSONNEL IMAGE/Audio Video/unknown.png";
import Sougata from "../../../public/IT PERSONNEL IMAGE/Office Team/sougata.jpg";
import Somnath from "../../../public/IT PERSONNEL IMAGE/Office Team/somnath.jpg";
import Priyanka from "../../../public/IT PERSONNEL IMAGE/Office Team/Priyanka.jpg";
import Sanjib from "../../../public/IT PERSONNEL IMAGE/Office Team/sanjib.jpg";
import Sumana from "../../../public/IT PERSONNEL IMAGE/Office Team/sumana.jpg";

import AchivImg1 from "../../../public/IT PERSONNEL IMAGE/Remarkable/0429a2fe-a5dc-4dfe-b8f0-52f30009edf5.jpg"
import AchivImg2 from "../../../public/IT PERSONNEL IMAGE/Remarkable/77e13c8a-daa8-468d-b29c-2f427ab10e66.jpg"
import AchivImg3 from "../../../public/IT PERSONNEL IMAGE/Remarkable/b5949b85-0372-4218-a9dc-05ee9bacf966.jpg"



const teamData = [
  {
    category: "Network Engineering Research,Design,Planning & Monitoring",
    members: [
      { name: "Joydeep Ghosh", pic: joydeep },
      { name: "Swagatam Dutta", pic: swagatam },
      { name: "Shirshendu Mukherjee", pic: shirshendu },
    ],
  },
  {
    category: "Ground Zero Network Solution,Development & Execution",
    members: [
      { name: "Suman Sarder", pic: suman },
      { name: "Debasis Halder", pic: debasish },
      { name: "Rittik Kurmar Dey", pic: rittik },
      { name: "Rajdip Dutta", pic: rajdip },
      { name: "Biplab Majumder", pic: biplab },
    ],
  },

  {
    category: "Hardware & Software Testing & Solution",
    members: [
      { name: "Subhasis Das", pic: subhasis },
      { name: "Partha Purkait", pic: parthPur },
    ],
  },
  {
    category: "Integrated Voice System Planning,Testing & Installation Management",
    members: [
      { name: "Partha Nag Choudhury", pic: parthaNag },
      { name: "Sudipta Sarder", pic: sudipta },
      { name: "Joydeb Saha", pic: joydeb },
    ],
  },
  {
    category: "Audio & Video Management System & Zonal Execution",
    members: [
      { name: "Sk. Akhteruddin", pic: akhter },
      { name: "Santanu Banerjee", pic: Santanu },
      { name: "Souvik", pic: Souvik },
    ],
  },
  {
    category: "SubDivision Office & Project Management Analytics",
    members: [
      { name: "Sougata Das", pic: Sougata },
      { name: "Somnath Panda", pic: Somnath },
      { name: "Sanjib Rakhshit", pic: Sanjib },
      { name: "Priyanka Halder", pic: Priyanka },
      { name: "Sumana Roy", pic: Sumana },
    ],
  },
];

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={Styles.container}>
      {/* Hero Section */}
      <div className={Styles.hero}>
        <div
          className={Styles.heroBackground}
          style={{
            transform: `scale(${1 + scrollY * 0.0005})`,
            opacity: 1 - scrollY * 0.002,
          }}
        >
          <div className={Styles.overlay}></div>
        </div>
        <div className={Styles.heroContent}>
          <div className={Styles.logoWrapper}>
            <Image
              src={Logo}
              alt="Govt Logo"
              width={100}
              height={100}
              style={{ borderRadius: '50%' }} 
              className={Styles.govtLogo}
            />
          </div>
          <h1 className={Styles.welcomeTitle}>Welcome To PWD IT Division</h1>
          <div className={Styles.deptInfo}>
            <p className={Styles.department}>PUBLIC WORKS DIRECTORATE</p>
            <p className={Styles.division}>
              Kolkata IT Division, Govt of West Bengal
            </p>
          </div>
          <div className={Styles.heroButtons}>
            <button type="button" className={Styles.primaryBtn} onClick={() => router.push('/about')}>Explore Services</button>
            <button type="button" className={Styles.secondaryBtn} onClick={() => router.push('/contact')}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* Leader Section */}
      <div className={Styles.leaderSection}>
        <div className={Styles.sectionHeader}>
          <span className={Styles.subtitle}>Our Visionary Leader</span>
          <h2 className={Styles.sectionTitle}>The Banyan Tree of PWD IT</h2>
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
            <div className={Styles.leaderBadge}>Superintending Engineer</div>
          </div>
          <div className={Styles.leaderInfo}>
            <h3 className={Styles.leaderName}>Shri Susipra Mallik</h3>
            <p className={Styles.leaderDesignation}>Superintending Engineer,PWD,Govt of West Bengal</p>
            <div className={Styles.leaderDivider}></div>
            <p className={Styles.leaderDesc}>
              The driving force behind PWD IT Division, whose vision and
              innovation have transformed the technological landscape of
              Government of West Bengal. Like a banyan tree providing shelter
              and direction, his guidance has nurtured every IT initiative.
              Under his leadership, we have built a robust ecosystem of network
              engineering, hardware solutions, and integrated management systems
              that serve as the backbone of public works infrastructure.
            </p>
            <div className={Styles.leaderQuote}>
              <span className={Styles.quoteIcon}>"</span>
              Technology is not just about innovation; it's about empowering
              people and building sustainable solutions for generations to come.
              <span className={Styles.quoteIcon}>"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Sections */}
      <div className={Styles.teamSection}>
        <div className={Styles.sectionHeader}>
          <span className={Styles.subtitle}>Our Excellence</span>
          <h2 className={Styles.sectionTitle}>Dedicated Teams & Expertise</h2>
          <p className={Styles.sectionDesc}>
            Committed professionals working together to deliver technological
            excellence
          </p>
        </div>
        {teamData.map((team, idx) => (
          <div key={idx} className={Styles.teamCategory}>
            <div className={Styles.categoryHeader}>
              <div className={Styles.categoryIcon}></div>
              <h3 className={Styles.categoryTitle}>{team.category}</h3>
            </div>
            <div className={Styles.membersGrid}>
              {team.members.map((member, midx) => (
                <div key={midx} className={Styles.memberCard}>
                  <div className={Styles.memberImageWrapper}>
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
      </div>

      {/* CTA Section */}
      <div className={Styles.ctaSection}>
        <div className={Styles.ctaContent}>
          <h3 className={Styles.ctaTitle}>Ready to Collaborate?</h3>
          <p className={Styles.ctaDesc}>
            Connect with our teams for innovative IT solutions and technical
            expertise
          </p>
          <button className={Styles.ctaButton}>Get in Touch</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
