/*import { Button } from "@mui/material"
import { useState } from "react"
import ReAssignModal from "../ModalForm/ReAssignModal";

const ReqReAssignBtn = ({selectedRow, onRefresh}) => {
  const [open, setOpen] = useState(false); 
  return (
    <>
      <Button variant="contained" color="info" onClick={() => setOpen(true)}>Re-Assign</Button>
      <ReAssignModal data={selectedRow} isOpen={open} isClose={() => setOpen(false)}  onRefresh={onRefresh}/>
    </>
  )
}

export default ReqReAssignBtn*/
import { Button } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"; // Import icon
import { useState } from "react";
import ReAssignModal from "../ModalForm/ReAssignModal";

const ReqReAssignBtn = ({ selectedRow, onRefresh }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<SwapHorizIcon sx={{ fontSize: 16 }} />}
        onClick={() => setOpen(true)}
        disableElevation // Removes the default ugly MUI shadow
        sx={{
          textTransform: "none",
          fontWeight: 600,
          fontSize: "13px",
          borderRadius: "8px",
          padding: "6px 16px",
          background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.25)",
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0)" },
        }}
      >
        
      </Button>
      <ReAssignModal
        data={selectedRow}
        isOpen={open}
        isClose={() => setOpen(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ReqReAssignBtn;
