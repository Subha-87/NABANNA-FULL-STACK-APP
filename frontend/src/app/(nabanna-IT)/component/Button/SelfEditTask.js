import { MdBrowserUpdated } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useState } from "react";

import {
  SelfEditModal,
  SelfEditVoiceModal,
  SelfEditTVModal,
} from "../Modal/SelfEditTaskModal";

export const SelfEditNet = ({ data, onRefresh }) => {
  const [open, setopen] = useState(false);
  return (
    <>
      <MdBrowserUpdated
        style={{ color: "purple", fontSize: "28px" }}
        onClick={() => setopen(true)}
      />
      <SelfEditModal
        editData={data}
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};

export const SelfEditVoice = ({ data, onRefresh }) => {
  const [open, setopen] = useState(false);
  return (
    <>
      <MdBrowserUpdated
        style={{ color: "purple", fontSize: "28px" }}
        onClick={() => setopen(true)}
      />
      <SelfEditVoiceModal
        editData={data}
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};

export const SelfEditBtnCatv = ({ data, onRefresh }) => {
  const [open, setopen] = useState(false);
  //console.log(data)
  return (
    <>
      <FaEdit
        style={{ color: "green", fontSize: "28px" }}
        onClick={() => setopen(true)}
      />
      <SelfEditTVModal
        editData={data}
        isModalOpen={open}
        isModalClose={() => setopen(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};
