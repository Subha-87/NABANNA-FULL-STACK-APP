import { Table } from "react-bootstrap";
import "../../TableStyle.css"
import {
  WarrantyColor,
  HardwareCell,
  systemConditionColor,
  getEffectiveAmcStatus,
} from "./Resuable/portableFunction";
import { EditSystem, DeleteSystemBtn } from "../Button/NabannaSystemBtn";

const MachineTable = ({ showdata, refreshData }) => {
  //console.log(Array.isArray(showdata))

  //const dataArray = Array.isArray(showdata) ? showdata : [showdata];

  return (
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
          <th className="th">Office</th>
          <th className="th">CPU</th>
          <th className="th">Monitor</th>
          <th className="th">Printer</th>
          <th className="th">UPS</th>
          <th className="th">Scanner</th>
          <th className="th">Laptop</th>
          <th className="th">Supplier</th>
          <th className="th">Installed</th>
          <th className="th">Remaining Warranty</th>
          <th className="th">AMC Status</th>
          <th className="th">Condition</th>
          <th className="th">Remarks</th>
          <th className="th">Action</th>
        </tr>
      </thead>

      <tbody>
        {showdata.map((row, index) => {
          //const warranty = WarrantyColor(row.remainingWarranty);
          const amcStatus = getEffectiveAmcStatus(row);
          const CONDITION_EMOJI = {
            GOOD: "😄", // happy
            AVERAGE: "😐", // neutral
            BAD: "😞", // sad
          };
          const CONDITION_COLOR = {
            GOOD: "!text-green-600",
            AVERAGE: "!text-yellow-500",
            BAD: "!text-red-600",
          };

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
              <td className="td">{row.supplier}</td>
              <td className="td">
                {row.installationDate
                  ? new Date(row.installationDate).toLocaleDateString()
                  : "-"}
              </td>

              <td
                className={
                  row.remainingWarranty === "Expired"
                    ? "!text-red-600"
                    : "!text-green-600"
                }
              >
                {row.remainingWarranty}
              </td>
              <td
                className={
                  amcStatus === "REQUIRED"
                    ? "!text-red-600 font-semibold"
                    : amcStatus === "ON"
                      ? "!text-green-600 font-semibold"
                      : "!text-blue-600 font-semibold"
                }
              >
                {amcStatus === "NONE"
                  ? "NA"
                  : amcStatus === "REQUIRED"
                    ? "Required AMC"
                    : "AMC ON"}
              </td>
              <td className="td">
                <div
                  className={`flex flex-col items-center justify-center h-full w-full font-semibold ${
                    CONDITION_COLOR[row.systemCondition]
                  }`}
                  title={row.systemCondition}
                >
                  <span className="text-2xl leading-none">
                    {CONDITION_EMOJI[row.systemCondition]}
                  </span>

                  <span className="text-sm mt-1">{row.systemCondition}</span>
                </div>
              </td>
              <td>{row.remarks || "-"}</td>
              <td className="td">
                <div className="flex flex-1 justify-evenly items-center">
                  <EditSystem editRow={row} refreshData={refreshData} />
                  <DeleteSystemBtn del_id={row._id} refreshData={refreshData} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MachineTable;
