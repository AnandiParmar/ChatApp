const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({
    id: user._id,
    user: user.username,
    accessToken,
    message: "Login Succesfully",
  });
};

const register = async (req, res) => {
  const { email, username, password } = req.body;

  const user = new User({
    email: email,
    username: username,
    password: password,
  });

  user.save();

  res.status(200).json({ message: "data added succesfully" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const updateState = async (obj) => {
  console.log(obj);
  await User.findByIdAndUpdate(obj.id, { isLogin: obj.isLogin });
};
module.exports = { login, getAllUsers, updateState, register };
