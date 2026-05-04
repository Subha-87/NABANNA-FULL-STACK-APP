"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";


import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MemoryIcon from '@mui/icons-material/Memory';
import "./NavBar.css";

export default function COMPONENT_NAVBAR() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/about", label: "About", icon: InfoIcon },
    { href: "/aiAssistant", label: "AI Assistant", icon: MemoryIcon },
    { href: "/admin", label: "Admin", icon: AdminPanelSettingsIcon },
    { href: "/subdivision", label: "Sub-Division", icon: AccountTreeIcon },
    { href: "/contact", label: "Contact", icon: ContactMailIcon },
  ];

   return (
    <Container className="navContainer" fluid>
      {/* Added g-0 to remove Bootstrap's default gutter margins */}
      <Row className="navRow g-0">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Col key={href} className="navCol" xs="auto"> {/* xs="auto" prevents cols from squishing awkwardly */}
            <Link
              href={href}
              className={`navItem ${pathname === href ? "navActive" : ""}`}
            >
              <Icon className="navIcon" />
              {label}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );

  /*return (
    <Container className="navContainer">
      <Row className="navRow">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Col key={href} className="navCol">
            <Link
              href={href}
              className={`navItem ${pathname === href ? "navActive" : ""}`}
            >
              <Icon className="navIcon" />
              {label}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );*/
}
