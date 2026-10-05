const meetingCollection = require("../models/meetingModel");
const { sendSuccess, sendError } = require("../utils/apiResponse");

const postMeetingData = async (req, resp) => {
  try {
    const {
      meetingDate,
      programmeName,
      organiser,
      venue,
      meetingTime,
      agency,
      itemDetails,
      remarks,
    } = req.body;
    const letterData = req.file;

    const payload = {
      meetingDate,
      programmeName,
      organiser,
      venue,
      meetingTime,
      agency,
      itemDetails: itemDetails ? JSON.parse(itemDetails) : {},
      remarks,
      letter: letterData
        ? {
            filename: letterData.filename,
            originalName: letterData.originalName,
            mimeType: letterData.mimetype,
            path: letterData.path,
            size: letterData.size,
          }
        : undefined,
    };
    console.log(payload);
    const result = await meetingCollection.create(payload);
    return sendSuccess(
      resp,
      201,
      "Meeting Information Submit Successfully",
      result,
    );
  } catch (error) {
    console.error(error.message);
    return sendError(resp, 500, "Internal Server Error");
  }
};

const getMeetingData = async (req, resp) => {
  try {
    const meetings = await meetingCollection
      .find()
      .sort({ meetingDate: -1, createdAt: -1 });
    //console.log(meetings);

    if (meetings.length == 0)
      return sendError(resp, 404, "No Meeting Details Found");

    return sendSuccess(
      resp,
      200,
      "Meeting data fetched successfully",
      meetings,
    );
  } catch (error) {
    console.error(error);
    return sendError(resp, 500, "Internal Server Error");
  }
};

const editMeeting = async (req, resp) => {
    console.log(req.body)
  try {
    const { edit_id } = req.params;
    
    let itemDetails = req.body.itemDetails || {};

    if (typeof itemDetails === "string") {
      itemDetails = JSON.parse(itemDetails);
    }
    const updateData = {
      meetingDate: req.body.meetingDate,
      programmeName: req.body.programmeName,
      venue: req.body.venue,
      meetingTime: req.body.meetingTime,
      organiser: req.body.organiser,
      agency: req.body.agency,
      remarks: req.body.remarks,
      itemDetails,
    };

    // Only replace letter if a new file was uploaded
    if (req.file) {
      updateData.letter = {
        filename: req.file.filename,
        mimeType: req.file.mimetype,
        path: req.file.path,
        size: req.file.size,
      };
    }

    const editResult = await meetingCollection.findByIdAndUpdate(
      edit_id,
      updateData,
      { new: true, runValidators: true },
    );
    console.log(editResult);
    if (!editResult) return sendError(resp, 404, "Update Error");
    return sendSuccess(resp, 200, "Update Successfull");
  } catch (error) {
    console.error(error);
    return sendError(resp, 500, "Internal Server Error", error.message);
  }
};

const deleteMeeting = async (req, resp) => {
  try {
    const { del_id } = req.params;
    const result = await meetingCollection.findByIdAndDelete(del_id);
    if (!result) return sendError(resp, 404, "Cant Deleted");
    return sendSuccess(resp, 200, " Deleted Successfully");
  } catch (error) {
    console.error(error);
    return sendError(resp, 500, "Internal Server Error", error.message);
  }
};

module.exports = {
  postMeetingData,
  getMeetingData,
  editMeeting,
  deleteMeeting,
};
