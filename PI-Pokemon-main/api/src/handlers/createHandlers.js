const createPokemonController = require ('../controllers/createControllers');


const createPokemonsHandlers = (req, res) => {
    createPokemonController(req, res);
};


module.exports = createPokemonsHandlers;

