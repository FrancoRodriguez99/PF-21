const { Article, Category } = require("../db.js");

const getAll = async (req, res) => {
  const articulos = await Article.findAll({ include: Category });
  const categorias = await Category.findAll();
  return res.status(200).json({ articulos, categorias });
};

module.exports = {
  getAll,
};
