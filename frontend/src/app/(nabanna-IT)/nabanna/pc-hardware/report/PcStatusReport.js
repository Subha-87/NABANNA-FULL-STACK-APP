"use client"
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../../../FixedHeaderTable.css";
import { Table } from "react-bootstrap";
import { pdfPrint } from "../../Print-Function/filePrint";

const PcStatusReport = () => {
  const [fetchData, setFetchData] = useState([]);
  const getOneDate = fetchData.map((data) => data.date)[0]; // extract any one date from selected array result //
  useEffect(() => {
    const storedData = localStorage.getItem("axiosData");

    if (storedData) {
      setFetchData(JSON.parse(storedData));
      //console.log("Data in new tab:",fetchData)
    }
  }, []);

  return (
    <>
      <div className="border-1 border-b flex justify-content-evenly items-center text-3xl font-semibold bg-blue-800 text-blue-50 h-[70px]">
        Nabanna System Hardware Maintenance Report :{" "}
        {new Date(getOneDate).toLocaleString("default", { month: "long" })}{" "}
        {new Date(getOneDate).getFullYear()}
        <Button
          variant="contained"
          color="success"
          onClick={() => pdfPrint(fetchData)} // pass the selected data from date filter for print as pdf//
          className="m-2"
        >
          Export DataSheet
        </Button>
      </div>
      <div>
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

              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1} </td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td className="uppercase font-semibold"> {data.username}</td>
                <td className="w-[100px]">{data.designation}</td>
                <td className="uppercase">{data.department}</td>

                <td>
                  {data.complain ? data.type + ":" + data.complain : data.type}
                </td>
                <td>{data.room}</td>

                <td>{data.contact}</td>

                <td className="w-[200px]">
                  {data.remarks.split(":")[1].trim()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PcStatusReport;
