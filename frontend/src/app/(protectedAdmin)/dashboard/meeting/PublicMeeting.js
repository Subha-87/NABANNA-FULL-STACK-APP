"use client";
import { useState, useEffect } from "react";
import { useAxios } from "@/app/Hook/useAxios";
import { handleAxiosError } from "@/app/utils/axiosError";
import TableContainer from "./TableContainer";
import {
  AddMeetingBtn,
  SearchBtn,
} from "../../component/ActionButton/MeetingButton";
import { Box, Typography } from "@mui/material";
import { WorkspacePremium } from "@mui/icons-material";
import { MilitaryTech } from "@mui/icons-material";

const PublicMeeting = () => {
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axios = useAxios();

  const getMeetingDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/VIP/fetchAll");
      //console.log(response)
      if (response.data.success) {
        setMeetingData(response.data?.data);
      } else {
        throw Error("Something Wrong");
      }
    } catch (error) {
      console.error(error);
      const { generalError } = handleAxiosError(error);
      setError(generalError || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeetingDetails();
  }, []);

  return (
    <div className="flex flex-column flex-1 bg-amber-100 border-1 border-black">
      <Box className="h-[5%] flex flex-col justify-center items-center">
        {/* Icon and Text Row */}
        <Box className="flex items-center gap-2">
          <WorkspacePremium sx={{ color: "#7C3AED", fontSize: 28 }} />{" "}
          {/* Purple for VIP */}
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              letterSpacing: 1.5,
              color: "#1e293b", // Slate 800
            }}
            className="uppercase"
          >
            VIP Meeting Details
          </Typography>
        </Box>

        {/* Decorative Gradient Underline */}
        <Box
          className="mt-1 w-28 h-1 rounded-full"
          sx={{
            background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
          }}
        />
      </Box>
      <div className="h-[10%] flex items-center justify-between px-4">
        {/* If you want them on the left: */}
        <div className="flex items-center gap-4">
          <AddMeetingBtn onSuccess={getMeetingDetails} />
          <SearchBtn />
        </div>

        {/* You can put other header items like Profile/Avatars on the right here */}
      </div>
      <div className="h-[85%] border-2 border-primary">
        <TableContainer
          tableData={meetingData}
          tableError={error}
          isLoading={loading}
          onRefresh = {getMeetingDetails}
        />{" "}
      </div>
    </div>
  );
};

export default PublicMeeting;
