const {
  selectAllPosts,
  selectPostsByAuthorId,
  createPost,
} = require("../../controllers/posts.controller");

const router = require("express").Router();

router.get("/", selectAllPosts);
router.get("/autor/:autorId", selectPostsByAuthorId);
router.post("/", createPost);

module.exports = router;
