const db = require("../config/db");
const { get } = require("../routes/api/posts.routes");

const selectAllPosts = async () => {
  const [result] = await db.query(
    `SELECT
      p.id AS post_id,
      p.titulo AS post_titulo,
      p.descripcion,
      p.fecha_creacion,
      p.categoria,
      a.id AS autor_id,
      a.nombre AS autor_nombre,
      a.email AS autor_email,
      a.imagen AS autor_imagen
    FROM posts p
    JOIN autores a ON p.autor_id = a.id
    ORDER BY p.fecha_creacion DESC`
  );
  return result;
};

const getPostById = async (postId) => {
  const [result] = await db.query(
    `SELECT
      p.id AS post_id,
      p.titulo AS post_titulo,
      p.descripcion,
      p.fecha_creacion,
      p.categoria,
      a.id AS autor_id,
      a.nombre AS autor_nombre,
      a.email AS autor_email,
      a.imagen AS autor_imagen
    FROM posts p
    JOIN autores a ON p.autor_id = a.id
    WHERE p.id = ?`,
    [postId]
  );
  if (result.length === 0) return null;
  return result[0];
};

const selectPostsByAuthorId = async (autorId) => {
  const [result] = await db.query(
    `SELECT
      p.id AS post_id,
      p.titulo AS post_titulo,
      p.descripcion,
      p.fecha_creacion,
      p.categoria,
      a.id AS autor_id,
      a.nombre AS autor_nombre,
      a.email AS autor_email,
      a.imagen AS autor_imagen
    FROM posts p
    JOIN autores a ON p.autor_id = a.id
    WHERE a.id = ?
    ORDER BY p.fecha_creacion DESC`,
    [autorId]
  );
  if (result.length === 0) return null;
  return result;
};

const insertPost = async ({ titulo, descripcion, categoria, autor_id, fecha_creacion }) => {
  const [result] = await db.query(
    "INSERT INTO posts (titulo, descripcion, categoria, autor_id, fecha_creacion) VALUES (?, ?, ?, ?, ?)",
    [titulo, descripcion, categoria, autor_id, fecha_creacion]
  );
  return result;
};

const checkPostTitleExists = async (titulo) => {
  const [result] = await db.query(
    "SELECT * FROM posts WHERE titulo = ?",
    [titulo]
  );
  return result.length > 0;
};

const getPostByTitle = async (titulo) => {
  const [result] = await db.query(
    `SELECT
      p.id AS post_id,
      p.titulo AS post_titulo,
      p.descripcion,
      p.fecha_creacion,
      p.categoria,
      a.id AS autor_id,
      a.nombre AS autor_nombre,
      a.email AS autor_email,
      a.imagen AS autor_imagen
    FROM posts p
    JOIN autores a ON p.autor_id = a.id
    WHERE p.titulo = ?`,
    [titulo]
  );
  return result[0];
};


module.exports = {
  selectAllPosts,
  getPostById,
  selectPostsByAuthorId,
  checkPostTitleExists,
  insertPost,
  getPostByTitle,
};
