const {searchPokemonsByName, getAllPokemonsController} = require ('../controllers/getAllControllers');

const getAllPokemonsHandlers = async (req, res)=>{
    const {name} = req.query;
    try {
    const results = name ? await searchPokemonsByName (name) : await getAllPokemonsController(); //todos || solo los que tenga x name
    res.status(200).json(results);
    } catch (error) {
        res.status(400).json({error:"El pokemon no fue encontrado"})
    }

};   
module.exports = getAllPokemonsHandlers; 
