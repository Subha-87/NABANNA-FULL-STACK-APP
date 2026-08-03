import { useState, useEffect } from "react";
import { Label } from "reactstrap";
import { useAxios } from "@/app/Hook/useAxios";
import "../../TableStyle.css";
import { Table } from "react-bootstrap";
import { handleAxiosError, ErrorDisplay } from "@/app/utils/axiosError";
import { Box, TextField, InputAdornment, Paper } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import {
  AddBoxButton,
  SearchBoxButton,
  ActionBoxBtn,
  ViewBoxStatus,
} from "../../component/Button/BoxButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";

const BoxDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boxData, setBoxData] = useState([]);
  const [searchBoxInfo, setSearchBoxInfo] = useState("");

  const axios = useAxios();
  const getAllBoxDetails = async () => {
    try {
      const response = await axios.get("/nabanna/showAll");
      //console.log(response);
      setBoxData(response.data.data || []);
    } catch (err) {
      const { generalError } = handleAxiosError(err);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllBoxDetails();
  }, []);

  // Optional: Allow pressing "Enter" to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Optionally trigger the search button click programmatically
      document.getElementById("box-search-btn").click();
    }
  };
  return (
    <>
      <div className=" flex justify-content-evenly items-center h-[60px] ">
        <AddBoxButton onSuccess={getAllBoxDetails} />
        <ViewBoxStatus />

        <div>
          <TextField
            size="small"
            sx={{ width: 400, marginRight: 2 }}
            label="Search Box"
            variant="outlined"
            placeholder="User/Floor/Room/Department/BoxID/CardID"
            value={searchBoxInfo}
            onChange={(e) => setSearchBoxInfo(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, backgroundColor: "white" },
            }}
          />
          <SearchBoxButton
            searchData={searchBoxInfo}
            clearData={() => setSearchBoxInfo("")}
          />
        </div>
      </div>
      <div className="overflow-auto grow">
        {loading ? (
          <div className="text-center text-2xl font-bold">Loading...</div>
        ) : error ? (
          <ErrorDisplay err={error} />
        ) : (
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>User</th>
                <th>Rank</th>
                <th>Department</th>
                <th>Floor</th>
                <th>Room</th>
                <th>Company</th>
                <th>Type</th>
                <th>New/Old</th>
                <th>Box ID</th>
                <th>Card ID</th>
                <th>Accessories</th>
                <th>Status</th>
                <th>Condition</th>
                <th>Installation</th>
                <th>Box Present</th>
                <th>Temporary</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {boxData.length > 0 ? (
                boxData.map((box, index) => (
                  <tr key={box._id}>
                    <td>{index + 1}</td>
                    <td><span className=" text-green-700 font-bold">{box.username}</span></td>
                    <td><span className="font-bold text-blue-800">{box.designation}</span></td>
                    <td>{box.department}</td>
                    <td>{box.floor}</td>
                    <td><span className="text-red-700 font-bold">{box.room}</span></td>
                    <td>{box.boxMake}</td>
                    <td>{box.boxType}</td>
                    <td>{box.boxCategory}</td>
                    <td>{box.boxId}</td>
                    <td>{box.cardId}</td>

                    <td>
                      {Array.isArray(box.accessories)
                        ? box.accessories.join(", ")
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          box.boxStatus === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        <span className="status-dot"></span>
                        {box.boxStatus}
                      </span>
                    </td>

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

                    <td style={{ textAlign: "center" }}>
                      {box.boxPresent ? (
                        <Tooltip title="Box Present">
                          <CheckCircleIcon
                            sx={{
                              color: "#2e7d32",
                              fontSize: 28,
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Box Not Present">
                          <CancelIcon
                            sx={{
                              color: "#d32f2f",
                              fontSize: 28,
                            }}
                          />
                        </Tooltip>
                      )}
                    </td>

                    <td>{box.temporaryAllotment ? "Yes" : "No"}</td>

                    <td>{box.remarks || "-"}</td>
                    <td className="w-[35px]">
                      <div className="flex justify-content-center hover:cursor-pointer mb-2">
                        <ActionBoxBtn
                          configData={box}
                          onRefresh={getAllBoxDetails}
                        />
                      </div>
                    </td>
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
        )}
      </div>
    </>
  );
};

export default BoxDetails;
