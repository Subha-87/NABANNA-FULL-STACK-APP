import React, { useState, useRef } from "react";
import { useAuth } from "@/app/Hook/useAuth";
//import letterLogo from "../../../../../public/LoginImage/Emblem_of_West_Bengal_(2018-present).svg.png";
import letterLogo from "../../../../../public/LogoImage/ashok-stambh-logo.png"
import Image from "next/image";

const toOptions = [
  "Officer In-Charge, Director Of Security, Kolkata Police",
  "Officer In-Charge, Special Branch, Kolkata Police",
  "Officer In-Charge, Reserve Force, Kolkata Police",
  "Assistant Commissioner Of Police, Reserve Force, Nabanna",
  "OSD, Special Branch, Kolkata Police",
  "Security In-Charge, NIS",
];

const copyOptions = [
  "Officer In-Charge, Director Of Security, Kolkata Police",
  "Officer In-Charge, Special Branch, Kolkata Police",
  "Officer In-Charge, Reserve Force, Kolkata Police",
  "Assistant Commissioner Of Police, Reserve Force, Nabanna",
  "OSD, Special Branch, Kolkata Police",
  "Security In-Charge, NIS",
  "Assistant Engineer, Nabanna IT Subdivision",
  "Executive Engineer, Kolkata IT Division",
];

