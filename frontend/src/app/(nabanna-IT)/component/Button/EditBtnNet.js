import { Button } from "@mui/material";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import EditModal from "../Modal/EditModal";
import EditModalVoice from "../Modal/EditModalVoice";
import { useState } from "react";

const EditBtnNet = ({ rowData, rowVoiceData,onRefresh }) => {
  //console.log(rowData)
  //console.log(rowVoiceData)
  const [open, setopen] = useState(false);
  return (
    <>
      <BsFillTelephoneForwardFill
        onClick={() => setopen(true)}
        style={{ color: "green", fontSize: "25px" }}
      />

      {rowData == undefined ? (
        <EditModalVoice
          isModalOpen={open}
          isModalClose={() => setopen(false)}
          editData={rowVoiceData}
          onRefresh={onRefresh}
        />
      ) : (
        <EditModal
          isModalOpen={open}
          isModalClose={() => setopen(false)}
          editData={rowData}
          onRefresh={onRefresh}
        />
      )}
      {/*<EditModal isModalOpen={open} isModalClose={() => setopen(false)} editData ={rowData} />
      <EditModalVoice isModalOpen={open} isModalClose={() => setopen(false)} editData={rowVoiceData} />*/}
    </>
  );
};

export default EditBtnNet;
