"use client";
import { Container, Row, Col } from "react-bootstrap";
import LogoutBtn from "./LogoutBtn";
//import { useAuth } from "../AuthContext";
import { useAuth } from "@/app/Hook/useAuth";
import Image from "next/image";
import userIcon from "../../../../public/userImage/man-user-circle-icon.png";
import SidebarToggle from "@/component/SidebarToggle";

export default function COMPONENT_NAVBAR() {
  //console.log(useAuth())
  const { authName, authRank } = useAuth();

  return (
    <>
      {/* Left section */}
      <div className="d-flex align-items-center gap-3">
        {/* Sidebar toggle */}
        <SidebarToggle />
        <div className="avatar-wrapper">
          <Image src={userIcon} alt="User" className="avatar-img" />

          <span className="online-dot"></span>
        </div>

        <div>
          <div className="user-name">Welcome {authName}</div>
          <div className="user-rank">{authRank}</div>
        </div>
      </div>

      {/* Right section */}
      <div>
        <LogoutBtn />
      </div>
    </>
  );
}
