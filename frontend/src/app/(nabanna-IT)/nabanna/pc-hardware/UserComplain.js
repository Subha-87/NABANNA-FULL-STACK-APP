import { useState, useEffect } from "react";

import { useAxios } from "@/app/Hook/useAxios";
import Image from "next/image";
import "../../FixedHeaderTable.css";
import { Table } from "react-bootstrap";
import NoWorkImg from "../Task-Image/no-work-today-troll-dance (1).gif";
import pageLoading from "../Task-Image/cargando-loading.gif";
import { EditComplainBtn } from "../../component/Button/ComplainBtn";
import EditRepairBtn from "../../component/Button/EditRepairBtn";
import { SearchSystem } from "../../component/Button/NabannaSystemBtn";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";

const UserComplain = () => {
  const [complainPcData, setComplainPcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const getComplainData = async () => {
    const setDomain = "PC_Hardware";
    try {
      const response = await axios.get(`/complain/getComplainIT/${setDomain}`);
      //console.log(response);
      setComplainPcData(response.data?.data);
    } catch (err) {
      //console.log(err);
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getComplainData();

    // Auto Page Refresh//
    const intervalId = setInterval(getComplainData, 10000); // Fetch data every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount*/
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-column text-center  text-2xl font-bold">
          <div className="flex justify-content-center">
            <Image
              src={pageLoading}
              alt="Loading animation"
              width={300}
              height={300}
              unoptimized={true} // Optional: Bypasses Next.js image optimization for the GIF
            />
          </div>
        </div>
      ) : error ? (
        <ErrorDisplay err={error} />
      ) : (
        <>
          <div
            className="flex justify-center"
            style={{ backgroundColor: "#BED7DC" }}
          >
            <SearchSystem />
          </div>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Date</th>
                <th>Username</th>
                <th>Designation</th>
                <th>Department</th>

                <th>Problem</th>
                <th>Room</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complainPcData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1} </td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td className="uppercase font-semibold w-[200px]">
                    <span className="text-green-700">{data.username}</span>
                  </td>
                  <td className="w-[100px]">{data.designation}</td>
                  <td className="uppercase w-[100px]">{data.department}</td>

                  <td className="w-[230px]">
                    <span className="text-red-700">
                      {data.complain
                        ? data.type + ":" + data.complain
                        : data.type}
                    </span>
                  </td>
                  <td>{data.room}</td>

                  <td>{data.contact}</td>
                  <td>
                    {data.status === "Pending" ? (
                      <div className="spinner-grow text-danger"></div>
                    ) : data.status === "In Progress" ? (
                      <div className="spinner-grow text-warning">I</div>
                    ) : (
                      <button className="btn btn-success p-3 5em rounded-circle btn-sm"></button>
                    )}
                  </td>
                  <td className="w-[220px]">{data.remarks}</td>
                  <td className="w-[50px]">
                    <div className="flex justify-space-between hover:cursor-pointer mb-2">
                      <EditComplainBtn editData={data} onRefresh={getComplainData} />
                      <EditRepairBtn rData={data} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UserComplain;
