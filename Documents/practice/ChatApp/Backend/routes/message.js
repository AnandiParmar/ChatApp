const express = require("express");
const { addMessage, getAllMessages } = require("../controller/message");

const router = express.Router();

router.post("/add-message", addMessage);

router.get("/get-messages", getAllMessages);
module.exports = router;
