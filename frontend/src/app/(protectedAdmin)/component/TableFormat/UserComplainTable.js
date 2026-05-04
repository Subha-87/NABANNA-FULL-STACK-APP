import { Table, Contaniner, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./TableStyle.css";
import Image from "next/image";
import loadinImg from "../AdminImageFolder/cargando-loading.gif";
import { ErrorDisplay } from "@/app/utils/axiosError";
import { isNew } from "@/app/NewLogic/dayLimit";
import DeleteComplain from "../ActionButton/DeleteComplain";

const UserComplainTable = ({ data, loading, isError, onRefresh }) => {
  return (
    <>
      {loading ? (
        <div className=" flex flex-column text-center ">
          <div className="flex justify-content-center">
            <Image
              src={loadinImg}
              alt="Loading animation"
              width={300}
              height={300}
              unoptimized={true} // Optional: Bypasses Next.js image optimization for the GIF
            />
          </div>
        </div>
      ) : isError ? (
        <ErrorDisplay err={isError} />
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Date</th>
              <th>Username</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Category</th>
              <th>Problem</th>
              <th>Room</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr key={index} className={isNew(data.date) ? "new-row" : ""}>
                  <td>{index + 1} </td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>

                  <td>
                    <span className="username-text">
                      {data.username}

                      {isNew(data.date) && (
                        <span className="inline-badge">NEW</span>
                      )}
                    </span>
                  </td>
                  <td className="w-[100px]">{data.designation}</td>
                  <td>{data.department?.toUpperCase()}</td>
                  <td>{data.domain}</td>
                  <td className="w-[300px]">
                    <span className="text-red-800 font-bold">
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
                  <td className="w-[250px] h-[100px] relative overflow-auto">
                    {data.remarks}
                  </td>
                  <td className="w-[50px]">
                    <span className="flex flex-1 justify-center items-center">
                      <DeleteComplain del_id={data._id} onRefresh={onRefresh} />
                    </span>
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

export default UserComplainTable;
