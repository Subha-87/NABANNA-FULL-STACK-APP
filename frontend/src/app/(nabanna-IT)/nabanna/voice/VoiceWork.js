"use client";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Button, Box, Modal, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import { useAuth } from "@/app/Hook/useAuth";
import { useAxios } from "@/app/Hook/useAxios";
import Image from "next/image";
import EditBtnNet from "../../component/Button/EditBtnNet";
import "../../TableStyle.css";
import SelfEditVoice from "../../component/Button/SelfEditVoice";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";
import { isNew } from "@/app/NewLogic/dayLimit";

const VoiceWork = ({ setData }) => {
  const { authName } = useAuth();
  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const getData = async () => {
    try {
      const response = await axios.get(`/voiceTask/allVoiceData/${authName}`);
      setData(response.data?.data);
      setServerData(response.data?.data);
    } catch (error) {
      //console.error("Error fetching posts:", error);
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 10000); // Fetch data every 1 seconds
    return () => clearInterval(intervalId);
  }, []);

  // To Open Letter File ON new Tab //

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center text-2xl font-bold">Loading ...</div>
      ) : error ? (
        <ErrorDisplay err={error} />
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Date</th>
              <th>Letter</th>
              <th>Letter For</th>
              <th>User</th>
              <th>Contact</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Room</th>
              <th>Priority</th>

              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serverData.map((post, index) => (
              <tr key={index} className={`${isNew(post.assignDate) ? "new-row" : ""}`}>
                <td>{index + 1}</td>
                {<td>{new Date(post.assignDate).toLocaleDateString()}</td>}
                <td className={`w-[100px] h-[100px]  hover:cursor-pointer `}>
                  <div className="img-wrapper">
                    {isNew(post.assignDate) && (
                      <span className="new-badge">NEW</span>
                    )}

                    <Image
                      src={`http://10.10.119.160/api/ItReq/letter_pic/${post._id}`}
                      alt="letter img"
                      className="showImg"
                      width={100}
                      height={60}
                      onClick={() =>
                        openInNewTab("/api/ItReq/letter_pic/" + post._id)
                      }
                    />
                  </div>
                </td>

                <td>{post.lettertype}</td>
                <td>{post.username}</td>
                <td>{post.contact}</td>
                <td>{post.designation}</td>
                <td>{post.department}</td>
                <td>{post.room}</td>
                <td>
                  <span
                    className={`badge ${
                      post.p_level === "High"
                        ? "bg-danger"
                        : post.p_level === "Medium"
                          ? "bg-warning text-dark"
                          : "bg-info"
                    }`}
                  >
                    {post.p_level}
                  </span>
                </td>

                <td>
                  {post.status === "Pending" ? (
                    <div className="spinner-grow text-danger"></div>
                  ) : post.status === "In Progress" ? (
                    <div className="spinner-grow text-warning">I</div>
                  ) : (
                    <button className="btn btn-success p-3 5em rounded-circle btn-sm"></button>
                  )}
                </td>
                <td className="w-[200px]">{post.remarks}</td>
                <td>
                  <div className="flex justify-content-evenly hover:cursor-pointer mb-2">
                    <EditBtnNet rowVoiceData={post} />
                    <SelfEditVoice data={post} />
                  </div>
                  {/*<UpdateVoicedata edit_id={post._id} date={post.date} user={post.user} room={post.room} problem={post.problems} />*/}
                  {/*<Button variant='contained' color='success' onClick={() => editModalOpen(post._id)}>UPDATE</Button>*/}
                  {/*<Button variant='contained' color='warning' sx={{ marginLeft: "5px" }} onClick={() => handelDelete(post._id)}>Delete</Button>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default VoiceWork;
