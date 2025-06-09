const {
  selectAllPosts,
  selectPostsByAuthorId,
  createPost,
  getPostById,
  getPostByTitle
} = require("../../controllers/posts.controller");

const router = require("express").Router();

router.get("/", selectAllPosts);
router.get("/:postId", getPostById);
router.get("/titulo/:titulo", getPostByTitle);
router.get("/autor/:autorId", selectPostsByAuthorId);
router.post("/", createPost);

module.exports = router;
