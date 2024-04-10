const mongoose = require("mongoose");

const UserSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    token: {
      type: String,
    },
    is_verified: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true} // When We insert or update the data then it will show the Date & Time
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
