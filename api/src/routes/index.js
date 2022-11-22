const express = require("express");
const articulos = require("./articulos.js");
const router = express.Router();

router.use("/articulo", articulos);

module.exports = router;
