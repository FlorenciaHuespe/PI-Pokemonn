const { Router } = require('express');
const getAllPokemonsHandlers = require ("../handlers/getAllHandlers");
const getByIdHandlers = require("../handlers/getByIdHandlers");
const getAllTypesHandlers = require ("../handlers/getTypeHandlers")
const createPokemonsHandlers = require ("../handlers/createHandlers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/pokemons", getAllPokemonsHandlers); // esta ruta busca a todos o por name
router.get("/pokemons/:id", getByIdHandlers);
router.get("/types", getAllTypesHandlers);
router.post("/pokemons", createPokemonsHandlers);


// sugerencia
// router.delete('/pokemons/:id', deletePokemonController);
// router.put('/pokemons/:id', modifyPokemonController);


module.exports = router;

