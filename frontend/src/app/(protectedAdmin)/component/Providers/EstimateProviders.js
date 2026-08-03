import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";

const EstimateContext = createContext();

export const EstimateProvider = ({ children }) => {
  const axios = useAxios();

  const [estData, setEstData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getEstimateRecords = async () => {
    try {
      setLoading(true);

      const resp = await axios.get("/estimateReg");
      setEstData(resp.data?.data || []);
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      setError(generalError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEstimateRecords();
  }, []);
  return (
    <EstimateContext.Provider
      value={{
        estData,
        loading,
        error,
        getEstimateRecords,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimate = () => useContext(EstimateContext);
