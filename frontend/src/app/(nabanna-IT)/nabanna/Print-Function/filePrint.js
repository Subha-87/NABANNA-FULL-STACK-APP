import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const pdfPrint = (fetchData) => {
  const taskPdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const tableColumn = [
    "Serial",
    "Date",
    "UserName",
    "Rank",
    "Department",
    "Room-No",
    "Problems",
    "Activity",
  ];

  const tableRows = fetchData.map((row, index) => [
    index + 1,
    new Date(row.date).toLocaleDateString(),
    row.username,
    row.designation,
    row.department,
    row.room,
    row.complain ? row.type + ":" + row.complain : row.type,
    row.remarks?.split(":")[1]?.trim() || "",
  ]);

  // ---------------- TITLE ----------------

  const getOneDate = fetchData?.[0]?.date;
  const taskDomain = fetchData?.[0]?.domain;

  const domin =
    taskDomain === "Internet"
      ? "Network"
      : taskDomain === "PC_Hardware"
      ? "System"
      : taskDomain;

  const title = `IT-${domin?.toUpperCase()} MAINTENANCE DATA REPORT`;

  const title2 = `Month Of ${new Date(getOneDate).toLocaleString(
    "default",
    {
      month: "long",
    }
  )} ${new Date(getOneDate).getFullYear()}`;

  // ---------------- PAGE CONFIG ----------------

  const pageWidth = taskPdf.internal.pageSize.getWidth();
  const pageHeight = taskPdf.internal.pageSize.getHeight();

  const margin = 10;

  // Reserve fixed spaces
  const headerSpace = 30;
  const footerSpace = 30;

  // ---------------- TABLE ----------------

  autoTable(taskPdf, {
    theme: "grid",

    head: [tableColumn],
    body: tableRows,

    // VERY IMPORTANT
    startY: headerSpace,

    margin: {
      top: headerSpace,
      bottom: footerSpace,
      left: margin,
      right: margin,
    },

    styles: {
      fontSize: 9,
      halign: "center",
      valign: "middle",
      font: "times",
      overflow: "linebreak",
      cellPadding: 2,
    },

    headStyles: {
      fillColor: [220, 220, 220],
      textColor: 0,
      fontStyle: "bold",
    },

    bodyStyles: {
      textColor: 20,
    },

    didDrawPage: function (data) {
      const pageNumber = taskPdf.getCurrentPageInfo().pageNumber;
      const totalPages = taskPdf.internal.getNumberOfPages();

      // ================= HEADER =================

      // Main title
      taskPdf.setFontSize(16);
      taskPdf.setFont("times", "bold");

      taskPdf.text(title, pageWidth / 2, 12, {
        align: "center",
      });

      // Subtitle
      taskPdf.setFontSize(12);

      taskPdf.text(title2, pageWidth / 2, 19, {
        align: "center",
      });

      // Left info
      taskPdf.setFontSize(10);

      taskPdf.text("PWD-IT", margin, 12);

      taskPdf.text("Site: Nabanna", margin, 18);

      // Header line
      taskPdf.setLineWidth(0.3);

      taskPdf.line(
        margin,
        headerSpace - 5,
        pageWidth - margin,
        headerSpace - 5
      );

      // ================= FOOTER =================

      const footerY = pageHeight - 15;

      // Signature labels
      taskPdf.setFontSize(10);

      taskPdf.text(
        "Service Engineer Signature",
        margin,
        footerY - 10
      );

      taskPdf.text(
        "PWD Signature",
        pageWidth - margin,
        footerY - 10,
        {
          align: "right",
        }
      );

      // Footer line
      taskPdf.line(
        margin,
        footerY - 5,
        pageWidth - margin,
        footerY - 5
      );

      // Footer texts
      taskPdf.setFontSize(9);

      taskPdf.text(
        `Generated: ${new Date().toLocaleDateString()}`,
        margin,
        footerY
      );

      taskPdf.text(
        `Page ${pageNumber} of ${totalPages}`,
        pageWidth - margin,
        footerY,
        {
          align: "right",
        }
      );
    },
  });

  taskPdf.save("nabanna-task.pdf");
};