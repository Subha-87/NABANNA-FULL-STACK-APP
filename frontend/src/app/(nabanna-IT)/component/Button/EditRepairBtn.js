import { FaTools } from "react-icons/fa";
import { useAxios } from "@/app/Hook/useAxios";
import { SweetSwal } from "@/component/ConstValues/sweetAlert";

const EditRepairBtn = ({ rData }) => {
  const { date, username, department, room, complain } = rData;
  const madeDataforRepair = {
    date,
    username,
    department,
    room,
    complain,
  };
  const axios = useAxios();
  const handleRepairSystem = async () => {
    // 1) selected row send to repair section //
    //return alert('repair')
    SweetSwal.fire({
      title: "Do you want to repair with charges?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Send",
      denyButtonText: `Don't send`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "/NabannaSystem/repair",
            madeDataforRepair,
          );
          //console.log(response);
          SweetSwal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          //console.log(error);
          toast.error(error.response.data.message || "Something went wrong!");
        }
      } else if (result.isDenied) {
        SweetSwal.fire("System Reparing Does not need any Charges", "", "info");
      }
    });
  };
  return (
    <FaTools
      style={{ color: "red", fontSize: "20px", marginLeft: 3 }}
      onClick={handleRepairSystem}
    />
  );
};

export default EditRepairBtn;
