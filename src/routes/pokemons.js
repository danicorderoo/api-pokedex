const { Router } = require("express");
const { Pokemon } = require("../db");
const getData = require("../utils/getData.js");
const router = Router();
const regxLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
const regxNumer = /^[0-9]+$/;

router.get("/", async (req, res) => {
  try {
    const stateDB = await Pokemon?.findAll();
    if (!stateDB.length) await getData(req, res, Pokemon);
    else {
      console.log("DB 'Pokemon' Consultada");
      res.status(200).send(stateDB);
    }
  } catch (error) {
    console.log("Not found!");
    console.log(error);
    res
      .status(400)
      .send({ error: "Something went wrong while loading pokemons..." });
  }
});

router.get("/:consulta", async (req, res) => {
  const consulta = req.params.consulta;
  let nombre = null;
  let id = null;

  if (regxLetras.test(consulta)) nombre = consulta;

  if (regxNumer.test(consulta)) id = consulta;

  try {
    if (id) {
      console.log(`DB 'Country' Consultada con ID:${id}`);
      const pokemonID = await Pokemon?.findOne({
        where: { id: id },
      });
      if (!pokemonID) throw Error();
      return res.status(200).send(pokemonID);
    }

    if (nombre) {
      console.log(`DB 'Country' Consultada con nombre:${nombre}`);
      const pokemonName = await Pokemon?.findOne({
        where: { nombre: nombre },
      });
      if (!pokemonName) throw Error();
      return res.status(200).send(pokemonName);
    }
  } catch (error) {
    console.log("Not found!");
    console.log(error);
    res
      .status(400)
      .send({ error: "Something went wrong while loading pokemons..." });
  }
});

module.exports = router;
