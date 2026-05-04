const hardwareCollection = require("../models/hardwareModel");
const systemRepairCollection = require("../models/repairModel");
const { sendSuccess, sendError } = require("../utils/apiResponse");

// Get All Nabanna System Details in warranty/AMC of User Hardware Set Up //

const getAllData = async (req, resp) => {
  //console.log('getting Request..') for test
  try {
    const result = await hardwareCollection
      .find()
      .sort({ _id: -1, createdAt: -1 }); //combine sorting so records with id still show newest created record first:
    if (!result.length) return sendError(resp, 404, "No hardware data found");
    return sendSuccess(resp, 200, "Data Fetched Successfull", result);
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// POST NEW SYSTEM for NABANNA with warranty/AMC
const createHardwareSetup = async (req, res) => {
  console.log("getting post request..");
  console.log(req.body);
  try {
    const {
      date,
      department,
      floor,
      room,
      username,
      rank,
      office,
      machineDetails,
      supplier,
      warrantyType,
    } = req.body;

    // Convert date string (DD/MM/YYYY) → JS Date
    //const [day, month, year] = date.split("/");
    //const installationDate = new Date(`${year}-${month}-${day}`);
    // 🔁 Convert array → object
    // 🔥 NORMALIZE SERIAL HERE
    machineDetails.forEach((item) => {
      if (item.name === "CPU") {
        // CPU → must be array
        if (!Array.isArray(item.serial)) {
          item.serial = [item.serial];
        }
      } else {
        // Other devices → must be string
        if (Array.isArray(item.serial)) {
          item.serial = item.serial[0];
        }
      }
    });
    const systems = {};

    machineDetails.forEach((item) => {
      const key = item.name.toUpperCase();
      systems[key] = {
        model: item.model,
        make: item.make,
        serial: item.serial,
      };
    });
    // 📅 Handle installation date conditionally
    let installationDate = null;

    let amcStatus = "NONE";
    if (warrantyType === "AMC") {
      amcStatus = "REQUIRED";
    }

    if (warrantyType === "WARRANTY" && date) {
      // If date is DD/MM/YYYY
      if (date.includes("/")) {
        const [day, month, year] = date.split("/");
        installationDate = new Date(`${year}-${month}-${day}`);
      } else {
        // If date is YYYY-MM-DD (HTML date input)
        installationDate = new Date(date);
      }
    }

    const payload = {
      employeeName: username,
      designation: rank,
      office,
      roomNo: room,
      department,
      floor,
      warrantyType,
      amcStatus, // 👈 explicitly set
      installationDate,
      supplier,
      systems,
    };

    const result = await hardwareCollection.create(payload);

    return sendSuccess(res, 201, "System is Entered Successfully", result);
  } catch (error) {
    return sendError(res, 500, "Internal Server Error");
  }
};

// Search Nabanna System Based on User Details //
const searchData = async (req, resp) => {
  //console.log("Requestin..")
  const { search_system } = req.params;
  const filter = {
    $or: [
      { department: { $regex: search_system, $options: "i" } },
      { employeeName: { $regex: search_system, $options: "i" } },
      { designation: { $regex: search_system, $options: "i" } },
      { roomNo: { $regex: search_system, $options: "i" } },
      { floor: { $regex: search_system, $options: "i" } },
      { room: { $regex: search_system, $options: "i" } },
      { office: { $regex: search_system, $options: "i" } },
      { supplier: { $regex: search_system, $options: "i" } },
    ],
  };
  try {
    const searchResult = await hardwareCollection
      .find(filter)
      .sort({ _id: -1 });
    if (!searchResult.length) return sendError(resp, 404, "No Systems Found");
    return sendSuccess(resp, 200, "System Found in Our System", searchResult);
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// UPDATE SYSTEM STATUS for NABANNA //
const editSystemStatus = async (req, resp) => {
  //console.log("requesting ...", req.body);
  try {
    const { edit_id } = req.params;
    const {
      department,
      designation,
      employeeName,
      floor,
      office,
      roomNo,
      amcStatus,
      systemCondition,
      remarks,
    } = req.body;
    const result = await hardwareCollection.findByIdAndUpdate(
      edit_id,
      {
        department,
        designation,
        employeeName,
        floor,
        office,
        roomNo,
        amcStatus,
        systemCondition,
        remarks,
      },
      { new: true },
    );
    if (!result) return sendError(resp, 404, "Cant Update");
    return sendSuccess(resp, 200, "Update Successful");
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// DELETE SYSTEM FROM ENTIRE HARDWARE DATABASE//
const deleteHardwareSystem = async (req, resp) => {
  try {
    const { del_id } = req.params;
    const result = await hardwareCollection.findByIdAndDelete(del_id);
    if (!result) return sendError(resp, 404, "Nothing to Delete");
    return sendSuccess(resp, 200, "System Deleted Successfully");
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// EXPORT AMC LISTED SYSTEM FOR EXCEL PRINT //
const exportAmcSystems = async (req, resp) => {
  //console.log("requesting...amc")
  try {
    const result = await hardwareCollection
      .find({
        amcStatus: { $in: ["REQUIRED", "ON"] }, // have to get amc excel paper ready before amcStatus :"EXPIRED" //
      })
      .lean(); //->lean() method is a powerful tool for improving performance and memory efficiency in your Node.js applications
    //console.log(result.length);
    if (!result.length) return sendSuccess(resp, 404, "No Data Found");
    return sendSuccess(resp, 200, "Data Fetched Successful", result);
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// ** FIND Single NABANNA SYSTEM BASED ON SERIAL **//
const searchHardware = async (req, res) => {
  try {
    // Get the System (CPU/MONITOR,PRINTER,LAPTOP etc) & respictive value(Serial/Model or Make)
    const { system, value } = req.query;

    if (!system || !value)
      return sendError(res, 400, "System and Search value required");

    const sys = system.toUpperCase();

    const result = await hardwareCollection.findOne({
      $or: [
        { [`systems.${sys}.serial`]: value }, // string match
        { [`systems.${sys}.serial`]: { $elemMatch: { $eq: value } } }, // array match
      ],
      /*$or: [
        //{ [`systems.${sys}.serial`]: { $regex: value, $options: "i" } }, //search serial numbers, using $regex is slower.
        //{ [`systems.${sys}.serial`]: value },
        
        //{ [`systems.${sys}.model`]: { $regex: value, $options: "i" } },
        //{ [`systems.${sys}.make`]: { $regex: value, $options: "i" } },
      ],*/
    });
    //console.log(!!result.length)
    if (!result) return sendError(res, 404, "No Such Machine Found in Nabanna");
    return sendSuccess(res, 200, "System Found", [result]);
  } catch (err) {
    return sendError(res, 500, "Internal Server Error");
  }
};

// POST REPAIR DATA FOR CHARGE SECTION //
const postRepairData = async (req, resp) => {
  //console.log("getting request..");
  try {
    const payload = req.body;
    //console.log(payload);
    const result = await systemRepairCollection.create(payload);
    return sendSuccess(resp, 201, "Saved Successfull", result);
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// GET REPAIR DATA IN CHARGE SECTION //
const getRepairData = async (req, resp) => {
  try {
    const result = await systemRepairCollection.find();
    if (!result.length) return sendError(resp, 404, "No Data Found");
    return sendSuccess(resp, 200, "Data Found", result);
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

// UPDATE REPAIR STATUS IN CHARGE SECTION //
const editRepairData = async (req, resp) => {
  //console.log(req.body);
  try {
    const { r_id } = req.params;
    const { priceValue, remarks, repairDate, repairPart } = req.body;
    const result = await systemRepairCollection.findByIdAndUpdate(
      r_id,
      { priceValue, remarks, repairDate, repairPart },
      { new: true },
    );
    if (!result) return sendError(resp, 404, "Cant Update");
    return sendSuccess(resp, 200, "Update Successful", result);
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};

const removeRepairData = async (req, resp) => {
  try {
    const { d_id } = req.params;
    const result = await systemRepairCollection.findByIdAndDelete(d_id);
    if (!result) return sendError(resp, 404, "Nothing to Delete");
    return sendSuccess(resp, 200, "System Deleted Successfully");
  } catch (error) {
    return sendError(resp, 500, "Internal Server Error");
  }
};
module.exports = {
  getAllData,
  createHardwareSetup,
  searchData,
  editSystemStatus,
  deleteHardwareSystem,
  exportAmcSystems,
  searchHardware,
  postRepairData,
  getRepairData,
  editRepairData,
  removeRepairData,
};
