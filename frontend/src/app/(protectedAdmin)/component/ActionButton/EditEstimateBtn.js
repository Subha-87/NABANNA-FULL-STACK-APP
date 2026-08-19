import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import { EditNabannaModal, ViewChallanModal } from "../ModalForm/EstimateModal";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { toast } from "react-toastify";

export const EditNabannaEstimate = ({ rowData, onRefresh }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FaRegEdit
        style={{ color: "green", fontSize: "25px" }}
        onClick={() => setOpen(true)}
      />
      <EditNabannaModal
        isOpen={open}
        isClose={() => setOpen(false)}
        rowData={rowData}
        onRefresh={onRefresh}
      />
    </>
  );
};

export const ViewChallan = ({ rowId }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GrView
        style={{ color: "violet", fontSize: "25px" }}
        onClick={() => setOpen(true)}
      />
      <ViewChallanModal
        isOpen={open}
        isClose={() => setOpen(false)}
        viewId={rowId}
      />
    </>
  );
};

export const DeleteEstimate = ({ selectedRowId,onRefresh }) => {
  const axios = useAxios();
  const handleDelete = async () => {
    const del_id = selectedRowId;
    SweetSwal.fire({
      title: "Are you sure?",
      text: "Once deleted,You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Delete!",
    }).then((reply) => {
      if (reply.isConfirmed) {
        axios.delete(`/estimateReg/delete/${del_id}`).then((response) => {
          SweetSwal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success",
          });
        });
        onRefresh().catch((error) => {
          toast.error(error.response.data.message || "Something Went Wrong");
        });
      }
    });
  };

  return (
    <MdDelete
      style={{ color: "red", fontSize: "25px" }}
      onClick={handleDelete}
    />
  );
};
