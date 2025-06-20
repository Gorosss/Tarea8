const Posts = require("../models/posts.model");
const Autores = require("../models/authors.model");

const selectAllPosts = async (req, res) => {
  const posts = await Posts.selectAllPosts();
  res.json(posts);
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.getPostById(postId);
  if (!post) {
    return res.status(404).json({ message: "El ID del post no existe" });
  }
  res.json(post);
};

const selectPostsByAuthorId = async (req, res) => {
  const { autorId } = req.params;
  const autor = await Autores.selectAuthorById(autorId);
  if (!autor) {
    return res.status(404).json({ message: "El ID del autor no existe" });
  }

  const posts = await Posts.selectPostsByAuthorId(autorId);
  res.json(posts);
};

const createPost = async (req, res) => {
  const { titulo, descripcion, categoria, autor_id } = req.body;
  const fecha_creacion = new Date().toISOString().slice(0, 19).replace("T", " ");

  if (!titulo || !descripcion || !categoria || !autor_id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const autorExiste = await Autores.selectAuthorById(autor_id);
  if (!autorExiste) {
    return res.status(404).json({ message: "El ID del autor no existe" });
  }

  // Verificador título no repetido
  const postExiste = await Posts.checkPostTitleExists(titulo);
  if (postExiste) {
    return res
      .status(409)
      .json({ message: "El título del post ya existe" });
  }

  const result = await Posts.insertPost({
    titulo,
    descripcion,
    categoria,
    autor_id,
    fecha_creacion,
  });

  res
    .status(201)
    .json({ message: "Post creado con éxito", id: result.insertId });
};

const getPostByTitle = async (req, res) => {
  const { titulo } = req.params;
  const postExists = await Posts.checkPostTitleExists(titulo);
  if (!postExists) {
    return res.status(404).json({ message: "El título del post no existe" });
  }
  const post = await Posts.getPostByTitle(titulo);
  res.json(post);
};

module.exports = {
  selectAllPosts,
  getPostById,
  selectPostsByAuthorId,
  createPost,
  getPostByTitle
};
