"use client";
import { Table } from "react-bootstrap";

import { useAxios } from "@/app/Hook/useAxios";
import { useAuth } from "@/app/Hook/useAuth";
import Image from "next/image";
import EditBtnNet from "../../component/Button/EditBtnNet";

import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import "../../TableStyle.css";
import SelfEditNet from "../../component/Button/SelfEditNet";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";
import { isNew } from "@/app/NewLogic/dayLimit";

const NetWork = ({setData}) => {
  const { authName } = useAuth();
  const axios = useAxios();
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(authName); // make this dynamic name using useContext //

  const getAllTaskforNet = async () => {
    //setIsLoading(true);
    try {
      const response = await axios.get(`/TaskData/showNetTask/${user}`);
      //console.log(response);
      const fetchedTask = response.data?.data
      setTask(fetchedTask);//1st data rendered in ui table
      setData(fetchedTask); //2nd send parent to badge notification and show it on tab display //
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTaskforNet();
    const interval = setInterval(getAllTaskforNet, 8000); // every 10s

    return () => clearInterval(interval); // cleanup
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
              <th>AssignDate</th>
              <th>Letter Copy</th>
              <th>Task For</th>
              <th>UserName</th>
              <th>Contact</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Room</th>
              <th>Priority</th>

              <th>Remarks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((data, index) => {
              return (
                <tr
                  key={index}
                  className={`${isNew(data.assignDate) ? "new-row" : ""}`}
                >
                  <td>{index + 1}</td>
                  <td>{new Date(data.assignDate).toLocaleDateString()}</td>
                  <td className={`w-[100px] h-[100px]  hover:cursor-pointer `}>
                    <div className="img-wrapper">
                      {isNew(data.assignDate) && (
                        <span className="new-badge">NEW</span>
                      )}

                      <Image
                        src={`http://10.10.119.160/api/ItReq/letter_pic/${data._id}`}
                        alt="letter img"
                        className="showImg"
                        width={100}
                        height={60}
                        onClick={() =>
                          openInNewTab("/api/ItReq/letter_pic/" + data._id)
                        }
                      />
                    </div>
                  </td>
                  <td>{data.lettertype}</td>
                  <td className="font-bold text-green-600">
                    <span className="font-bold text-green-900">
                      {data.username}
                    </span>
                  </td>
                  <td>{data.contact}</td>
                  <td>{data.designation}</td>
                  <td>{data.department}</td>
                  <td>{data.room}</td>
                  <td>
                    <span
                      className={`badge ${
                        data.p_level === "High"
                          ? "bg-danger"
                          : data.p_level === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-info"
                      }`}
                    >
                      {data.p_level}
                    </span>
                  </td>

                  <td className="w-[200px]">{data.remarks}</td>
                  <td>
                    {data.status === "Pending" ? (
                      <div className="spinner-grow text-danger"></div>
                    ) : data.status === "In Progress" ? (
                      <div className="spinner-grow text-warning">I</div>
                    ) : (
                      <button className="btn btn-success p-3 5em rounded-circle btn-sm"></button>
                    )}
                  </td>
                  <td className="w-[120px]">
                    <div className="flex justify-content-evenly hover:cursor-pointer mb-2">
                      <EditBtnNet rowData={data} onRefresh={getAllTaskforNet} />
                      <SelfEditNet data={data} onRefresh={getAllTaskforNet} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default NetWork;

/*const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return data.message || "Bad Request";

      case 401:
        return "Unauthorized access. Please login again.";

      case 403:
        return "You do not have permission to perform this action.";

      case 404:
        return "Requested resource not found.";

      case 500:
        return "Server error. Please try again later.";

      default:
        return data.message || "Unexpected error occurred.";
    }
  }

  if (error.request) {
    return "No response from server. Check your network.";
  }

  return error.message || "Something went wrong.";
};*/
