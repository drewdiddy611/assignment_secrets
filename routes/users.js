var express = require("express");
var router = express.Router();
const { User, Secret } = require("../models");
const { loggedInOnly, createSignedSessionId } = require("../services/Session");

/* GET users listing. */
router.get("/", loggedInOnly, async function(req, res, next) {
  let users = await User.find();
  console.log(users);
  res.render("users/index", { users: users });
});
router.get("/:id", loggedInOnly, async function(req, res, next) {
  let user = await User.findById(req.user._id);

  res.render("users/show", { secrets: user.secrets });
});

module.exports = router;
