const mongoose = require("mongoose");
const { Schema } = mongoose;
const overtimeSchema = new Schema(

  {
    overtimecode: { type: Number, required: true },
    description: { type: String, required: true },
  },
);

module.exports = mongoose.model("overtime", overtimeSchema);