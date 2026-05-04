import { FaEdit } from "react-icons/fa";
import EditComplainModal from "../../component/Modal/EditComplainModal";
import { useState } from "react";

 const EditComplainBtn = ({ editData,onRefresh }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FaEdit
        style={{ color: "green", fontSize: "20px" }}
        onClick={() => setOpen(true)}
      >
        Edit
      </FaEdit>
      <EditComplainModal
        isModalOpen={open}
        isModalClose={() => setOpen(false)}
        editData={editData}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default EditComplainBtn

