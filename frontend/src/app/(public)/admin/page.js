import Image from "next/image";
//import login from "../../../../public/login.jpg";
//import coverImg from "../../../../public/LoginImage/abstract_low_poly_techno_design_background_1905.jpg";
import coverImg from "../../../../public/LoginImage/Cross-platform development in action.png"

import AshokStamva from "../../../../public/LogoImage/ChatGPT Image May 12, 2026, 05_06_07 PM.png"
import { Suspense } from "react";
import AdminLogin from "./AdminLogin";
import loginStyle from "./page.module.css";

export default async function Page() {
  return (
    <div className={loginStyle.loginPage}>
      {/* Left Cover Image */}
      <div className={loginStyle.loginCover}>
        <Image src={coverImg} alt="Login Cover" fill className={loginStyle.coverImg} />
      </div>

      {/* Right Login Section */}
      <div className={loginStyle.loginSection}>
        <div className={loginStyle.loginCard}>
          {/* Logo */}
          <div className={loginStyle.loginLogo}>
            <Image
              src={AshokStamva}
              alt="Govt Logo"
              height={100}
              width={90}
              style={{marginBottom:-35}}
            />
          </div>

          {/* Title */}
          <h2 className={loginStyle.loginTitle}>PWD IT Admin Portal</h2>

          {/* Login Form */}
          <Suspense fallback={null}>
            <AdminLogin />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
