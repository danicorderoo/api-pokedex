const { Router } = require("express");
// Importar todos los routers;
const pokemonsRouter = require("./pokemons.js");

const router = Router();

// Configurar los routers

router.use("/pokemons", pokemonsRouter);

router.use("/", (req, res) => {
  res.send("root main");
});

module.exports = router;
