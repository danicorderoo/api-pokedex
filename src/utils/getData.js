const axios = require("axios");
let typePokemon = [];

const getData = async (req, res, Pokemon) => {
  const pokes = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
  );

  const pokePromise = pokes.data.results.map((pokemon) =>
    axios.get(pokemon.url)
  );

  await axios
    .all(pokePromise)
    .then((pokemones) => {
      pokemones = pokemones?.map((pokemon) => ({
        id: pokemon.data.id,
        nombre: pokemon.data.name,
        hp: pokemon.data.stats[0].base_stat,
        attack: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat,
        special_attack: pokemon.data.stats[3].base_stat,
        special_defense: pokemon.data.stats[4].base_stat,
        speed: pokemon.data.stats[5].base_stat,
        types1: pokemon.data.types[0]?.type.name,
        types2: pokemon.data.types[1]?.type.name,
      }));

      Pokemon?.bulkCreate(pokemones);
      console.log("DB inicializada");
      res.status(200).send(pokemones);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .send({ error: "Something went wrong while loading pokemons..." });
    });
};

module.exports = getData;
