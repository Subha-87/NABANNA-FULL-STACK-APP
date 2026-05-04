

import "./globals.css";
import styles from "./layout.module.css";
import SideBar from "@/component/SideBarAdmin";

import Navbar from "./protechComponent/Navbar";
import { getSession } from "@/lib/Auth/sessionCookie";
import { redirect } from "next/navigation";

import { getAuthUser } from "@/lib/Auth/getAuthUser";

import { AuthProvider } from "../Provider/AuthProvider";
import AxiosProvider from "../Provider/AxiosProvider";
import SessionWatcher from "./SessionWatcher";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function AdminLayout({ children }) {
  const s_id = await getSession(); // get valid session id  by request header set in middleware//
  const validSessionInfo = await getAuthUser(s_id); // Get Session Info by DB Calling with expiry check//

  if (!validSessionInfo) {
    redirect("/admin");
  }

  const { username, rank, expiry } = validSessionInfo;
  const validAuthInfo = {
    username,
    rank,
    s_id,
    expiry,
  };
  return (
    <html lang="en">
      <body className={styles.mainLayout}>
        <AuthProvider authInfo={validAuthInfo}>
          <AxiosProvider>
            <SessionWatcher expiry={validAuthInfo.expiry} />
            <div className={styles.header}>
              <Navbar />
            </div>

            <div className={styles.mainBody}>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000} // closes automatically after 3s
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
            <div className={styles.sidebar}>{<SideBar />}</div>
          </AxiosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
