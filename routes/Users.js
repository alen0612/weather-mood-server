const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Users db Went Wrong!" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await Users.findOne({
    where: { username: username },
  });

  if (checkUser) {
    res.status(401);
    res.json({ error: "Username has already been created!" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("SUCCESS");
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  // if (username === null || password === null) {
  //   res.json({ error: "Username and Password can not be empty!" });
  // } else {
  //   const user = await Users.findOne({ where: { username: username } });

  //   // user not exist
  //   if (!user) {
  //     res.json({ error: "User Doesn't Exist!" });
  //   }

  //   // compare hash value
  //   bcrypt.compare(password, user.password).then(async (match) => {
  //     if (!match) {
  //       res.json({ error: "Wrong Username and Password!" });
  //     }

  //     const accessToken = sign(
  //       { username: user.username, id: user.id },
  //       "importantsecret"
  //     );

  //     res.json([user.username, accessToken]);
  //   });
  // }

  const user = await Users.findOne({ where: { username: username } });

  // user not exist
  if (!user) {
    res.json({ error: "User Doesn't Exist!" });
  } else {
    // compare hash value
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        res.json({ error: "Wrong Username and Password!" });
      }

      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );

      res.json([user.username, accessToken]);
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
