import { Table, Contaniner, Row, Col } from "react-bootstrap";
import { useState} from "react";
import Image from "next/image";
import "./TableStyle.css";
import {
  EditNabannaEstimate,
  ViewChallan,
  DeleteEstimate
} from "../ActionButton/EditEstimateBtn";
import { ImUpload } from "react-icons/im";
import { Button } from "@mui/material";
//import axios from "axios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import loadinImg from "../AdminImageFolder/cargando-loading.gif";
import { GrView } from "react-icons/gr";
import { toast } from "react-toastify";
import UploadIcon from "@mui/icons-material/Upload";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";
import { useEstimate } from "../Providers/EstimateProviders";

export const NabannaEstimateTable = () => {
  const [file, setFile] = useState(null);
  const axios = useAxios();
  const { estData, loading, error, getEstimateRecords } = useEstimate();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  // Department Approval Copy Upload //
  const handleUpload = async (row_id) => {
    const _id = row_id;
    if (!file) return toast.warning("Please Upload Approval Copy First");
    const formData = new FormData();
    formData.append("apprv_copy", file);

    try {
      const response = await axios.put(
        //`http://10.10.119.160:5000/api/estimateReg/upload/${_id}`,
        `/estimateReg/upload/${_id}`,
        formData,
      );
      //console.log(response);
      getEstimateRecords(); //refresh Table //
      toast.success(response.data.message || "Upload Successful");
    } catch (error) {
      //console.error(error);
      toast.error("Something Wrong");
    }
  };

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
      ) : error ? (
        <ErrorDisplay err={error} />
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Memo</th>
              <th>Date</th>
              <th>Estimate</th>
              <th>Work Name</th>
              <th>Cost</th>
              <th>Department</th>
              <th>Room No</th>
              <th>Requistion Letter</th>
              <th>Approval</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {estData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.memo}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td>
                  {data.est_copy_url ? (
                    <Image
                      className="showImg"
                      width={100}
                      height={60}
                      alt="Estimate Copy"
                      //src = {`http://10.10.119.160:5000${data.est_copy_url}`}
                      src={`http://10.10.119.160/api${data.est_copy_url}`}
                      //onClick={() => openInNewTab(`http://10.10.119.160:5000${data.est_copy_url}`)}
                      onClick={() => openInNewTab(`/api${data.est_copy_url}`)}
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
                  )}
                </td>
                <td className="w-[300px]">
                  <span className="font-semibold text-green-900">
                    {data.work_name}
                  </span>
                </td>
                <td>
                  <span className="text-purple-900 font-extrabold">
                    ₹{data.cost}
                  </span>
                </td>

                <td>{data.department}</td>
                <td>{data.room}</td>
                <td>
                  {data.req_letter_url ? (
                    <Image
                      className="showImg"
                      width={100}
                      height={60}
                      alt="Requistion Copy"
                      //src = {`http://10.10.119.160:5000${data.req_letter_url}`}
                      src={`http://10.10.119.160/api${data.req_letter_url}`}
                      onClick={() => openInNewTab(`/api${data.req_letter_url}`)}
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
                  )}
                </td>
                <td className="flex justify-content-center hover:cursor-pointer ">
                  {data.apprv_copy_url ? (
                    <div className="w-[150px]">
                      <Image
                        className="showImg"
                        width={200}
                        height={60}
                        alt="Approval Copy"
                        //src = {`http://10.10.119.160:5000${data.apprv_copy_url}`}
                        src={`http://10.10.119.160/api${data.apprv_copy_url}`}
                        onClick={() =>
                          openInNewTab(`/api${data.apprv_copy_url}`)
                        }
                      />
                    </div>
                  ) : (
                    <div className="no-image-placeholder flex flex-column w-[200px] text-red-600">
                      No Approval Copy
                      <input
                        type="file"
                        name="apprv_copy"
                        className="border-1 border-black rounded-3"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        className="mt-2"
                        startIcon={<UploadIcon />}
                        onClick={() => handleUpload(data._id)}
                      >
                        Upload
                      </Button>
                    </div>
                  )}
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
                <td>
                  <div className="flex justify-content-center hover:cursor-pointer ">
                    <EditNabannaEstimate
                      rowData={data}
                      onRefresh={getEstimateRecords}
                    />
                    <ViewChallan rowId={data._id} />
                    <DeleteEstimate selectedRowId={data._id} onRefresh={getEstimateRecords} />
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

export const SearchEstmateNabannaTable = ({ searchResult, error}) => {
  const [file, setFile] = useState(null);
  const { getEstimateRecords } = useEstimate();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <>
      {error ? (
        <div className="text-center text-2xl text-blue-700">
          No Estimate Found || {error}
        </div>
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Memo</th>
              <th>Date</th>
              <th>Estimate</th>
              <th>Work Name</th>
              <th>Cost</th>
              <th>Department</th>
              <th>Room No</th>
              <th>Requistion Letter</th>

              <th>Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.memo}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td>
                  {data.est_copy_url ? (
                    <Image
                      className="showImg"
                      width={100}
                      height={60}
                      alt="Estimate Copy"
                      src={`http://10.10.119.160/api${data.est_copy_url}`}
                      onClick={() => openInNewTab(`/api${data.est_copy_url}`)}
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
                  )}
                </td>
                <td className="w-[300px]">
                  <span className="font-semibold text-green-900">
                    {data.work_name}
                  </span>
                </td>
                <td>
                  <span className="text-purple-900 font-extrabold">
                    ₹{data.cost}
                  </span>
                </td>

                <td>{data.department}</td>
                <td>{data.room}</td>
                <td>
                  {data.req_letter_url ? (
                    <Image
                      className="showImg"
                      width={100}
                      height={60}
                      alt="Requistion Copy"
                      src={`http://10.10.119.160/api${data.req_letter_url}`}
                      onClick={() => openInNewTab(`/api${data.req_letter_url}`)}
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
                  )}
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
                <td>
                  <div className="flex justify-content-center hover:cursor-pointer ">
                    <EditNabannaEstimate rowData={data} onRefresh={getEstimateRecords}  />
                    
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
