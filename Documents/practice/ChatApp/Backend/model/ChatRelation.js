const mongoose = require("mongoose");

const ChatRelation = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chatrelations", ChatRelation);
