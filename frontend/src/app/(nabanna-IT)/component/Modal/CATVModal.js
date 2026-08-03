import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  CircularProgress,
  Grid,
  MenuItem,
} from "@mui/material";
//import { modalStyle } from "./styleModal";
import { BoxAddForm, EditBoxForm } from "../FormikForm/CATVForm";
import { Table } from "react-bootstrap";
import "../../TableStyle.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  minWidth: "650px",
  maxWidth: "90vw",
  maxHeight: "85vh",
  border: "",
  borderRadius: "16px",
  boxShadow:
    "0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
  p: 0,
  bgcolor: "background.paper",
  overflow: "hidden",
  animation: "modalFadeIn 0.3s ease-out",

  // ADD THESE TWO LINES:
  display: "flex",
  flexDirection: "column",
};
export const BoxAddModal = ({ isOpen, isClose, onSuccess }) => {
  const modalStyleBoxAdd = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "75vw",
    maxWidth: 1200,
    minWidth: 850,

    height: "78vh", // IMPORTANT
    maxHeight: "88vh",

    bgcolor: "background.paper",
    borderRadius: 3,

    boxShadow: "0 25px 60px -12px rgba(0,0,0,.25),0 0 0 1px rgba(0,0,0,.05)",

    overflow: "hidden",

    display: "flex",
    flexDirection: "column",
  };
  const handleModal = () => {
    isClose();
  };
  return (
    <Modal open={isOpen} onClose={isClose}>
      <Box sx={modalStyleBoxAdd}>
        <BoxAddForm modStat={handleModal} onSuccess={onSuccess} />
      </Box>
    </Modal>
  );
};

export const BoxEditModal = ({
  isModalOpen,
  isModalClose,
  editData,
  onRefresh,
}) => {
  const handleModal = () => {
    isModalClose();
  };
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <EditBoxForm
          editData={editData}
          refreshData={onRefresh}
          modStat={handleModal}
        />
      </Box>
    </Modal>
  );
};

export const BoxSearchResultModal = ({
  searchResult,

  isModalOpen,
  isModalClose,
}) => {
  return (
    <Modal open={isModalOpen} onClose={isModalClose}>
      <Box sx={modalStyle}>
        <div className="text-xl text-center font-semibold font-sans text-blue-800">
          Search Result :
        </div>
        <SearchTable data={searchResult} />
      </Box>
    </Modal>
  );
};

// Usable Table Component for Render Search Data as Table Format in Modal //
const SearchTable = ({ data }) => {
  return (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>Serial</th>
          <th>User</th>
          <th>Rank</th>
          <th>Department</th>
          <th>Floor</th>
          <th>Room</th>
          <th>Type</th>
          <th>New/Old</th>
          <th>Box ID</th>
          <th>Card ID</th>
          <th>Accessories</th>
          <th>Status</th>
          <th>Condition</th>
          <th>Installation Date</th>
          <th>Box Present</th>
          <th>Temporary</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((box, index) => (
            <tr key={box._id}>
              <td>{index + 1}</td>
              <td>{box.username}</td>
              <td>{box.designation}</td>
              <td>{box.department}</td>
              <td>{box.floor}</td>
              <td>{box.room}</td>
              <td>{box.boxType}</td>
              <td>{box.boxCategory}</td>
              <td>{box.boxId}</td>
              <td>{box.cardId}</td>

              <td>
                {Array.isArray(box.accessories)
                  ? box.accessories.join(", ")
                  : "-"}
              </td>

              <td>{box.boxStatus}</td>

              <td>
                <span
                  className={
                    box.condition === "Good"
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  {box.condition}
                </span>
              </td>

              <td>
                {box.installationDate
                  ? new Date(box.installationDate).toLocaleDateString()
                  : "-"}
              </td>

              <td>{box.boxPresent ? "Yes" : "No"}</td>

              <td>{box.temporaryAllotment ? "Yes" : "No"}</td>

              <td>{box.remarks || "-"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="16" className="text-center">
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
