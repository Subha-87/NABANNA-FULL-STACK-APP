import { Table as TableIcon } from "lucide-react";
import Image from "next/image";
import ItemDetails from "./Helper";
import { EditBtn, DeleteBtn } from "../../component/ActionButton/MeetingButton";
import "./Table.css";

const TableContainer = ({ tableData, tableError, isLoading,onRefresh}) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">Loading...</div>
    );
  }

  if (tableError) {
    return <div className="text-red-500 py-5">{tableError}</div>;
  }

  if (!tableData || tableData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <TableIcon size={40} className="text-gray-400" />
        <p className="text-gray-500 mt-2">No data found</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table striped bordered hover className="custom-table">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-3 text-left">
              Serial
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">Date</th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Requisition
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Name of Programme
            </th>
            <th className="border border-gray-200 px-4 py-3 text-left">
              Organiser Dept
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Venue
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">Time</th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Agency
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Item Details
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Remarks
            </th>

            <th className="border border-gray-200 px-4 py-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr key={row._id} className="hover:bg-gray-50">
              {/* Serial */}
              <td className="border border-gray-200 px-4 py-3">{index + 1}</td>

              {/* Date */}
              <td className="border border-gray-200 px-4 py-3">
                {new Date(row.meetingDate).toLocaleDateString("en-IN")}
              </td>

              {/* Requisition */}
              <td className="border border-gray-200 px-4 py-3">
                {row.letter?.filename ? (
                  <Image
                    width={100}
                    height={60}
                    alt="Requsition Letter"
                    src={`http://10.10.119.160/api/uploads/images/Meetings/${row.letter.filename}`}
                    onClick={() =>
                      openInNewTab(
                        `/api/uploads/images/Meetings/${row.letter.filename}`,
                      )
                    }
                  />
                ) : (
                  <div className="no-image-placeholder">No Image</div>
                )}
              </td>

              {/* Programme */}
              <td className="border border-gray-200 px-4 py-3">
                {row.programmeName}
              </td>
              <td className="border border-gray-200 px-4 py-3">
                {row.organiser}
              </td>

              {/* Venue */}
              <td className="border border-gray-200 px-4 py-3">{row.venue}</td>

              {/* Time */}
              <td className="border border-gray-200 px-4 py-3">
                {row.meetingTime}
              </td>

              {/* Agency */}
              <td className="border border-gray-200 px-4 py-3">{row.agency}</td>

              {/* Item Details */}
              <td className="border border-gray-200 px-4 py-3">
                <ItemDetails itemDetails={row.itemDetails} />
              </td>

              {/* Remarks */}
              <td className="border border-gray-200 px-4 py-3">
                {row.remarks}
              </td>

              {/* Action */}
              <td className="border border-gray-200 px-4 py-3">
                {/* Edit / Delete will come here */}-
                <span className="flex justify-evenly">
                  <EditBtn editData={row} onRefresh ={onRefresh} />
                  <DeleteBtn delId={row._id} onRefresh ={onRefresh} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContainer;
