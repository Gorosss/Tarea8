const router = require("express").Router();

router.use("/authors", require("./api/authors.routes"));
router.use("/posts", require("./api/posts.routes"));

module.exports = router;
