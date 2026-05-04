import { useAxios } from "@/app/Hook/useAxios";
import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Image from "next/image";
import {
  EditRepairBtn,
  RepairExcelBtn,
  DeleteRepairBtn,
} from "../../component/Button/NabannaSystemBtn";
import "../../FixedHeaderTable.css";
import pageLoad from "../../../../../public/Loading/pizzaninjas-pizza-ninjas.gif";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";

const NoAmc = () => {
  const [repairData, setRepairData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAxios();
  const getData = async () => {
    //setIsLoading(true);
    
    try {
      const response = await axios.get("/NabannaSystem/get-repair");
      //console.log(response);
      if (response.data.success) {
        setRepairData(response.data.data);
      }
    } catch (error) {
      //console.error(error);
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 10000); // every 10s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="flex flex-1 flex-column">
      <div
        className="h-[9%]  p-2 flex justify-evenly items-center"
        style={{ backgroundColor: "#F2EAD3" }}
      >
        <RepairExcelBtn excelData={repairData} />
      </div>
      <Container className="overflow-auto grow">
        {isLoading ? (
          <div className="flex flex-column text-center  text-2xl font-bold">
            <div className="flex justify-content-center">
              <Image
                src={pageLoad}
                alt="Loading animation"
                width={300}
                height={300}
                unoptimized={true} // Optional: Bypasses Next.js image optimization for the GIF
              />
            </div>
          </div>
        ) : error ? (
          <ErrorDisplay err={error} />
        ) : (
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Date</th>
                <th>Username</th>
                <th>Department</th>
                <th>Room</th>
                <th>Complain</th>

                <th>Finish Date</th>
                <th>Repair Parts</th>
                <th>Price(₹)</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {repairData.map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{new Date(d.date).toLocaleDateString()}</td>
                  <td>{d.username}</td>
                  <td>{d.department}</td>
                  <td>{d.room}</td>
                  <td>{d.complain}</td>

                  <td>
                    {d.repairDate
                      ? new Date(d.repairDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{d.repairPart}</td>
                  <td className="text-right font-semibold">
                    ₹ {Number(d.priceValue || 0).toFixed(2)}
                  </td>
                  <td>{d.remarks}</td>
                  <td>
                    <div className="flex flex-1 justify-evenly items-center">
                      <EditRepairBtn editId={d._id} refreshData={getData} />
                      <DeleteRepairBtn delId={d._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default NoAmc;
