import { Table, Contaniner, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

import { Button, Badge } from "@mui/material";
import Image from "next/image";
import ReqActionBtn from "../ActionButton/ReqActionBtn";
//import "./FixedHeaderTable.css";
import "./TableStyle.css";
import ReqDeleteBtn from "../ActionButton/ReqDeleteBtn";
import ReqEditBtn from "../ActionButton/ReqEditBtn";
import ReqReAssignBtn from "../ActionButton/ReqReAssignBtn";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Alert, Stack } from "@mui/material";
import { ErrorDisplay } from "@/app/utils/axiosError";
import { isNew } from "@/app/NewLogic/dayLimit";

const RequistionTable = ({ loading, letterData, onRefresh, isError }) => {
  const [newRowIds, setNewRowIds] = useState([]);

  // To Open Letter File ON new Tab //

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="success" />
        </Box>
      ) : isError ? (
        <ErrorDisplay err={isError} />
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
              <th>Category</th>
              <th>Contact</th>
              <th>Task Alloted</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {letterData.map((data, index) => {
              return (
                <tr key={data._id} className={`${isNew(data.date) ? "new-row" : ""}`}>
                  <td>{index + 1} </td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td
                    className="w-[100px] h-[60px] hover:cursor-pointer"
                  >
                    <div className="img-wrapper">
                      {isNew(data.date) && (
                        <span className="new-badge">NEW</span>
                      )}
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
                  <td>{data.department?.toUpperCase()}</td>
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
                  <td className="w-[140px]">
                    <div className="flex justify-content-evenly hover:cursor-pointer mb-2">
                      <ReqActionBtn selectedRow={data} onRefresh={onRefresh} />
                      <ReqEditBtn selectedRow={data} onRefresh={onRefresh} />
                      <ReqDeleteBtn
                        selectedId={data._id}
                        onRefresh={onRefresh}
                      />
                    </div>
                    <div>
                      <ReqReAssignBtn
                        selectedRow={data}
                        onRefresh={onRefresh}
                      />
                    </div>
                  </td>
                  {/*<td><Button variant='contained' onClick={() => handleOpen(data._id)} color='success'>EDIT</Button ><Button variant='contained' color='warning'>DELETE</Button></td>*/}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default RequistionTable;
