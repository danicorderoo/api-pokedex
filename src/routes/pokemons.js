const { Router } = require("express");
const { Pokemon } = require("../db");
const getData = require("../utils/getData.js");
const router = Router();

router.get("/", async (req, res) => {
  let nombre = req.body.nombre;

  try {
    const stateDB = await Pokemon?.findAll();
    if (!stateDB.length) await getData(req, res, Pokemon);
    else {
      if (nombre) {
        console.log(`DB 'Country' Consultada con name:${nombre}`);
        const pokemonName = await Pokemon?.findOne({
          where: { nombre: nombre },
        });
        if (!pokemonName) throw Error();
        return res.status(200).send(pokemonName);
      }

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

module.exports = router;
