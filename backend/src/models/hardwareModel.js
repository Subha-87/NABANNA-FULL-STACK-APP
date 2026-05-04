const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    make: { type: String },
    //serial: { type: [String], required: true },
     // 🔥 Mixed support
    serial: {
      type: mongoose.Schema.Types.Mixed, // allows string OR array
      required: true,
    },
  },
  { _id: false },
);

const hardwareSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      trim: true,
    },
    employeeName: {
      type: String,
      trim: true,
      default:"-"

    },
    designation: {
      type: String,
      trim: true,
      default:"-"
     
    },
    roomNo: {
      type: String,
      trim: true,
      default: "-",

    },
    floor: {
      type: String,
      trim: true,
    },
    office: {
      type: String,
      trim: true,
    },

    // AMC tracking
    amcStatus: {
      type: String,
      enum: ["NONE", "REQUIRED", "ON"],
      default: "NONE",
    },
    // System health
    systemCondition: {
      type: String,
      enum: ["GOOD", "AVERAGE", "BAD"],
      default: "GOOD",
    },

    // 🔑 NEW FIELD
    warrantyType: {
      type: String,
      enum: ["WARRANTY", "AMC"],
      default: "WARRANTY",
      required: true,
    },
    installationDate: {
      type: Date,
      required: function () {
        return this.warrantyType === "WARRANTY";
      },
    },
    supplier: {
      type: String,
      default: "-",
    },
    warrantyPeriodYears: {
      type: Number,
      default: 3,
    },
    systems: {
      CPU: deviceSchema,
      MONITOR: deviceSchema,
      PRINTER: deviceSchema,
      UPS: deviceSchema,
      SCANNER: deviceSchema,
      LAPTOP: deviceSchema,
    },

    // Manual remarks
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* 🧮 Remaining Warranty(virtual field) Calculation */

hardwareSchema.virtual("remainingWarranty").get(function () {
  // AMC already ON
  /*if (this.amcStatus === "ON") {
    return "AMC ON";
  }
  // 🔴 AMC machines
  if (this.warrantyType === "AMC") {
    return "AMC ON";
  }*/
  if (!this.installationDate) return "Expired"; // case 1: here user entered old machine where date is null //

  const today = new Date();
  const endDate = new Date(this.installationDate);
  endDate.setFullYear(endDate.getFullYear() + this.warrantyPeriodYears);

  // Warranty expired
  if (endDate <= today) return "Expired"; //case 2: warrany auto expired after 3 year //

  const diff = endDate - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  return `${years}y ${months}m`; // case 3 : if warranty validation<3 years ,show remaining time //
});

const nabannaSystem = mongoose.model("Hardware", hardwareSchema);

module.exports = nabannaSystem;
