import { MdBrowserUpdated } from "react-icons/md";
import { useState } from "react";
import SelfEditModal from "../Modal/SelfEditModal";

const SelfEditNet = ({ data,onRefresh }) => {
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

export default SelfEditNet;
