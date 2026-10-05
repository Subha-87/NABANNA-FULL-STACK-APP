const express = require("express");

const {
  getMeetingData,
  postMeetingData,
  editMeeting,
  deleteMeeting,
} = require("../controller/meetingController");
const { letterUpload } = require("./multer");
const router = express.Router();

router.get("/fetchAll", getMeetingData);
router.post("/register", letterUpload.single("letter"), postMeetingData);
router.put('/update/:edit_id',letterUpload.single("letter"),editMeeting);
router.delete('/delete/:del_id',deleteMeeting)

module.exports = router;
