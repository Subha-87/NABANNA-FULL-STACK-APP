import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";

import "../../TableStyle.css";
import { Table } from "react-bootstrap";


import { EditComplainBtn } from "../../component/Button/ComplainBtn";
import Image from "next/image";
import NoWorkImg from "../Task-Image/no-work-today-troll-dance (1).gif";
import pageLoading from "../Task-Image/cargando-loading.gif";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";
import { isNew } from "@/app/NewLogic/dayLimit";

const Complain = ({ setData }) => {
  const [complainData, setComplainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const getComplainData = async () => {
    const setDomain = "Internet";
    try {
      const response = await axios.get(
        //"http://10.10.119.160:5000/complain/getNetAll"
        `/complain/getComplainIT/${setDomain}`,
      );
      //console.log(response);
      setData(response.data?.data); // pass to parent to count badge notification //
      setComplainData(response.data?.data);
    } catch (err) {
      //console.error(err);
      const { generalError } = handleAxiosError(err);
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
            {complainData.map((data, index) => (
              <tr key={index} className={isNew(data.date) ? "new-row" : ""}>
                <td>{index + 1} </td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td className="uppercase font-semibold w-[200px]">
                  {data.username}
                  {isNew(data.date) && (
                    <span className="inline-badge">NEW</span>
                  )}
                </td>
                <td className="w-[100px]">{data.designation}</td>
                <td>
                  <span className="uppercase">{data.department}</span>
                </td>

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
                <td className="w-[250px]">{data.remarks}</td>
                <td className="w-[35px]">
                  <div className="flex justify-content-center hover:cursor-pointer mb-2">
                    <EditComplainBtn
                      editData={data}
                      onRefresh={getComplainData}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Complain;
