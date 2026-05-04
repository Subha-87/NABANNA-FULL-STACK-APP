import { Table } from "react-bootstrap";
import "../CSS/Table.css";
import { HardwareCell, exportToExcel } from "./Resuable/portableFunction";
import { Button } from "@mui/material";

const SearchSystemDetails = ({ filterData }) => {
  // not using right now //
  return (
    <>
      {filterData.length == 0 ? (
        <div className="flex flex-column text-center text-3xl font-bold text-blue-700">
          No Data Available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Button
            variant="contained"
            color="success"
            onClick={() => exportToExcel(filterData)}
          >
            Export Excel
          </Button>
          <Table
            striped
            bordered
            hover
            className="w-full border text-sm custom-table"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="th">Serial</th>
                <th className="th">Department</th>
                <th className="th">Employee</th>
                <th className="th">Designation</th>
                <th className="th">Floor</th>
                <th className="th">Room</th>
                <th className="th">Office Name</th>
                <th className="th">CPU</th>
                <th className="th">Monitor</th>
                <th className="th">Printer</th>
                <th className="th">UPS</th>
                <th className="th">Scanner</th>
                <th className="th">Laptop</th>
                <th className="th">Remaining Warranty</th>
                <th className="th">AMC Status</th>
                <th className="th">Condition</th>
                <th className="th">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {filterData.map((row, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="td">{index + 1}</td>
                    <td className="td">{row.department}</td>
                    <td className="td">{row.employeeName}</td>
                    <td className="td">{row.designation}</td>
                    <td className="td">{row.floor}</td>
                    <td className="td">{row.roomNo || "NA"}</td>
                    <td className="td">{row.office || "NA"}</td>

                    <td className="td">
                      <HardwareCell device={row.systems?.CPU} />
                    </td>
                    <td className="td">
                      <HardwareCell device={row.systems?.MONITOR} />
                    </td>
                    <td className="td">
                      <HardwareCell device={row.systems?.PRINTER} />
                    </td>

                    <td className="td">
                      <HardwareCell device={row.systems?.UPS} />
                    </td>
                    <td className="td">
                      <HardwareCell device={row.systems?.SCANNER} />
                    </td>
                    <td className="td">
                      <HardwareCell device={row.systems?.LAPTOP} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default SearchSystemDetails;
