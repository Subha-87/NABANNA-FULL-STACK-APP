import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import MachineDetails from "../../component/Table/MachineDetails";
import {
  AddSystemBtn,
  SearchSystem,
  AmcExport,
  SystemStatusView,
  SystemFind,ActivateAMCBtn,RenewalAMCBtn
} from "../../component/Button/NabannaSystemBtn";
import { handleAxiosError} from "@/app/utils/axiosError";

const UserDetails = () => {
  const axios = useAxios()
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHardwareData = async () => {
    try {
      const resp = await axios.get("/NabannaSystem");
      //console.log(resp.data);
      setRows(resp.data?.data);
    } catch (error) {
      console.error(error)
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something is Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHardwareData();
  }, []);

  return (
    <>
      <div
        className="h-[9%] p-3 flex justify-evenly items-center"
        style={{ backgroundColor: "#FEF3E2" }}
      >
        <AddSystemBtn onSuccess={getHardwareData} />
        <SystemStatusView />
        <SystemFind />
        <SearchSystem />
        <ActivateAMCBtn/>
        <RenewalAMCBtn/>
        <AmcExport />
      </div>

      <div className="overflow-auto grow border-1 border-blue-800">
        <MachineDetails
          data={rows}
          tableError={error}
          loading={loading}
          onRefresh={getHardwareData}
        />
      </div>
    </>
  );
};

export default UserDetails;