const PermissionNew = () => {
  const [memoNo, setMemoNo] = useState("");
  const [letterDate, setLetterDate] = useState("");
  const [toAddress, setToAddress] = useState(toOptions[0]);
  const [subject, setSubject] = useState("");
  const [letterBody, setLetterBody] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [workers, setWorkers] = useState([""]);
  const [copyForward, setCopyForward] = useState([]);

  const printRef = useRef(null);
  const { authName, authRank } = useAuth();

  const TOTAL_WORKER_ROWS = 10;

  const addWorker = () => {
    if (workers.length < TOTAL_WORKER_ROWS) {
      setWorkers([...workers, ""]);
    }
  };

  const removeWorker = (index) => {
    if (workers.length > 1) {
      setWorkers(workers.filter((_, i) => i !== index));
    }
  };

  const updateWorker = (index, value) => {
    const updated = [...workers];
    updated[index] = value;
    setWorkers(updated);
  };

  const toggleCopy = (option) => {
    setCopyForward((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  /* ── Title Case Helper ── */
  const toTitleCase = (str) => {
    const preserveWords = [
      "Kolkata",
      "Nabanna",
      "Howrah",
      "OSD",
      "NIS",
      "PWD",
      "IT",
      "Subdivision",
    ];
    const lowerWords = ["of", "the", "and", "for", "in", "to"];

    return str
      .trim()
      .split(/\s+/)
      .map((word) => {
        const hasComma = word.endsWith(",");
        const clean = hasComma ? word.slice(0, -1) : word;

        let result;
        if (
          preserveWords.some(
            (pw) => clean.toLowerCase() === pw.toLowerCase(),
          )
        ) {
          result =
            preserveWords.find(
              (pw) => pw.toLowerCase() === clean.toLowerCase(),
            ) || clean;
        } else if (clean.toLowerCase() === "in-charge") {
          result = "In-Charge";
        } else if (lowerWords.includes(clean.toLowerCase())) {
          result = clean.toLowerCase();
        } else {
          result =
            clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
        }

        return hasComma ? result + "," : result;
      })
      .join(" ");
  };

  /* ── To Block: only "The" on first part, rest joined normally ── */
  const getToBlock = (name) => {
    const parts = name.split(",");
    const firstPart = toTitleCase(parts[0]);
    const restParts = parts
      .slice(1)
      .map((p) => toTitleCase(p))
      .join(", ");

    return (
      <>
        <span>To,</span>
        <br />
        <span>
          <strong>The {firstPart},</strong>
        </span>
        <br />
        <span>{restParts}</span>
      </>
    );
  };

  const getCopyBlock = (name) => {
    const parts = name.split(",");
    return parts.map((part, i) => (
      <span key={i}>
        {toTitleCase(part)}
        {i < parts.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Permission Letter</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Times New Roman', Times, serif;
            padding: 20px 40px;
            color: #000;
            background: #fff;
          }
          .letter-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 15mm 20mm;
          }
          .header-section {
            text-align: center;
            border-bottom: 2.5px solid #000;
            padding-bottom: 10px;
            margin-bottom: 8px;
          }
          .logo-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            margin-bottom: 6px;
          }
          .logo-row img {
            width: 72px;
            height: 72px;
          }
          .gov-title {
            font-size: 17px;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #1a1a1a;
          }
          .office-title {
            font-size: 14.5px;
            font-weight: 700;
            letter-spacing: 0.6px;
            margin-top: 3px;
            text-transform: uppercase;
          }
          .address-block {
            text-align: center;
            font-size: 13px;
            line-height: 1.6;
            color: #222;
            margin-bottom: 14px;
          }
          .address-block .addr-line {
            font-weight: 600;
          }
          .memo-row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin-bottom: 14px;
            font-weight: 600;
          }
          .to-block {
            font-size: 14px;
            margin-bottom: 14px;
            line-height: 1.7;
            min-height: 50px;
          }
          .to-block strong {
            font-weight: 700;
          }
          .subject-block {
            font-size: 14px;
            margin-bottom: 10px;
            line-height: 1.6;
          }
          .subject-block .subj-label {
            font-weight: 700;
            text-decoration: underline;
          }
          .body-block {
            font-size: 14px;
            line-height: 1.8;
            margin-bottom: 12px;
            text-align: justify;
          }
          .time-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            margin-bottom: 14px;
          }
          .time-table td {
            border: 1.5px solid #000;
            padding: 6px 12px;
            font-weight: 600;
          }
          .time-table .label-cell {
            width: 30%;
            background: #f5f5f5;
            text-align: center;
          }
          .worker-grid {
            width: 100%;
            margin-bottom: 14px;
            font-size: 14px;
            font-weight: 600;
          }
          .worker-grid-row {
            display: flex;
            gap: 0;
            margin-bottom: 2px;
          }
          .worker-grid-item {
            display: flex;
            align-items: baseline;
            gap: 6px;
            flex: 1;
            padding: 5px 4px 5px 0;
          }
          .worker-grid-item:first-child {
            padding-right: 20px;
          }
          .worker-grid-num {
            font-weight: 700;
            white-space: nowrap;
            min-width: 22px;
          }
          .worker-grid-line {
            flex: 1;
            border-bottom: 1px solid #000;
            min-height: 1.2em;
          }
          .worker-grid-text {
            flex: 1;
            padding-bottom: 1px;
          }
          .copy-section {
            margin-top: 10px;
            font-size: 14px;
            line-height: 1.8;
          }
          .copy-section .copy-label {
            font-weight: 700;
            text-decoration: underline;
          }
          .copy-section .copy-item {
            margin-left: 10px;
            margin-top: 2px;
          }
          .signature-block {
            margin-top: 30px;
            text-align: right;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.8;
            padding-right: 20px;
          }
          .sig-space {
            margin-top: 40px;
          }
          @media print {
            body { padding: 0; }
            .letter-page { margin: 0; padding: 10mm 15mm; }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  /* ── Styles ── */
  const pageBg = "#eef1f5";
  const cardBg = "#ffffff";
  const primaryColor = "#1b3a5c";
  const accentColor = "#c0392b";
  const borderColor = "#d5dbe3";
  const inputStyle = {
    width: "100%",
    padding: "9px 13px",
    border: "1.5px solid #c8ced6",
    borderRadius: "7px",
    fontSize: "13px",
    fontFamily: "'Segoe UI', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    background: "#fafbfc",
    color: "#1a1a1a",
  };
  const labelStyle = {
    display: "block",
    fontSize: "12.5px",
    fontWeight: 600,
    color: "#34495e",
    marginBottom: "5px",
    letterSpacing: "0.3px",
  };
  const sectionTitle = {
    fontSize: "13px",
    fontWeight: 700,
    color: primaryColor,
    marginBottom: "10px",
    paddingBottom: "6px",
    borderBottom: `2px solid ${accentColor}`,
    display: "flex",
    alignItems: "center",
    gap: "7px",
  };

  const renderWorkerGrid = () => {
    const filledWorkers = workers.filter((w) => w.trim() !== "");
    const rows = [];
    for (let i = 0; i < TOTAL_WORKER_ROWS; i += 2) {
      rows.push(
        <div
          key={i}
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "1px",
          }}
        >
          {[i, i + 1].map((idx) => {
            if (idx >= TOTAL_WORKER_ROWS) return null;
            const name = filledWorkers[idx]?.trim() || "";
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  flex: 1,
                  padding: "5px 4px 5px 0",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    minWidth: "22px",
                  }}
                >
                  {idx + 1})
                </span>
                {name ? (
                  <span style={{ flex: 1, paddingBottom: "1px" }}>{name}</span>
                ) : (
                  <span
                    style={{
                      flex: 1,
                      borderBottom: "1px solid #000",
                      height: "1.2em",
                      display: "inline-block",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>,
      );
    }
    return rows;
  };

  const renderLetter = () => (
    <div
      className="letter-page"
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        color: "#000",
        padding: "10px 0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "2.5px solid #000",
          paddingBottom: "9px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Image src={letterLogo} alt="Emblem" width={58} height={58} />
          <div
            style={{
              fontSize: "14.5px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            Government of West Bengal
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Office of the Assistant Engineer
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "11px",
              lineHeight: "1.65",
              color: "#222",
              marginBottom: "12px",
            }}
          >
            <div style={{ fontWeight: 600 }}>Nabanna IT Sub-Division, PWD</div>
            <div style={{ fontWeight: 600 }}>
              Nabanna, 325 Sarat Chatterjee Road, Howrah - 711102
            </div>
            <div style={{ fontWeight: 600 }}>
              Phone: 033-2252-5282 &nbsp;|&nbsp; Email: ae2itpwd@gmail.com
            </div>
          </div>
        </div>
      </div>

      {/* Memo & Date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          marginTop: 12,
          marginBottom: "12px",
          fontWeight: 600,
        }}
      >
        <span>PWD/Nabanna-IT/25-26/No: {memoNo || "________"}</span>
        <span>Date: {letterDate || "________"}</span>
      </div>

      {/* To Block */}
      <div
        style={{
          fontSize: "12px",
          marginBottom: "20px",
          lineHeight: "1.4",
          minHeight: "45px",
        }}
      >
        {toAddress ? getToBlock(toAddress) : "To,\n________"}
        <br />
        <span style={{ fontWeight: 600 }}>Nabanna, Howrah - 711102</span>
      </div>

      {/* Subject */}
      <div style={{ fontSize: "12px", marginBottom: "8px", lineHeight: "1.6" }}>
        <span style={{ fontWeight: 700, textDecoration: "underline" }}>
          Subject:
        </span>{" "}
        <span style={{ fontWeight: 600 }}>{subject || "________"}</span>
      </div>

      {/* Divider */}
      <div
        style={{
          border: "none",
          borderTop: "0.5px solid #999",
          margin: "8px 0",
        }}
      />

      {/* Body */}
      <div
        style={{
          fontSize: "12px",
          lineHeight: "1.85",
          marginBottom: "10px",
          textAlign: "justify",
          whiteSpace: "pre-line",
        }}
      >
        <strong>Sir/Madam,</strong>
        <br />
        {letterBody || "________"}
      </div>

      {/* Time Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
          marginBottom: "12px",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                border: "1.5px solid #000",
                padding: "5px 10px",
                fontWeight: 700,
                width: "30%",
                textAlign: "center",
                background: "#f5f5f5",
              }}
            >
              Time
            </td>
            <td
              style={{
                border: "1.5px solid #000",
                padding: "5px 10px",
                fontWeight: 600,
              }}
            >
              From: {startTime || "________"} &nbsp; To: {endTime || "________"}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1.5px solid #000",
                padding: "5px 10px",
                fontWeight: 700,
                textAlign: "center",
                background: "#f5f5f5",
              }}
            >
              Date
            </td>
            <td
              style={{
                border: "1.5px solid #000",
                padding: "5px 10px",
                fontWeight: 600,
              }}
            >
              From: {startDate || "________"} &nbsp; To:{" "}
              {finishDate || "________"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Worker Names — two-column grid with underlines */}
      <div
        style={{
          fontSize: "12px",
          marginBottom: "5px",
          fontWeight: 700,
        }}
      >
        Name of the Persons:
      </div>
      <div style={{ marginBottom: "12px" }}>{renderWorkerGrid()}</div>

      {/* Closing */}
      <div style={{ fontSize: "12px", lineHeight: "1.8", marginBottom: "6px" }}>
        It is therefore requested to kindly allow the above mentioned persons
        with their tools &amp; equipments to enter into Nabanna premises for
        execution of the above mentioned work.
      </div>
      <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>
        Thanking you,
      </div>
      <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
        Yours faithfully,
      </div>

      {/* Signature */}
      <div
        style={{
          marginTop: "35px",
          textAlign: "right",
          paddingRight: "18px",
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: "1.8",
        }}
      >
        <div>(Sd/-)</div>
        <div style={{ marginTop: "38px" }}>({authName})</div>
        <div>{authRank}</div>
        <div>Nabanna IT Sub-Division, PWD</div>
        <div>Howrah - 711102</div>
      </div>

      {/* Copy Forward */}
      {copyForward.length > 0 && (
        <div style={{ marginTop: "20px", fontSize: "12px", lineHeight: "1.8" }}>
          <div
            style={{
              fontWeight: 700,
              textDecoration: "underline",
              marginBottom: "4px",
            }}
          >
            Copy forwarded to:
          </div>
          {copyForward.map((item, i) => (
            <div key={i} style={{ marginLeft: "10px", marginTop: "2px" }}>
              {i + 1}) {getCopyBlock(item)}
            </div>
          ))}
          <div
            style={{ marginLeft: "10px", marginTop: "4px", fontWeight: 700 }}
          >
            (Sd/- {authRank})
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: pageBg,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #245a8a 100%)`,
          borderRadius: "12px",
          padding: "16px 28px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 20px rgba(27,58,92,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Image src={letterLogo} alt="Emblem" height={46} width={46} />
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              Office Permission Letter
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Assistant Engineer, Nabanna IT Sub-Division, PWD
            </div>
          </div>
        </div>
        <button
          onClick={handlePrint}
          style={{
            background: accentColor,
            color: "#fff",
            border: "none",
            padding: "10px 26px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 3px 12px rgba(192,57,43,0.4)",
            transition: "all 0.2s",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 5px 18px rgba(192,57,43,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 3px 12px rgba(192,57,43,0.4)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print Letter
        </button>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Input Form ── */}
        <div
          style={{
            background: cardBg,
            borderRadius: "12px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            overflow: "hidden",
            position: "sticky",
            top: "20px",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, #f8f9fb 0%, #eef1f5 100%)`,
              padding: "14px 20px",
              borderBottom: `1.5px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span
              style={{ fontSize: "14px", fontWeight: 700, color: primaryColor }}
            >
              Fill Details
            </span>
          </div>

          <div
            style={{
              padding: "18px 20px",
              maxHeight: "calc(100vh - 160px)",
              overflowY: "auto",
            }}
          >
            {/* Memo No & Date */}
            <div style={{ ...sectionTitle }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Reference Information
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>Memo No</label>
                <input
                  style={inputStyle}
                  placeholder="Enter Memo No"
                  value={memoNo}
                  onChange={(e) => setMemoNo(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Letter Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={letterDate}
                  onChange={(e) => setLetterDate(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* To Address */}
            <div style={{ ...sectionTitle }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Addressee
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>To (Select)</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(27,58,92,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#c8ced6";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {toOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div style={{ ...sectionTitle }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Subject &amp; Body
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>Subject</label>
              <input
                style={inputStyle}
                placeholder="Enter Subject Line"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#c8ced6";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Letter Body</label>
              <textarea
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "80px",
                  lineHeight: "1.6",
                }}
                placeholder="Enter the body text of the letter..."
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#c8ced6";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Time & Date */}
            <div style={{ ...sectionTitle }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Schedule
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <div>
                <label style={labelStyle}>Start Time</label>
                <input
                  type="time"
                  style={inputStyle}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>End Time</label>
                <input
                  type="time"
                  style={inputStyle}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Finish Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={finishDate}
                  onChange={(e) => setFinishDate(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(27,58,92,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Workers */}
            <div style={{ ...sectionTitle }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Worker Names
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#7f8c8d",
                }}
              >
                {workers.filter((w) => w.trim()).length}/{TOTAL_WORKER_ROWS}{" "}
                typed
              </span>
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "#7f8c8d",
                marginBottom: "10px",
                fontStyle: "italic",
                lineHeight: "1.5",
              }}
            >
              Type known names below. The letter always shows {TOTAL_WORKER_ROWS}{" "}
              slots (2 per row) — empty slots will have blank lines for manual
              writing after printing.
            </div>
            <div style={{ marginBottom: "16px" }}>
              {workers.map((worker, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      minWidth: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      background: primaryColor,
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder={`Name of Person ${index + 1} (optional)`}
                    value={worker}
                    onChange={(e) => updateWorker(index, e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = primaryColor;
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(27,58,92,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#c8ced6";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {workers.length > 1 && (
                    <button
                      onClick={() => removeWorker(index)}
                      style={{
                        minWidth: "32px",
                        height: "36px",
                        border: "1.5px solid #e74c3c",
                        background: "#fff",
                        borderRadius: "7px",
                        color: "#e74c3c",
                        fontSize: "16px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e74c3c";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#e74c3c";
                      }}
                      title="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {workers.length < TOTAL_WORKER_ROWS && (
                <button
                  onClick={addWorker}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px dashed #c8ced6",
                    background: "transparent",
                    borderRadius: "8px",
                    color: "#7f8c8d",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.color = primaryColor;
                    e.currentTarget.style.background = "rgba(27,58,92,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#c8ced6";
                    e.currentTarget.style.color = "#7f8c8d";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Person
                </button>
              )}
            </div>

            {/* Copy Forward */}
            <div style={{ ...sectionTitle }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Copy Forward To
            </div>
            <div style={{ marginBottom: "10px" }}>
              {copyOptions.map((option, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "8px 11px",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: copyForward.includes(option) ? primaryColor : "#555",
                    background: copyForward.includes(option)
                      ? "rgba(27,58,92,0.06)"
                      : "transparent",
                    transition: "all 0.15s",
                    marginBottom: "3px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = copyForward.includes(
                      option,
                    )
                      ? "rgba(27,58,92,0.1)"
                      : "#f5f6f8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = copyForward.includes(
                      option,
                    )
                      ? "rgba(27,58,92,0.06)"
                      : "transparent";
                  }}
                >
                  <input
                    type="checkbox"
                    checked={copyForward.includes(option)}
                    onChange={() => toggleCopy(option)}
                    style={{
                      width: "16px",
                      height: "16px",
                      accentColor: primaryColor,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Letter Preview ── */}
        <div
          style={{
            background: cardBg,
            borderRadius: "12px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, #f8f9fb 0%, #eef1f5 100%)`,
              padding: "14px 20px",
              borderBottom: `1.5px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span
              style={{ fontSize: "14px", fontWeight: 700, color: primaryColor }}
            >
              Live Preview
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: "11px",
                fontWeight: 600,
                color: "#27ae60",
                background: "rgba(39,174,96,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#27ae60",
                  display: "inline-block",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              Real-time
            </span>
          </div>

          <div
            style={{
              padding: "30px 40px",
              background: "#fff",
              minHeight: "500px",
            }}
          >
            <div ref={printRef}>{renderLetter()}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        div::-webkit-scrollbar { width: 5px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #c8ced6; border-radius: 10px; }
        div::-webkit-scrollbar-thumb:hover { background: #a0a8b4; }
      `}</style>
    </div>
  );
};

export default PermissionNew;