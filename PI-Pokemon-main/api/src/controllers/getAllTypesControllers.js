const { Type } = require("../db");
const axios = require('axios');

const URL = 'https://pokeapi.co/api/v2/type';


const getAllTypesController = async (req, res) => {
  try {
    const response = await axios.get(`${URL}`);
    const { results } = response.data;
    let allTypes = [];

    // Bucle para guardar todos los tipos en la base de datos.
    // La función findOrCreate evita duplicados.
    for (let i = 0; i < results.length; i++) {
      let elem = await Type.findOrCreate({ where: { name: results[i].name } });
      allTypes.push(elem[0].name);
    }

    return allTypes;

  } catch (error) {
    throw new Error(`Error al traer Types || Error: ${error.message}`);
  }
};

module.exports = getAllTypesController;

