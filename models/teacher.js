const mongoose = require("mongoose");

const TeacherSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}  // When we insert or update the data then it will show the Date & Time.
);

const TeacherModel = mongoose.model("teacher", TeacherSchema);

module.exports = TeacherModel;
