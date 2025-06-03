const db = require("../config/db");

const selectAllAuthors = async () => {
  const [result] = await db.query("SELECT * FROM autores");
  return result;
};

const selectAuthorById = async (autorId) => {
  const [result] = await db.query("SELECT * FROM autores WHERE id = ?", [
    autorId,
  ]);
  if (result.length === 0) return null;
  return result[0];
};

const selectAuthorByEmail = async (email) => {
  const [result] = await db.query("SELECT * FROM autores WHERE email = ?", [
    email,
  ]);
  if (result.length === 0) return null;
  return result[0];
};

const insertAuthor = async ({ nombre, email, imagen }) => {
  const [result] = await db.query(
    "INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)",
    [nombre, email, imagen]
  );
  return result;
};

module.exports = {
  selectAllAuthors,
  selectAuthorById,
  selectAuthorByEmail,
  insertAuthor,
};