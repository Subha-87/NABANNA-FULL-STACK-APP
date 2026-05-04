import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Image from "next/image";

import "./TableStyle.css"

const SearchLetterTable = ({ result }) => {
  //console.log(result)
  const [filterResult, setFilterResult] = useState(result);
  // To Open Letter File ON new Tab //

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>Serial</th>
          <th>Date</th>
          <th>Letter</th>
          <th>User</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Cell/Group</th>
          <th>Room No</th>
          <th>Category</th>
          <th>Contact</th>
          <th>Current Task Alloted</th>
          <th>Status</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {filterResult.map((data, index) => {
          return (
            <tr key={data._id}>
              <td>{index + 1} </td>
              <td>{new Date(data.date).toLocaleDateString()}</td>
              <td>
                <Image
                  className="showImg"
                  width={200}
                  height={100}
                  alt="Requsition Letter"
                  src={`http://10.10.119.160:5000/ItReq/letter_pic/${data._id}`}
                  onClick={() =>
                    openInNewTab(
                      "http://10.10.119.160:5000/ItReq/letter_pic/" + data._id,
                    )
                  }
                />
              </td>
              <td> {data.username}</td>
              <td>{data.designation}</td>
              <td>{data.department}</td>
              <td>{data.subgroup}</td>
              <td>{data.room}</td>
              <td>{data.lcategory}</td>
              <td>{data.contact}</td>
              <td>{data.itPerson}</td>
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
  );
};

export default SearchLetterTable;
