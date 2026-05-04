import { Container, Row, Col } from "react-bootstrap";
import { Label } from "reactstrap";
import { Button, Modal, Box, Typography } from "@mui/material";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Badge from "react-bootstrap/Badge";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import ModalFormat from "../ModalForm/ModalFormat";
import RequisitionForm from "../FormikForm/RequisitionForm";
import RequistionTable from "../TableFormat/RequistionTable";
import AddLetterBtn from "../ActionButton/AddLetterBtn";
import LetterSearchBtn from "../SearchButton/LetterSearchBtn";

import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";

const LetterReg = ({setData}) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchLetter, setSearchLetter] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requsitionData, setRequsitionData] = useState([]);
  const axios = useAxios();

  const getReqData = async () => {
    try {
      const response = await axios.get("/ItReq/allITData");
      //console.log(response);
      setData(response.data?.data) // for badge//
      setRequsitionData(response.data?.data);
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getReqData();
    const interval = setInterval(getReqData, 10000); // every 10s
    return () => clearInterval(interval); // cleanup
  }, []);

  const makeClear = () => {
    setSearchLetter("");
  };
  return (
    <>
      <div className="flex flex-row justify-content-around p-3">
        <AddLetterBtn onSuccess={getReqData} />

        <div>
          <Label className="mr-2 font-bold text-2xl">Search Letter :</Label>
          <input
            type="text"
            placeholder="User/Rank/Dept/Room/Status"
            value={searchLetter}
            className="searchInput"
            onChange={(e) => setSearchLetter(e.target.value)}
          />{" "}
          <LetterSearchBtn searchInfo={searchLetter} clearData={makeClear} />
        </div>
      </div>

      <div className="overflow-auto grow">
        <RequistionTable
          loading={loading}
          letterData={requsitionData}
          onRefresh={getReqData}
          isError={error}
        />
      </div>
    </>
  );
};

export default LetterReg;
