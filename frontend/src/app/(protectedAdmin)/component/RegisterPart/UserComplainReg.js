import AddComplain from "../ActionButton/AddComplain";
import { Label } from "reactstrap";
import UserComplainTable from "../TableFormat/UserComplainTable";
import SearchComplain from "../ActionButton/SearchComplain";
import { useState, useEffect } from "react";
//import axios from "axios";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
const UserComplainReg = ({setData}) => {
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comaplainData, setComplainData] = useState([]);
  const axios = useAxios()
  const getComplainData = async () => {
    try {
      const response = await axios.get(
        //"http://10.10.119.160:5000/complain/getAll"
        "/complain/getAll",
      );
      //console.log(response);
      setData(response.data?.data)
      setComplainData(response.data?.data);
      //setLoading(false)
    } catch (err) {
      //console.log(err);
      const{generalError} = handleAxiosError(err)
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComplainData();
    const interval = setInterval(getComplainData, 10000); // every 10s
    return () => clearInterval(interval); // cleanup
  }, []);
  

  return (
    <>
      <div className="flex justify-content-around p-3 ">
        <AddComplain onSuccess={getComplainData} />
        <div>
          <Label className="mr-2 font-bold text-2xl">
            Search Complain Log :
          </Label>
          <input
            type="text"
            placeholder="User/Rank/Dept./Room/Contact"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="searchInput"
          />{" "}
          <SearchComplain
            findKey={searchWord}
            clearInput={() => setSearchWord("")}
          />
        </div>
      </div>
      <div className="overflow-auto grow">
        <UserComplainTable data={comaplainData} loading={loading} isError={error} onRefresh={getComplainData} />
      </div>
    </>
  );
};

export default UserComplainReg;
