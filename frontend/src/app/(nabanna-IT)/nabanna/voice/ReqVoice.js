import { useState, useEffect } from "react";

import { useAxios } from "@/app/Hook/useAxios";
import { Box } from "@mui/material";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import "../../TableStyle.css";
import { Table } from "react-bootstrap";

import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";

const ReqVoice = () => {
  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const getResolveVoiceReq = async () => {
    const domain = "Voice";
    try {
      const response = await axios.get(`/ItReq/solvedLetter/${domain}`);
      //console.log(response.data.data);

      setServerData(response.data?.data);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getResolveVoiceReq();
    const intervalId = setInterval(() => {
      getResolveVoiceReq();
    }, 10000); // Fetch data every 1 seconds
    return () => clearInterval(intervalId);
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <ErrorDisplay err={error} />
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Date</th>
              <th>Letter</th>
              <th>Username</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Cell/Group</th>
              <th>Room</th>

              <th>Contact</th>

              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {serverData.map((data, index) => {
              return (
                <tr key={data._id}>
                  <td>{index + 1} </td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td className="w-[100px] h-[60px] hover:cursor-pointer">
                    <div>
                      <Image
                        className="showImg"
                        width={100}
                        height={60}
                        alt="Requsition Letter"
                        //src={`http://10.10.119.160:5000/ItReq/letter_pic/${data._id}`}
                        src={`http://10.10.119.160/api/ItReq/letter_pic/${data._id}`}
                        onClick={() =>
                          openInNewTab("/api/ItReq/letter_pic/" + data._id)
                        }
                      />
                    </div>
                  </td>
                  <td className="uppercase font-semibold"> {data.username}</td>
                  <td className="w-[100px]">{data.designation}</td>
                  <td className="uppercase">{data.department}</td>
                  <td>{data.subgroup}</td>
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
                  <td>{data.remarks}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ReqVoice;
