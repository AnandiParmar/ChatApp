const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: Array,
  },
  relationId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Messages", messageSchema);
