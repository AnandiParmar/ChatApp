const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatDB");
    console.log("Database Connected...");
  } catch (error) {
    console.log("Error in Connection :", error);
  }
};

module.exports = connection;
