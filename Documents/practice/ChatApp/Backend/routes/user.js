const express = require("express");
const {
  login,
  getAllUsers,
  updateState,
  register,
} = require("../controller/userController");
const { addRelation } = require("../controller/relation");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/all-users", getAllUsers);

router.post("/add-relation", addRelation);

module.exports = router;
