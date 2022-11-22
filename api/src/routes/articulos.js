const express = require("express");
const { getAll } = require("../controllers/articulosController.js");

const router = express.Router();

router.get("/getAll", getAll);

module.exports = router;
