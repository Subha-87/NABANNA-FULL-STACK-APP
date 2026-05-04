//import "../../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./layout.module.css";
import { getAuth_ITUser } from "../../lib/Auth/getAuthUser";
import { getSession } from "@/lib/Auth/sessionCookie";
import { Container, Row, Col } from "react-bootstrap";
import ReturnBtn from "../(protectedAdmin)/protechComponent/ReturnBtn";
import Header from "./component/Layout/Header";
import Footer from "./component/Layout/Footer";
import "./globals.css";
//import { AuthProvider } from "./Auth/NabannaAuth";
import { AuthProvider } from "../Provider/AuthProvider";
import AxiosProvider from "../Provider/AxiosProvider";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import SessionWatcher_ITUser from "./SessionWatcher_ITUser";

export default async function NabannaLayout({ children }) {
  const s_id = await getSession(); // get valid session id  by header//
  const validSessionInfo = await getAuth_ITUser(s_id); // Get Session Info by DB Calling//

  if (!validSessionInfo) {
    redirect("/subdivision/nabanna");
  }

  const { username, rank, expiry } = validSessionInfo || {};
  const validAuthInfo = {
    username,
    rank,
    s_id,
    expiry,
  };
  return (
    <html lang="en">
      <body className={styles.body}>
        <AuthProvider authInfo={validAuthInfo}>
          <AxiosProvider>
            <div className={styles.mainLayout}>
              <SessionWatcher_ITUser expiry={validAuthInfo.expiry} />
              <div className={styles.header}>
                <Header />
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
              <div className={styles.footer}>
                <Footer />
              </div>
            </div>
          </AxiosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
