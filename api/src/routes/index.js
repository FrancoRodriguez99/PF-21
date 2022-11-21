const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Country, Tourism } = require("../db.js");
const axios = require("axios");
const router = Router();
const sequelize = require("sequelize");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let instancia = true;
//readme pide 2 routas countries, que hacen distintas cosas, imposible tener 2 rutas iguales, comente la otra
/*
router.get("/countries:name", async function (req, res) {
  console.log("asd");
  const namePais = req.query.name;
  try {
      var fixedname = namePais.toLocaleLowerCase();

      const answer = await Country.findAll({
        where: {
          name: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("name")),
            "LIKE",
            "%" + fixedname + "%"
          ),
        },
      });

      return answer.length > 0
        ? res.status(200).send(answer)
        : res.status(460).send("No existe ninguno con el nombre: " + namePais);
    } catch (error) {
      return res.status(461).send("Error " + error);
    }
});*/

router.get("/countries", async function (req, res) {
  const namePais = req.query.name ? req.query.name : false;
  if (namePais) {
    try {
      var fixedname = namePais.toLocaleLowerCase();

      const answer = await Country.findAll({
        where: {
          name: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("name")),
            "LIKE",
            "%" + fixedname + "%"
          ),
        },
      });

      return answer.length > 0
        ? res.status(200).send(answer)
        : res.status(460).send("No existe ninguno con el nombre: " + namePais);
    } catch (error) {
      return res.status(461).send("Error " + error);
    }
  }
  if (instancia) {
    try {
      const api = await axios.get("https://restcountries.com/v3/all");

      //foreach tiene problemas con await, debo usar for

      for (let i = 0; api.data.length > i; i++) {
        const {
          name,
          flags: img,
          population: pop,
          subregion: subreg,
          area: area,
          region: cont,
          cca3: id,
        } = api.data[i];

        // "Paises" como la Antartida no tienen capital, entonces su array esta vacio, esto causa problemas al tomar los datos, asi que tuve que dejar un
        //default en caso de ser falso

        const cap = api.data[i].capital
          ? api.data[i].capital.join(",")
          : "none";

        await Country.create({
          id: id,
          name: name.common,
          img: img[1],
          cont,
          cap,
          subreg,
          area,
          pop,
        });
      }

      instancia = false;

      const x = await Country.findAll({ include: ["tourisms"] });

      return res.status(200).send(x);
    } catch (error) {
      return res
        .status(463)
        .send("error tomando los datos de la api" + error.stack);
    }
  } else {
    try {
      const x = await Country.findAll({ include: Tourism });
      return res.status(200).send(x);
    } catch (error) {
      return res
        .status(464)
        .send("error tomando los datos de la base" + error.stack);
    }
  }
});

router.get("/countries/:idPais", async function (req, res) {
  const idPais = req.params.idPais;

  try {
    const answer = await Country.findByPk(idPais, {
      include: Tourism,
    });
    return res.status(201).send(answer);
  } catch (error) {
    return res.status(400).send("Error " + error);
  }
});

router.post("/activities", async function (req, res) {
  const { name, dura, diff, temp } = req.body;
  var { paisId } = req.body;
  paisId = paisId.split(",");
  try {
    const answer = await Tourism.create({
      name,
      dura,
      diff,
      temp,
    });

    const activity = await Tourism.findByPk(answer.id);
    paisId.forEach(async function (x) {
      const link1 = await activity.addCountry(x);
    });

    return res.status(200).send(activity);
  } catch (error) {
    return res.status(969).send(error);
  }
});

module.exports = router;
