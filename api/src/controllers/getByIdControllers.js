const {Pokemon, Type} = require("../db");
const axios = require ("axios");


const getByIdController = async (id, source) =>{

  const pokemon = 
  source === "api" 
  ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
  .data 
  : await Pokemon.findByPk(id, { //Busco el pokemon por id en la base de datos
    include: [{ model: Type, through: 'Pokemons_Types', as: 'Types' }] //Incluyo los tipos
});

  if(source === "api") {
    return cleanPokemonById(pokemon)
  } else return pokemon
  // return cleanPokemonById(pokemon)
}
const cleanPokemonById = (pokemon) => { //limpiar api
  const { id, name, sprites, stats, height, weight, types} = pokemon; //datos del pokemon
  const hp = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const speed = stats[5].base_stat;
  const image = sprites.other["official-artwork"].front_default;
  const type = types.map((type) => type.type.name);
  const created = false;
  return { id, name, image, hp, attack, defense, speed, height, weight, created, type }; //pokemon limpio

};

module.exports = getByIdController;

// const {Pokemon, Type} = require("../db");
// const axios = require ("axios");


// const getByIdController = async (id, source) =>{

//   const pokemon = 
//   source === "api" 
//   ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
//   .data 
//   : await Pokemon.findByPk(id);

//   if(source === "api") {
//     return cleanPokemonById(pokemon)
//   } else return pokemon
//   // return cleanPokemonById(pokemon)
// }
// const cleanPokemonById = (pokemon) => { //limpiar api
//   const { id, name, sprites, stats, height, weight, types} = pokemon; //datos del pokemon
//   const hp = stats[0].base_stat;
//   const attack = stats[1].base_stat;
//   const defense = stats[2].base_stat;
//   const speed = stats[5].base_stat;
//   const image = sprites.other["official-artwork"].front_default;
//   const type = types.map((type) => type.type.name);
//   const created = false;
//   return { id, name, image, hp, attack, defense, speed, height, weight, created, type }; //pokemon limpio

// };

// module.exports = getByIdController;

