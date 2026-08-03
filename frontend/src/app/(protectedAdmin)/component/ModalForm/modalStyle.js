/*export const modStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  minWidth: "320px", // prevents very small modal
  maxWidth: "90vw", // prevents overflow on large forms
  //bgcolor: "background.paper",
  bgcolor: "#ffffff",
  borderRadius: "12px",

  boxShadow: "0px 12px 35px rgba(0,0,0,0.18)",
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  //bgcolor: "#A1C2BD",
  maxHeight: "90vh",
  overflowY: "auto",

  outline: "none",
  backdropFilter: "blur(4px)"
};*/

import "./CSS/Form.css"

export const modStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  minWidth: "600px",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
  p: 0, // Removed padding
  overflow: "hidden", // Let child handle scroll
  outline: "none",
  animation: "modalFadeIn 0.3s ease-out",
};

export const modStyleEstimate = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  minWidth: "650px",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
  p: 0,
  overflow: "hidden",
  outline: "none",
  animation: "modalFadeIn 0.3s ease-out",
  display: "flex",
  flexDirection: "column",
};

export const formWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: "85vh",
};

export const headerStyle = {
  background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
  padding: "20px 24px",
  flexShrink: 0,
  position: "sticky",
  top: 0,
  zIndex: 10,
  borderBottom: "3px solid #ffd54f",
};

export const contentStyle = {
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  padding: "24px",
  background: "linear-gradient(180deg, #fff8e1 0%, #ffffff 30%)",
  // Custom scrollbar styles
 /* "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(180deg, #1a237e, #3949ab)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#283593",
  },*/
  className: "modal-scroll-content", // Add this class
};

export const footerStyle = {
  background: "linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 100%)",
  padding: "16px 24px",
  flexShrink: 0,
  position: "sticky",
  bottom: 0,
  borderTop: "1px solid #c5cae9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
};

export const customComplainStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    "&:hover fieldset": {
      borderColor: "#3949ab",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1a237e",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#37474f",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#1a237e",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#d32f2f",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export const customSelectStyle = {
  ...customComplainStyle,
  "& .MuiSelect-select": {
    padding: "10px 14px",
  },
};

export const fileInputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    padding: "8px 14px",
    "&:hover fieldset": {
      borderColor: "#3949ab",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1a237e",
    },
  },
  "& input[type='file']": {
    opacity: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  "& .MuiInputLabel-root": {
    color: "#37474f",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#1a237e",
    },
  },
};
