"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../app/(protectedAdmin)/layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import OfficalLogo from "../../public/LogoImage/02631e9d74234d5fb9e91722f92fc519-free.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CalculateIcon from "@mui/icons-material/Calculate";
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from "@mui/icons-material/Build";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

export default function SideBar() {
  const pathname = usePathname();

  const sideLinks = [
    { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
    {
      href: "/dashboard/register",
      label: "Register",
      icon: AppRegistrationIcon,
    },
    { href: "/dashboard/estimate", label: "Estimate", icon: CalculateIcon },
    {
      href: "/dashboard/workorder",
      label: "Work-Order",
      icon: DescriptionIcon,
    },
    { href: "/dashboard/amc", label: "AMC", icon: BuildIcon },
    /*{
      href: "/dashboard/permission",
      label: "Permission",
      icon: AdminPanelSettingsIcon,
    },*/
    {
      href: "/dashboard/letter",
      label: "Letter",
      icon: LocalPostOfficeIcon,
    },
    { href: "/dashboard/challan", label: "Challan", icon: ReceiptLongIcon },
  ];

  return (
    <div className="d-flex flex-column w-100">
      <div className="flex justify-center p-3">
        <Image
          src={OfficalLogo}
          alt="Company Logo"
          width={100}
          height={100}
          className="rounded-circle"
          style={{ border: "3px solid #fff", margin: 10 }}
        />
      </div>
      {/* Sidebar Links */}
      <div className="d-flex flex-column mt-4">
        <ul>
          {sideLinks.map(({ href, label, icon: Icon }) => (
            <li
              key={href}
              className={`d-flex align-items-center gap-3 ${
                pathname === href ? styles.activeItem : ""
              }`}
            >
              <Icon
                sx={{
                  color: pathname === href ? "#B6F500" : "#ffffff",
                  fontSize: 26,
                }}
              />
              <Link
                href={href}
                className="font-semibold "
                style={{
                  fontFamily: "Times New Roman, Georgia, serif",

                  textDecoration: pathname === href ? "underline" : "none",
                  color: pathname === href ? "#B6F500" : "#fff",
                  fontSize: pathname === href ? "20px" : "18px",
                  fontWeight: pathname === href ? "600" : "400",
                }}
              >
                <span className="menuText">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
