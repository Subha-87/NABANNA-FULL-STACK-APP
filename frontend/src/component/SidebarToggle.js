"use client";

export default function SidebarToggle() {
  const toggleSidebar = () => {
    document.body.classList.toggle("collapsed");
  };

  return (
    <button
      onClick={toggleSidebar}
      style={{
        fontSize: "20px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "white",
      }}
    >
      ☰
    </button>
  );
}
