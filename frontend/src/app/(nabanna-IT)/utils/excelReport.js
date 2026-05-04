import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ALL AMC EXCEL REPORT //
export const exportAmcOnlyToExcel = (rows) => {
  if (!rows?.length) {
    alert("No AMC data found");
    return;
  }

  const excelData = rows.map((row, index) => ({
    "Sl No": index + 1,
    Department: row.department,
    Employee: row.employeeName,
    Designation: row.designation,
    Floor: row.floor,
    Room: row.roomNo,
    Office: row.office,
    "AMC Status": row.amcStatus,
    "System Condition": row.systemCondition,
    "Remaining Warranty": row.remainingWarranty,
    CPU: row.systems?.CPU
      ? `${row.systems.CPU.model} (${row.systems.CPU.serial})`
      : "NA",
    MONITOR: row.systems?.MONITOR
      ? `${row.systems.MONITOR.model} (${row.systems.MONITOR.serial})`
      : "NA",
    PRINTER: row.systems?.PRINTER
      ? `${row.systems.PRINTER.model} (${row.systems.PRINTER.serial})`
      : "NA",
    UPS: row.systems?.UPS
      ? `${row.systems.UPS.model} (${row.systems.UPS.serial})`
      : "NA",
    SCANNER: row.systems?.SCANNER
      ? `${row.systems.SCANNER.model} (${row.systems.SCANNER.serial})`
      : "NA",
    Remarks: row.remarks || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "AMC Systems");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([buffer], { type: "application/octet-stream" }),
    "AMC_Systems.xlsx",
  );
};

// NON AMC SYSTEM REPARING WITH PRICE DETAILS EXCEL REPORT //

export const repairDatatoExcel = (rows) => {
  if (!rows?.length) {
    alert("No Repair data found");
    return;
  }
  const excelInformation = rows.map((row, index) => ({
    "Sl No": index + 1,
    Complain: row.date,
    User: row.username,
    Department: row.department,
    Room: row.roomNo,
    Problem: row.complain,
    Details: row.repairDetails,
    Charge: row.priceValue,
    Complet: row.repairDate,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelInformation);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "System Repairing Details");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([buffer], { type: "application/octet-stream" }),
    "Repair_Systems.xlsx",
  );
};
