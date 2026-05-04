import { useState, useEffect } from "react";
import { Label } from "reactstrap";

import { useAxios } from "@/app/Hook/useAxios";
import "../../TableStyle.css"
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";
import {
  SearchNetData,
  DataSearchByDate,
} from "../../component/Button/SearchCase";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";

const Maintenance = () => {
  const [resolvedData, setResolvedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const axios = useAxios();

  const currentDate = new Date();
  const dateString = currentDate.toISOString().slice(0, 10);

  const getAllResolvedData = async () => {
    const setDomain = "Internet";
    try {
      const response = await axios.get(
        `/complain/getSolvedITComplain/${setDomain}`,
      );
      //console.log(response);
      setResolvedData(response.data.data);
    } catch (err) {
      //console.error(err);
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllResolvedData();

    // Auto Page Refresh//
    const intervalId = setInterval(getAllResolvedData, 10000); // Fetch data every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount*/
  }, []);
  return (
    <>
      <div className=" flex justify-content-evenly items-center h-[60px]">
        <div className="p-3">
          <Label className="mr-2 font-bold text-xl">User Complain Log :</Label>
          <input
            type="text"
            placeholder="User/Dept/Room/Rank/Contact"
            value={searchTerm}
            className="searchInput w-[250px]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
          <SearchNetData
            findData={searchTerm}
            clearData={() => setSearchTerm("")}
          />
        </div>
        <div className="filter-controls p-3">
          <label htmlFor="" className="m-2 font-bold text-xl">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="searchInput w-[150px]"
          />

          <label htmlFor="" className="m-2 font-bold text-xl">
            End Date :
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="searchInput w-[150px]"
          />
          <span className="ml-2">
            <DataSearchByDate
              startDate={startDate}
              endDate={endDate}
              domain="Internet"
              clearDate={() => {
                setStartDate("");
                setEndDate("");
              }}
            />
          </span>
        </div>
      </div>
      <div className="overflow-auto grow">
        {loading ? (
          <div className="text-center text-2xl font-bold">Loading...</div>
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

                <th>Room</th>
                <th>Contact</th>
                <th>Problem</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {resolvedData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1} </td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td className="uppercase font-semibold"> {data.username}</td>
                  <td className="w-[100px]">{data.designation}</td>
                  <td className="uppercase">{data.department}</td>

                  <td>{data.room}</td>

                  <td>{data.contact}</td>
                  <td>
                    {data.complain
                      ? data.type + ":" + data.complain
                      : data.type}
                  </td>
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
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default Maintenance;
