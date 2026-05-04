import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ItemEditBtn from "../ActionButton/ItemEditBtn";

import "./TableStyle.css"

const SearchItemTable = ({ data, modalOff }) => {
  const [itItemData, setItItemData] = useState(data);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const handleModal = () => {
    modalOff(true);
  };
  return (
    <>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Date</th>
            <th>Sender</th>
            <th>Challan</th>
            <th>Item Details</th>
            <th>Stock</th>
            <th>Allocaton</th>
            <th>Room</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {itItemData?.map((itData, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(itData.date).toLocaleDateString()}</td>
                <td className="uppercase">{itData.sender}</td>
                <td className="uppercase">{itData.challan}</td>
                <td className="overflow-auto">
                  <Table striped bordered hover>
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
                <td>{itData.allocation}</td>
                <td>{itData.room}</td>
                <td>{itData.remarks}</td>
                <td>
                  <div className="flex justify-content-center hover:cursor-pointer">
                    <ItemEditBtn
                      selectData={itData}
                      btnClicked={true}
                      makeModalOff={handleModal}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Button
          variant="contained"
          color="warning"
          onClick={() => modalOff(true)}
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default SearchItemTable;
