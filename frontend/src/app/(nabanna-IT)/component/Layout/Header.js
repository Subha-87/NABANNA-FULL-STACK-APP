"use client";
import { Container, Row, Col } from "react-bootstrap";
import LogOutUser from "../LogOutUser";
//import { useAuth } from "../../Auth/NabannaAuth";
import { useAuth } from "@/app/Hook/useAuth";
import Image from "next/image";
import useIcon from "../../../../../public/userImage/man-user-circle-icon.png";
import OfficalLogo from "../.././../../../public/LogoImage/02631e9d74234d5fb9e91722f92fc519-free.png";

const Header = () => {
  //const{username,rank} = authUser
  //const { authUser, authRank } = useAuth();
  const { authName, authRank } = useAuth();
  //console.log(authUser)
  return (
    <>
      <div className="flex justify-center p-3">
        <Image
          src={OfficalLogo}
          alt="Company Logo"
          width={70}
          height={70}
          className="rounded-circle"
          style={{ border: "3px solid #fff", margin: 10 }}
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="avatar-wrapper">
          <Image src={useIcon} alt="User" className="avatar-img" />

          <span className="online-dot"></span>
        </div>

        <div>
          <div className="user-name">Welcome {authName}</div>
          <div className="user-rank">{authRank}</div>
        </div>
      </div>

      {/* Right section */}
      <div>
        <LogOutUser />
      </div>

      {/* Left section */}
    </>
  );
};

export default Header;
