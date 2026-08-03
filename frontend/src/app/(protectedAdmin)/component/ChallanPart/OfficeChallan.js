import { useState, useRef } from "react";
import { useAuth } from "@/app/Hook/useAuth";
import OfficeLogo from "../../../../../public/LogoImage/ashok-stambh-logo.png";
import Image from "next/image";

const ITEM_LIST = [
  "Desktop",
  "WorkStation",
  "Computer",
  "All-In-One",
  "Laptop",

  "UPS",
  "RAM",
  "CPU",
  "Pendrive",
  "SSD",
  "HDD",
  "8 port Switch",
  "Wi-FI Router",
  "Speaker",
  "Headphone",
  "Webcam",
  "Switcher",
  "HDMI Cable",
  "Media Converter",
  "Graphics Card",
  "Antivirus",
  "MS Office",
];

const OfficeChallan = () => {
  const [challanNo, setChallanNo] = useState("");
  const [challanDate, setChallanDate] = useState("");
  const [toName, setToName] = useState("");
  const [department, setDepartment] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [suppliedFrom, setSuppliedFrom] = useState("Nabanna IT-SubDivision");

  const [items, setItems] = useState([
    {
      id: Date.now(),
      itemName: "",
      customItem: "",
      make: "",
      model: "",
      serialNo: "",
      quantity: 1,
    },
  ]);

  const printRef = useRef(null);
  const { authName, authRank } = useAuth();

  /* ── Format date to DD.MM.YYYY ── */
  const formatChallanDate = (dateStr) => {
    if (!dateStr) return "________";
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  /* ── Item CRUD ── */
  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        itemName: "",
        customItem: "",
        make: "",
        model: "",
        serialNo: "",
        quantity: 1,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (field === "itemName") {
            return { ...item, itemName: value, customItem: "" };
          }
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  const getDisplayItemName = (item) => {
    if (item.itemName === "__custom__") {
      return item.customItem || "________";
    }
    return item.itemName || "________";
  };

  /* ── Print ── */
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Office Challan</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Times New Roman', Times, serif;
            padding: 15px 30px;
            color: #000;
            background: #fff;
          }
          .challan-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 12mm 18mm;
          }
          .challan-header {
            text-align: center;
            border-bottom: 2.5px solid #000;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .challan-header img {
            width: 68px;
            height: 68px;
          }
          .challan-header .gov-title {
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #1a1a1a;
            margin-top: 4px;
          }
          .challan-header .office-title {
            font-size: 13.5px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 2px;
          }
          .challan-header .addr-block {
            font-size: 12px;
            line-height: 1.6;
            color: #222;
            margin-top: 4px;
          }
          .challan-header .addr-block div {
            font-weight: 600;
          }
          .challan-title-text {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            text-decoration: underline;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 14px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px 30px;
            font-size: 13px;
            margin-bottom: 14px;
            line-height: 1.7;
          }
          .info-grid .info-label {
            font-weight: 700;
          }
          .info-grid .info-value {
            font-weight: 600;
          }
          .info-full {
            font-size: 13px;
            margin-bottom: 6px;
            line-height: 1.7;
          }
          .info-full .info-label {
            font-weight: 700;
          }
          .info-full .info-value {
            font-weight: 600;
          }
          .item-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-bottom: 14px;
          }
          .item-table th {
            border: 1.5px solid #000;
            padding: 6px 8px;
            background: #e8e8e8;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            font-size: 11.5px;
            letter-spacing: 0.5px;
          }
          .item-table td {
            border: 1.5px solid #000;
            padding: 5px 8px;
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
          }
          .item-table td.desc-cell {
            text-align: left;
          }
          .footer-note {
            font-size: 12.5px;
            font-weight: 600;
            line-height: 1.7;
            margin-bottom: 10px;
            text-align: justify;
          }
          .footer-note strong {
            font-weight: 700;
          }
          .return-note {
            font-size: 12px;
            font-weight: 700;
            font-style: italic;
            margin-top: 6px;
            text-align: center;
            text-decoration: underline;
          }
          .signature-section {
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 600;
            line-height: 1.7;
          }
          .sig-left .sig-space {
            margin-top: 45px;
          }
          .sig-right {
            text-align: right;
          }
          .sig-right .sig-space {
            margin-top: 45px;
          }
          @media print {
            body { padding: 0; }
            .challan-page { margin: 0; padding: 10mm 15mm; }
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

  const focusInput = (e) => {
    e.currentTarget.style.borderColor = primaryColor;
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(27,58,92,0.1)";
  };
  const blurInput = (e) => {
    e.currentTarget.style.borderColor = "#c8ced6";
    e.currentTarget.style.boxShadow = "none";
  };

  /* ── Render Challan Letter ── */
  const renderChallan = () => (
    <div
      className="challan-page"
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
          paddingBottom: "10px",
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={OfficeLogo} alt="Emblem" width={68} height={68} />
        <div
          style={{
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#1a1a1a",
            marginTop: "4px",
          }}
        >
          Government of West Bengal
        </div>
        <div
          style={{
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            marginTop: "2px",
          }}
        >
          Office of the Assistant Engineer
        </div>
        <div
          style={{
            fontSize: "11px",
            lineHeight: "1.6",
            color: "#222",
            marginTop: "4px",
            textAlign: "center",
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

      {/* CHALLAN Title */}
      <div
        style={{
          textAlign: "center",
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "underline",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        Challan
      </div>

      {/* Info Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 30px",
          fontSize: "12px",
          marginBottom: "12px",
          lineHeight: "1.7",
        }}
      >
        <div>
          <span style={{ fontWeight: 700 }}>Challan No: </span>
          <span style={{ fontWeight: 600 }}>{challanNo || "________"}</span>
        </div>
        <div>
          <span style={{ fontWeight: 700 }}>Date: </span>
          <span style={{ fontWeight: 600 }}>
            {formatChallanDate(challanDate)}
          </span>
        </div>
      </div>

      <div style={{ fontSize: "12px", marginBottom: "4px", lineHeight: "1.7" }}>
        <span style={{ fontWeight: 700 }}>To: </span>
        <span style={{ fontWeight: 600 }}>{toName || "________"}</span>
      </div>
      <div style={{ fontSize: "12px", marginBottom: "4px", lineHeight: "1.7" }}>
        <span style={{ fontWeight: 700 }}>Department: </span>
        <span style={{ fontWeight: 600 }}>{department || "________"}</span>
      </div>
      <div style={{ fontSize: "12px", marginBottom: "4px", lineHeight: "1.7" }}>
        <span style={{ fontWeight: 700 }}>Contact Person: </span>
        <span style={{ fontWeight: 600 }}>{contactPerson || "________"}</span>
      </div>
      <div
        style={{ fontSize: "12px", marginBottom: "12px", lineHeight: "1.7" }}
      >
        <span style={{ fontWeight: 700 }}>Supplied From: </span>
        <span style={{ fontWeight: 600 }}>{suppliedFrom || "________"}</span>
      </div>

      {/* Item Table — 6 columns now */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
          marginBottom: "14px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1.5px solid #000",
                padding: "6px 6px",
                background: "#e8e8e8",
                fontWeight: 700,
                width: "6%",
                textAlign: "center",
                fontSize: "11px",
                letterSpacing: "0.5px",
              }}
            >
              Sl No
            </th>
            <th
              style={{
                border: "1.5px solid #000",
                padding: "6px 8px",
                background: "#e8e8e8",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Description of Articles
            </th>
            <th
              style={{
                border: "1.5px solid #000",
                padding: "6px 6px",
                background: "#e8e8e8",
                fontWeight: 700,
                width: "14%",
                fontSize: "11px",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Make
            </th>
            <th
              style={{
                border: "1.5px solid #000",
                padding: "6px 6px",
                background: "#e8e8e8",
                fontWeight: 700,
                width: "14%",
                fontSize: "11px",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Model
            </th>
            <th
              style={{
                border: "1.5px solid #000",
                padding: "6px 6px",
                background: "#e8e8e8",
                fontWeight: 700,
                width: "18%",
                fontSize: "11px",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Serial No
            </th>
            <th
              style={{
                border: "1.5px solid #000",
                padding: "6px 6px",
                background: "#e8e8e8",
                fontWeight: 700,
                width: "7%",
                fontSize: "11px",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Qty
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id}>
              <td
                style={{
                  border: "1.5px solid #000",
                  padding: "5px 6px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </td>
              <td
                style={{
                  border: "1.5px solid #000",
                  padding: "5px 8px",
                  fontWeight: 600,
                  textAlign: "left",
                }}
              >
                {getDisplayItemName(item)}
              </td>
              <td
                style={{
                  border: "1.5px solid #000",
                  padding: "5px 6px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.make || "________"}
              </td>
              <td
                style={{
                  border: "1.5px solid #000",
                  padding: "5px 6px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.model || "________"}
              </td>
              <td
                style={{
                  border: "1.5px solid #000",
                  padding: "5px 6px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.serialNo || "________"}
              </td>
              <td
                style={{
                  border: "1.5px solid #000",
                  padding: "5px 6px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer Note */}
      <div
        style={{
          fontSize: "11.5px",
          fontWeight: 600,
          lineHeight: "1.7",
          marginBottom: "10px",
          textAlign: "justify",
        }}
      >
        <strong>Note:</strong> The above materials belong to{" "}
        {suppliedFrom || "Nabanna IT-SubDivision"} and are meant for Government
        use only. <strong>Not for Sale.</strong>
      </div>

      {/* Return Note */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          fontStyle: "italic",
          marginTop: "6px",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        Please sign and stamp the challan and return.
      </div>

      {/* Signature Section */}
      <div
        style={{
          marginTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: "1.7",
        }}
      >
        <div>
          <div>Received By:</div>
          <div style={{ marginTop: "50px" }}>Name:</div>
          <div>Designation:</div>
          <div>Date:</div>
          <div style={{ marginTop: "6px", fontWeight: 700 }}>
            (Signature & Stamp)
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div>(Sd/-)</div>
          <div style={{ marginTop: "45px" }}>({authName})</div>
          <div>{authRank}</div>
          <div>Nabanna IT Sub-Division, PWD</div>
          <div>Howrah - 711102</div>
        </div>
      </div>
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
          <Image src={OfficeLogo} alt="Emblem" height={46} width={46} />
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              Office Challan
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
          Print Challan
        </button>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "440px 1fr",
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span
              style={{ fontSize: "14px", fontWeight: 700, color: primaryColor }}
            >
              Fill Challan Details
            </span>
          </div>

          <div
            style={{
              padding: "18px 20px",
              maxHeight: "calc(100vh - 160px)",
              overflowY: "auto",
            }}
          >
            {/* Challan Info */}
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
              Challan Information
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
                <label style={labelStyle}>Challan No</label>
                <input
                  style={inputStyle}
                  placeholder="Enter Challan No"
                  value={challanNo}
                  onChange={(e) => setChallanNo(e.target.value)}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={challanDate}
                  onChange={(e) => setChallanDate(e.target.value)}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>
            </div>

            {/* Recipient Info */}
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Recipient Details
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>To</label>
              <input
                style={inputStyle}
                placeholder="Whom the Challan is issued for"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>Department</label>
              <input
                style={inputStyle}
                placeholder="Enter Department Name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>Contact Person</label>
              <input
                style={inputStyle}
                placeholder="Enter Contact Person Name"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Supplied From</label>
              <input
                style={inputStyle}
                placeholder="Supplied From"
                value={suppliedFrom}
                onChange={(e) => setSuppliedFrom(e.target.value)}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>

            {/* Items Section */}
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
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Items ({items.length})
            </div>

            {items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  background: "#f8f9fb",
                  border: "1.5px solid #e0e4ea",
                  borderRadius: "10px",
                  padding: "14px",
                  marginBottom: "12px",
                }}
              >
                {/* Item header with remove */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: primaryColor,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        minWidth: "22px",
                        height: "22px",
                        borderRadius: "5px",
                        background: primaryColor,
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {index + 1}
                    </span>
                    Item
                  </span>
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        minWidth: "28px",
                        height: "28px",
                        border: "1.5px solid #e74c3c",
                        background: "#fff",
                        borderRadius: "6px",
                        color: "#e74c3c",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e74c3c";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#e74c3c";
                      }}
                      title="Remove Item"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Item Name Dropdown or Custom */}
                <div style={{ marginBottom: "10px" }}>
                  <label style={labelStyle}>Item Name</label>
                  <select
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      marginBottom: "6px",
                    }}
                    value={item.itemName}
                    onChange={(e) =>
                      updateItem(item.id, "itemName", e.target.value)
                    }
                    onFocus={focusInput}
                    onBlur={blurInput}
                  >
                    <option value="">-- Select Item --</option>
                    {ITEM_LIST.map((itm, i) => (
                      <option key={i} value={itm}>
                        {itm}
                      </option>
                    ))}
                    <option value="__custom__">✏️ Enter Manually...</option>
                  </select>
                  {item.itemName === "__custom__" && (
                    <input
                      style={inputStyle}
                      placeholder="Type item name here..."
                      value={item.customItem}
                      onChange={(e) =>
                        updateItem(item.id, "customItem", e.target.value)
                      }
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  )}
                </div>

                {/* Make & Model — Row 1 */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Make</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. HP, Dell"
                      value={item.make}
                      onChange={(e) =>
                        updateItem(item.id, "make", e.target.value)
                      }
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Model</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. ProDesk 400"
                      value={item.model}
                      onChange={(e) =>
                        updateItem(item.id, "model", e.target.value)
                      }
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </div>
                </div>

                {/* Serial No & Quantity — Row 2 */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 90px",
                    gap: "8px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Serial No</label>
                    <input
                      style={inputStyle}
                      placeholder="Serial No"
                      value={item.serialNo}
                      onChange={(e) =>
                        updateItem(item.id, "serialNo", e.target.value)
                      }
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Qty</label>
                    <select
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        padding: "9px 6px",
                      }}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", Number(e.target.value))
                      }
                      onFocus={focusInput}
                      onBlur={blurInput}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Item Button */}
            <button
              onClick={addItem}
              style={{
                width: "100%",
                padding: "9px",
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
                marginBottom: "16px",
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
              Add Item
            </button>
          </div>
        </div>

        {/* ── RIGHT: Challan Preview ── */}
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
            <div ref={printRef}>{renderChallan()}</div>
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

export default OfficeChallan;
