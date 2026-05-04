import { MdDeleteForever } from "react-icons/md";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";
import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";

const ItemDeleteBtn = ({ del_id, onRefresh }) => {
  const axios = useAxios();
  const handleDelete = async () => {
    //alert(del_id);
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
        axios
          .delete(`/itemNabanna/delete/${del_id}`)

          .then((response) => {
            SweetSwal.fire({
              title: "Deleted!",
              text: response.data.message,
              icon: "success",
            });
          });
        onRefresh().catch((error) => {
          //SweetSwal.fire("Something Went Wrong", error.message);
          toast.error(error.response.data?.message || "Somthing Went Wrong");
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

export default ItemDeleteBtn;
