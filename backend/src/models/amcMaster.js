const { Schema, model } = require("mongoose");

const amcMasterSchema = new Schema(
  {
    contractName: {
      type: String,
      default: "Nabanna Hardware AMC",
    },
    workOrderNo: String,
    agencyName: {
      type: String,
      default: "",
    },
    contractNo: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    durationYears: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED"],
      default: "ACTIVE",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

amcMasterSchema.virtual("endDate").get(function () {
  const end = new Date(this.startDate);
  end.setFullYear(end.getFullYear() + this.durationYears);
  end.setDate(end.getDate() - 1); // 1 year - 1 day

  return end;
});

const amcModel = model("AmcMaster", amcMasterSchema);

module.exports = amcModel;
