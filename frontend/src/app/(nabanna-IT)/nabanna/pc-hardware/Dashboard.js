import SystemDashboard from "../../component/Services/SystemDashboard";
import { useEffect, useState } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";

const Dashboard = () => {
  const axios = useAxios();
  const [dashboardData, setdashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardDetails = async () => {
    try {
      setLoading();
      const resp = await axios.get("/NabannaSystem/dashboard-summary");
      console.log(resp.data);
      setdashboardData(resp.data?.data);
    } catch (error) {
      //console.error(error)
      const { generalError } = handleAxiosError(error);
      //console.log(errMsg.generalError)
      toast.error(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardDetails();
    // Auto Page Refresh//
    const intervalId = setInterval(getDashboardDetails, 20000); // Fetch data every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount*/
  }, []);
  // LATER API CALL HER TO GET THE DATA //
  /*const dashboardData = {
    totalSystems: 850,

    cpu: 286,
    monitor: 271,
    allInOne: 8,
    laptop: 0,
    ups: 245,
    printer: 237,
    scanner: 28,

    underWarranty: 400,
    amcCovered: 350,
    amcRequired: 70,
    amcExpired: 30,
  };*/
  return <SystemDashboard dashboardData={dashboardData} />;
};

export default Dashboard;
