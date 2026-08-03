export const HardwareCell = ({ device }) => {
  if (!device) return <span className="text-gray-400">-</span>;

  return (
    <div className="text-xs leading-4">
      <div>
        <b>Make:</b> {device.make}
      </div>
      <div>
        <b>Model:</b> {device.model}
      </div>
      <div>
        <b>SN:</b> {device.serial}
      </div>
    </div>
  );
};

export const WarrantyColor = (remainingWarranty) => {
  if (!remainingWarranty || remainingWarranty === "-") return "inherit";

  if (remainingWarranty === "Expired")
    return {
      text: "Required AMC",
      color: "red",
    };

  // extract years & months
  const match = remainingWarranty.match(/(\d+)y\s*(\d+)m/);
  if (!match) {
    return { text: remainingWarranty, color: "inherit" };
  }

  const years = Number(match[1]);
  const months = Number(match[2]);

  const totalMonths = years * 12 + months;

  if (totalMonths <= 6) {
    // 🟡 < 6 months
    return {
      text: remainingWarranty,
      color: "orange",
    };
  }
  // 🟢 Normal
  return {
    text: remainingWarranty,
    color: "green",
  };
};

export const systemConditionColor = (condition) => {
  switch (condition) {
    case "GOOD":
      return "text-green-600";
    case "AVERAGE":
      return "text-yellow-500";
    case "BAD":
      return "text-red-600";
    default:
      return "";
  }
};

export const getEffectiveAmcStatus = (row) => {
  if (row.remainingWarranty === "Expired" && row.amcStatus === "NONE") {
    return "REQUIRED";
  }
  return row.amcStatus;
};

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (rows) => {
  const excelData = rows.map((row, index) => ({
    "Sl No": index + 1,
    Department: row.department,
    Floor: row.floor,
    Room: row.roomNo,
    Employee: row.employeeName,
    Designation: row.designation,
    CPU: row.systems?.CPU
      ? `${row.systems.CPU.model} (${row.systems.CPU.serial})`
      : "",
    Monitor: row.systems?.MONITOR
      ? `${row.systems.MONITOR.model} (${row.systems.MONITOR.serial})`
      : "",
    Printer: row.systems?.PRINTER
      ? `${row.systems.PRINTER.model} (${row.systems.PRINTER.serial})`
      : "",
    UPS: row.systems?.UPS
      ? `${row.systems.UPS.model} (${row.systems.UPS.serial})`
      : "",
    Scanner: row.systems?.SCANNER
      ? `${row.systems.UPS.model} (${row.systems.UPS.serial})`
      : "",
    Laptop: row.systems?.LAPTOP
      ? `${row.systems.UPS.model} (${row.systems.UPS.serial})`
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Hardware");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Employee_Hardware_Report.xlsx");
};
