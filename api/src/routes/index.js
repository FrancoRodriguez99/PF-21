const express = require("express");
const articulos = require("./articulos.js");
const category = require("./category.js");
const mp = require("./mp.js");
const router = express.Router();

router.use("/articulo", articulos);
router.use("/category", category);
router.use("/mercadoPago", mp);

module.exports = router;
