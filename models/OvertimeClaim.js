const mongoose = require("mongoose");
const { Schema } = mongoose;

const overtimeClaimSchema = new Schema(
  {
    overtimeClaimsKey: String,
    payrollNumber: Number,
    overtimeCode: Number,
    date: Date,
    hours: Number,
    
    overtime_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OvertimeCode",
    },
    payroll_number: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayrollNumber",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OvertimeClaim", tastingSchema);
