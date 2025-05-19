const Messages = require("../model/message");
const ChatRelation = require("../model/ChatRelation");

const getAllMessages = async (req, res) => {
  try {
    const receiver = req.query.rec;
    const senderid = req.query.send;

    if (!receiver || !senderid) {
      return res.status(400).json({ error: "Missing sender or receiver" });
    }

    const relation = await ChatRelation.findOne({
      $or: [
        { sender: senderid, receiver: receiver },
        { sender: receiver, receiver: senderid },
      ],
    });

    if (!relation) {
      return res.status(200).json([]); // No chat relation yet
    }

    const messagesDoc = await Messages.findOne({ relationId: relation._id });

    return res.status(200).json(messagesDoc?.message || []);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addMessage = async (msgObj) => {
  console.log(msgObj);
  const { message, senderID, receiverID } = msgObj;
  const data = await ChatRelation.findOne({
    $or: [
      { sender: senderID, receiver: receiverID },
      { sender: receiverID, receiver: senderID },
    ],
  });

  await Messages.findOneAndUpdate(
    { relationId: data?._id },
    { $push: { message: message } },
    { upsert: true }
  );

  // return res
  //   .status(200)
  //   .json({ relationId: data._id, message: "message added" });
};

module.exports = { getAllMessages, addMessage };
