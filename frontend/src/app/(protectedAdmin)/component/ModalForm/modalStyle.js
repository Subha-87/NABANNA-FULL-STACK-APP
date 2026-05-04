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
