const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    default: "",
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", userSchema);
