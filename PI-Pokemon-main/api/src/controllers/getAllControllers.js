const { Pokemon, Type } = require("../db");
const axios = require('axios');
const { Op } = require('sequelize');

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const cleanApi = (arr) => {
  if (!Array.isArray(arr)) {
    return []; // Retorna un arreglo vacío si arr no es un arreglo
  }

  return arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      image: elem.sprites.front_default,
      hp: elem.stats[0].base_stat,
      attack: elem.stats[1].base_stat,
      defense: elem.stats[2].base_stat,
      speed: elem.stats[5].base_stat,
      height: elem.height,
      weight: elem.weight,
      created: false,
      type: elem.types.map((type) => type.type.name)
    };
  });
};

const getAllPokemonsController = async () => {
  let results = [];

  // Obtengo los Pokémon de la base de datos
  const databasePokemons = await Pokemon.findAll({
    include:[
      {
        model: Type,
        through:'pokemon_type',
        attributes: ['name'], 
      }
    ]
  });

  // Obtengo los Pokémon de la API
  const apiPokemonsRaw = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")).data.results;
  const pokemonDetailsRaw = await Promise.all(apiPokemonsRaw.map(async (pokemon) => { //Recorro los pokemons
    const response = await axios.get(pokemon.url); //Obtengo el pokemon por url
    return response.data; //Devuelvo los pokemon de la api
  }));


  // Procesa los detalles de los Pokémon de la API
  const apiPokemonDetails = cleanApi(pokemonDetailsRaw);

  // Combina los resultados de la base de datos y la API
  results = [...databasePokemons, ...apiPokemonDetails]; // los elementos de... 

  return results;
};

const searchPokemonsByName = async (name) => {
  try {
    let URL = 'https://pokeapi.co/api/v2/pokemon/';
    let allPokemons = [];
    let allPokemonsData = [];

    // Primero busco todos los nombres de los pokemons
    for (let i = 0; i < 3; i++) {
      const response = await axios.get(`${URL}`);
      allPokemons = [...allPokemons, ...response.data.results];
      URL = response.data.next;
    }

    // Segundo, comparo los nombres de la API con el nombre que viene por consulta
    for (let e = 0; e < allPokemons.length; e++) {
      if (allPokemons[e].name.includes(name.toLowerCase())) {
        const dataPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${allPokemons[e].name}`);
        const Data = dataPokemon(dataPoke);
        allPokemonsData = [...allPokemonsData, Data];
      }
    }

    // Busco en la base de datos el nombre
    const dbPokemonsFound = await Pokemon.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });
    let pokemonsResults = [];
    pokemonsResults = dbPokemonsFound.map((pokemon) => { //Recorro los pokemons
      const { Types, ...pokemonData } = pokemon.dataValues; //Extraigo los datos del pokemon
      const type = Types.map((type) => type.name); //Obtengo los tipos
      return { ...pokemonData, type }; //Devuelvo el pokemon
    });
    // Si encuentra pokemons en la API o en la base de datos, los muestra
    if (allPokemonsData.length || pokemonsResults.length) {
      return [...allPokemonsData, ...pokemonsResults];
    } else {
      return { error: 'No se encontró ningún Pokémon' };
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

const dataPokemon = (response) => {

  const { id, name, sprites, height, stats, weight, types } = response.data
  let allTypes = types.map(elem => elem.type.name)
  const pokemonFound = {
      id,
      name,
      image: sprites.other['home'].front_default,
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[5].base_stat,
      height,
      weight,
      types: allTypes
  }
  return pokemonFound
}

module.exports = { getAllPokemonsController, searchPokemonsByName};



// const { Pokemon, Type } = require("../db");
// const axios = require('axios');
// const { Op } = require('sequelize');

// const URL = 'https://pokeapi.co/api/v2/pokemon/';

// const cleanApi = (arr) => {
//   if (!Array.isArray(arr)) {
//     return []; // Retorna un arreglo vacío si arr no es un arreglo
//   }

//   return arr.map((elem) => {
//     return {
//       id: elem.id,
//       name: elem.name,
//       image: elem.sprites.front_default,
//       hp: elem.stats[0].base_stat,
//       attack: elem.stats[1].base_stat,
//       defense: elem.stats[2].base_stat,
//       speed: elem.stats[5].base_stat,
//       height: elem.height,
//       weight: elem.weight,
//       created: false,
//     };
//   });
// };

// const getAllPokemonsController = async () => {
//   let results = [];

//   // Obtengo los Pokémon de la base de datos
//   const databasePokemons = await Pokemon.findAll({
//     include:[
//       {
//         model: Type,
//         through:'pokemon_type',
//         attributes: ['name'], 
//       }
//     ]
//   });

//   // Obtengo los Pokémon de la API
//   const apiPokemonsRaw = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")).data.results;
//   const pokemonDetailsRaw = await Promise.all(apiPokemonsRaw.map(async (pokemon) => { //Recorro los pokemons
//     const response = await axios.get(pokemon.url); //Obtengo el pokemon por url
//     return response.data; //Devuelvo los pokemon de la api
//   }));


//   // Procesa los detalles de los Pokémon de la API
//   const apiPokemonDetails = cleanApi(pokemonDetailsRaw);

//   // Combina los resultados de la base de datos y la API
//   results = [...databasePokemons, ...apiPokemonDetails]; // los elementos de... 

//   return results;
// };

// const searchPokemonsByName = async (name) => {
//   try {
//     let URL = 'https://pokeapi.co/api/v2/pokemon/';
//     let allPokemons = [];
//     let allPokemonsData = [];

//     // Primero busco todos los nombres de los pokemons
//     for (let i = 0; i < 3; i++) {
//       const response = await axios.get(`${URL}`);
//       allPokemons = [...allPokemons, ...response.data.results];
//       URL = response.data.next;
//     }

//     // Segundo, comparo los nombres de la API con el nombre que viene por consulta
//     for (let e = 0; e < allPokemons.length; e++) {
//       if (allPokemons[e].name.includes(name.toLowerCase())) {
//         const dataPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${allPokemons[e].name}`);
//         const Data = dataPokemon(dataPoke);
//         allPokemonsData = [...allPokemonsData, Data];
//       }
//     }

//     // Busco en la base de datos el nombre
//     const dbPokemonsFound = await Pokemon.findAll({
//       where: {
//         name: { [Op.iLike]: `%${name}%` }
//       },
//       include: {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: []
//         }
//       }
//     });

//     const formattedPokemons = dbPokemonsFound.map(pokemon => ({
//       ...pokemon.toJSON(),
//       types: pokemon.types.map(type => type.name)
//     }));

//     // Si encuentra pokemons en la API o en la base de datos, los muestra
//     if (allPokemonsData.length && dbPokemonsFound.length) {
//       return [...allPokemonsData, ...formattedPokemons];
//     } else {
//       return { error: 'No se encontró ningún Pokémon' };
//     }

//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// const dataPokemon = (response) => {

//   const { id, name, sprites, height, stats, weight, types } = response.data
//   let allTypes = types.map(elem => elem.type.name)
//   const pokemonFound = {
//       id,
//       name,
//       image: sprites.other['home'].front_default,
//       hp: stats[0].base_stat,
//       attack: stats[1].base_stat,
//       defense: stats[2].base_stat,
//       speed: stats[5].base_stat,
//       height,
//       weight,
//       types: allTypes
//   }
//   return pokemonFound
// }

// module.exports = { getAllPokemonsController, searchPokemonsByName};



