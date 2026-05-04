import { Table, Contaniner, Row, Col } from "react-bootstrap";


import "./FixedHeaderTable.css";
import ItemEditBtn from "../ActionButton/ItemEditBtn";
import ItemDeleteBtn from "../ActionButton/ItemDeleteBtn";
import { ErrorDisplay } from "@/app/utils/axiosError";


const MaterialTable = ({ data, loading, onRefresh, isError }) => {
  return (
    <>
      {loading ? (
        <div className="text-center text-2xl text-black">Loading...</div>
      ) : isError ? (
        <ErrorDisplay err={isError} />
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Challan No</th>
              <th>Item Details</th>
              <th>Stock</th>
              <th>Allocaton</th>
              <th>Room</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((itData, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(itData.date).toLocaleDateString()}</td>
                  <td>{itData.sender}</td>
                  <td>{itData.challan}</td>
                  <td className="overflow-y-auto">
                    {" "}
                    <Table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Item</th>
                          <th>Model</th>
                          <th>Make</th>
                          <th>Qty</th>
                          <th>Serial</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itData.itItems.map((itemList, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td> {itemList.item}</td>
                            <td>{itemList.model}</td>
                            <td>{itemList.make}</td>
                            <td>{itemList.qty}</td>
                            <td>{itemList.serial}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>

                  <td>{itData.stock}</td>
                  <td className="w-[150px]">{itData.allocation}</td>
                  <td>{itData.room}</td>
                  <td className="w-[200px]">{itData.remarks}</td>
                  <td>
                    <div className="flex justify-content-center hover:cursor-pointer ">
                      <ItemEditBtn selectData={itData} onRefresh={onRefresh} />

                      <ItemDeleteBtn
                        del_id={itData._id}
                        onRefresh={onRefresh}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MaterialTable;
