import { MdDeleteForever } from "react-icons/md";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { Button } from "@mui/material";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";

const ReqDeleteBtn = ({ selectedId, onRefresh }) => {
  const axios = useAxios();
  const handleDelete = () => {
    SweetSwal.fire({
      title: "Are you sure?",
      text: "Once deleted,You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Delete!",
    }).then((reply) => {
      if (reply.isConfirmed) {
        axios.delete(`/ItReq/delete/${selectedId}`).then((response) => {
          SweetSwal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success",
          });
        });
        onRefresh()
        .catch((error) => {
          toast.error(error.response.data.message || "Something Went Wrong");
        });
      }
    });
  };
  return (
    <MdDeleteForever
      style={{ color: "red", fontSize: "28px" }}
      onClick={handleDelete}
    />
  );
};

export default ReqDeleteBtn;
