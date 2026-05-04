import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { Table } from "react-bootstrap";
import { DataSearchByDate } from "../../component/Button/SearchCase";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";

const PCreport = () => {
  const [resolvedData, setResolvedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const axios = useAxios();

  const currentDate = new Date();
  const dateString = currentDate.toISOString().slice(0, 10);
  const getAllResolvedPCData = async () => {
    const setDomain = "PC_Hardware";
    try {
      const response = await axios.get(
        `/complain/getSolvedITComplain/${setDomain}`,
      );
      //console.log(response);
      setResolvedData(response.data?.data);
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllResolvedPCData();
    const intervalId = setInterval(getAllResolvedPCData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className=" flex justify-content-evenly items-center h-[60px] border-1 border-black">
        <div className="filter-controls">
          <label htmlFor="" className="m-2 font-bold text-xl">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="searchInput"
          />

          <label htmlFor="" className="m-2 font-bold text-xl">
            End Date :
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="searchInput"
          />
          <span className="ml-2">
            <DataSearchByDate
              startDate={startDate}
              endDate={endDate}
              domain="PC_Hardware"
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
          <div>Loading...</div>
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
              </tr>
            </thead>
            <tbody>
              {resolvedData.map((data, index) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default PCreport;
