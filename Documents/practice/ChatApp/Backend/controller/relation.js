const ChatRelation = require("../model/ChatRelation");
const message = require("../model/message");

const addRelation = async (req, res) => {
  const { sender, receiver } = req.body;

  let oldRelation = await ChatRelation.find({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender },
    ],
  });

  if (oldRelation.length <= 0 && sender) {
    const relation = new ChatRelation({
      sender,
      receiver,
    });
    relation.save();
    return res.status(200).json({ message: "relation added" });
  } else {
    return res.json({ message: "already established" });
  }
};

module.exports = { addRelation };
