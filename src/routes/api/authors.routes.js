const {
  getAllAutores,
  getAutorById,
  createAutor,
} = require("../../controllers/authors.controller");

// peticiones de /api/autores
const router = require("express").Router();

router.get("/", getAllAutores);
router.get("/:autorId", getAutorById);
router.post("/", createAutor);

module.exports = router;
