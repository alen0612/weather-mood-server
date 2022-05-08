const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Posts db Went Wrong!" });
  }
});

router.get("/postTest", async (req, res) => {
  try {
    res.send("Test post api.");
  } catch (err) {
    console.log(err);
    res.send({ message: "Posts test failed!" });
  }
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  console.log(req.body);

  const username = req.user.username;
  post.username = username;
  //post.mood = req.body.mood;

  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED!");
});

module.exports = router;
