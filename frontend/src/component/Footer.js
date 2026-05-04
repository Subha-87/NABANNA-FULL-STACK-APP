"use client"


export default function COMPONENT_FOOTER() {
  return (
    <div className="footerContainer">
      
      <div className="footerContent">
        <span>© {new Date().getFullYear()} PWD IT Portal</span>
        <span className="footerDivider">|</span>
        <span>
          Designed & Developed by <strong>Subhajit</strong>
        </span>
      </div>

    </div>
  );
}