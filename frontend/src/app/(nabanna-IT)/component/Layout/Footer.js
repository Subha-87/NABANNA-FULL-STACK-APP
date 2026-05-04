"use client";
import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer-content">
      <span className="footer-text">
        <FaCopyright className="footer-icon" />
        {year} PWD IT Portal |{" "}
        <span style={{ color: "#B6F500" }}> Nabanna IT Sub-Division</span>
      </span>

      <span className="footer-right">All Rights Reserved</span>
    </div>
  );
};

export default Footer;
