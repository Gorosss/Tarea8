
const Autores = require("../models/authors.model");

const getAllAutores = async (req, res) => {
  const autores = await Autores.selectAllAuthors();
  res.json(autores);
};

const getAutorById = async (req, res) => {
  const { autorId } = req.params;
  const autor = await Autores.selectAuthorById(autorId);
  if (!autor)
    return res.status(404).json({ message: "El ID del autor no existe" });

  res.json(autor);
};

const createAutor = async (req, res) => {
  const { nombre, email, imagen } = req.body;


  // Verificador campos
  if (!nombre || !email) {
    return res.status(400).json({
      message: "Los campos de nombre y email son obligatorios",
    });
  }

  // Verificador URL de imagen
  if (imagen && !imagen.startsWith("http")) {
    return res.status(400).json({ message: "Formato de URL no válido" });
  }

  // Verificador email inexistente
  const autorExiste = await Autores.selectAuthorByEmail(email);
  if (autorExiste) {
    return res.status(409).json({
      message: "El email ya está registrado, por favor selecciona otro",
    });
  }

  // Resultado
  const result = await Autores.insertAuthor({ nombre, email, imagen });
  const autor = await Autores.selectAuthorById(result.insertId);
  res.json(autor);
};

module.exports = {
  getAllAutores,
  getAutorById,
  createAutor,
};
