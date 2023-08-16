const {Pokemon, Type} = require("../db"); 

const createPokemonController = async (req, res) => {
    try {
      
      const { name, image, hp, attack, defense, speed, height, weight, types } =
        req.body;
  
    const pokeFound = await Pokemon.findOne({ where: { name } });
    
      if (pokeFound) {
        return res
          .status(400)
          .json({ message: `Ese pokemon ya existe en la base de datos` });
      }

    const newPokemon = await Pokemon.create({
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      });

      for (const typeName of types) { //Recorro el array de tipos
        const [foundType] = await Type.findOrCreate({ //Busco el tipo en la base de datos, sino lo creo
            where: { name: typeName }, //Busco el tipo por nombre
        });
        await newPokemon.addType(foundType); //Agrego el tipo al pokemon
    }
    const pokemonWithTypes = await Pokemon.findByPk(newPokemon.id, { //Busco el pokemon por id y lo incluyo con los tipos que tiene asociados en la base de datos, asi se muestra el pokemon creado con toda su informacion
        include: Type, //Incluyo los tipos
    });
      res.status(200).json(pokemonWithTypes);
    } catch (error) {
      res.status(408).send({
        message: `Error al crear el Pokemon || Error: ${error.message}`,
      });
    }

};


module.exports = createPokemonController;

// const {Pokemon, Type} = require("../db"); 

// const createPokemonController = async (req, res) => {
//     try {
      
//       const { name, image, hp, attack, defense, speed, height, weight, types } =
//         req.body;
  
//     const pokeFound = await Pokemon.findOne({ where: { name } });
    
//       if (pokeFound) {
//         return res
//           .status(400)
//           .json({ message: `Ese pokemon ya existe en la base de datos` });
//       }

//     const newPokemon = await Pokemon.create({
//         name,
//         image,
//         hp,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//       });

//       for (let i = 0; i < types.length; i++) {
//         const typeDb = await Type.findOne({ where: { name: types[i] } });

//         newPokemon.addTypes(typeDb);
//       }
//       res.status(200).json(newPokemon);
//     } catch (error) {
//       res.status(408).send({
//         message: `Error al crear el Pokemon || Error: ${error.message}`,
//       });
//     }

// };


// module.exports = createPokemonController;

