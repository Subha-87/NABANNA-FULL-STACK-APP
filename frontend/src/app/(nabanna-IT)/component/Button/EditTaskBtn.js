import { BsFillTelephoneForwardFill } from "react-icons/bs";

import { EditModal, EditModalVoice } from "../Modal/EditTaskModal";
import { useState } from "react";

export const EditBtnNet = ({ rowData, onRefresh }) => {
  const [open, setopen] = useState(false);
  return (
    <>
      <BsFillTelephoneForwardFill
        onClick={() => setopen(true)}
        style={{ color: "green", fontSize: "25px" }}
      />

      <EditModal
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        editData={rowData}
        onRefresh={onRefresh}
      />
    </>
  );
};

export const EditBtnVoice = ({ rowVoiceData, onRefresh }) => {
  const [open, setopen] = useState(false);
  return (
    <>
      <BsFillTelephoneForwardFill
        onClick={() => setopen(true)}
        style={{ color: "green", fontSize: "25px" }}
      />
      <EditModalVoice
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        editData={rowVoiceData}
        onRefresh={onRefresh}
      />
    </>
  );
};



