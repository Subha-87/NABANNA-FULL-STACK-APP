import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabPage from "./TabPage";
import { Container } from "react-bootstrap";
import { cookies } from "next/headers";
import { AuthProvider } from "../../AuthContext";

export default async function Page() {
  const cookieStore = await cookies();
  //console.log(cookieStore.get("Auth").value);
  const auth_value = cookieStore.get("Auth").value;
  return (
    <div className="flex flex-col w-full h-full overflow-auto bg-blue-300">
      <TabPage />
    </div>
  );
}
