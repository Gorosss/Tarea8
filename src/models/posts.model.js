const db = require("../config/db");

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

const insertPost = async ({ titulo, descripcion, categoria, autor_id }) => {
  const [result] = await db.query(
    "INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)",
    [titulo, descripcion, categoria, autor_id]
  );
  return result;
};

const getPostByTitle = async (titulo) => {
  const [result] = await db.query("SELECT * FROM posts WHERE titulo = ?", [
    titulo,
  ]);
  return result[0];
};

module.exports = {
  selectAllPosts,
  selectPostsByAuthorId,
  insertPost,
  getPostByTitle,
};
