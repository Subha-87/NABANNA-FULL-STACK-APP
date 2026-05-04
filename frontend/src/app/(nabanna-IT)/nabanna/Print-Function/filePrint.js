import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const pdfPrint = (fetchData) => {
  //console.log("for pdf print:", fetchData);
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
    row.complain ? row.type + ":" + row.complain : row.type, // add row.type also
    row.remarks.split(":")[1].trim(),
  ]);

  // Headline //
  const getOneDate = fetchData.map((data) => data.date)[0];
  const taskDomain = fetchData.map((d) => d.domain)[0];
  const domin =
    taskDomain == "Internet"
      ? "Network"
      : taskDomain == "PC_Hardware"
        ? "System"
        : taskDomain;
  const title = `IT-${domin.toUpperCase()} MAINTENANCE DATA REPORT`;
  const title2 = `Month Of ${new Date(getOneDate).toLocaleString("default", {
    month: "long",
  })} ${new Date(getOneDate).getFullYear()}`;

  // Page dimensions
  const pageWidth = taskPdf.internal.pageSize.getWidth(); //Calculate page dimensions using pageSize.getWidth()/getHeight()
  const pageHeight = taskPdf.internal.pageSize.getHeight();
  const margin = 10; //General page margin (used on all sides)
  const headerHeight = 15; //Space reserved at top of page
  const footerHeight = 10; //Space reserved at bottom of page

  // Add title above table (on first page)
  taskPdf.setFontSize(18);
  taskPdf.text(title, pageWidth / 2, margin, { align: "center" });
  taskPdf.setFontSize(14);
  taskPdf.text(title2, pageWidth / 2, margin + 6, { align: "center" });

  autoTable(taskPdf, {
    theme: "grid",
    //margin: { top: 40, left: 10, bottom: 30, right: 10 },
    head: [tableColumn],
    body: tableRows,
    startY: margin + headerHeight, // Position below header where table starts
    margin: { top: margin + headerHeight }, // Ensures table respects header space
    styles: {
      fontSize: 10,
      halign: "center",
      valign: "middle",
      font: "times",
    },
    didDrawPage: function (data) {
      // Current page number (1-indexed)
      const pageNumber = data.pageNumber; //Current page index (1-based)
      const totalPages = taskPdf.internal.getNumberOfPages();

      // HEADER - Draw on every page
      taskPdf.setFontSize(12);
      taskPdf.setFont(undefined, "bold");
      taskPdf.text("PWD-IT", margin, margin);
      taskPdf.setFontSize(10);
      taskPdf.text("Site:Nabanna", margin, margin + 5);

      // Draw line under header
      taskPdf.setLineWidth(0.2);
      taskPdf.line(margin, margin + 10, pageWidth - margin, margin + 10);

      // FOOTER - Draw on every page
      //const footerY = pageHeight - margin;
      const footerY = pageHeight - footerHeight;
      taskPdf.setFontSize(12);
      taskPdf.setFont(undefined, "normal");

      // Left-aligned text above Footer Line
      taskPdf.text("Service Engineer Signature", margin, footerY - 20, {
        align: "left",
      });

      // Right-aligned text above Footer Line
      taskPdf.text("PWD Signature", pageWidth - margin, footerY - 20, {
        align: "right",
      });

      taskPdf.setFontSize(10);

      // Footer line
      taskPdf.setLineWidth(0.2);
      taskPdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

      // Left-aligned text under Footer Line
      taskPdf.text(
        `Generated: ${new Date().toLocaleDateString()}`,
        margin,
        footerY,
      );

      // Right-aligned text under Footer Line
      taskPdf.text(
        `Page ${pageNumber} of ${totalPages}`,
        pageWidth - margin,
        footerY,
        {
          align: "right",
        },
      );
    },
  });

  taskPdf.save("nabanna-task.pdf");
};
