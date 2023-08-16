const getByIdController = require ('../controllers/getByIdControllers');

const getByIdHandlers = async (req, res) =>{
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";  
    try {
        const pokemon = await getByIdController (id, source); //controlador para buscar en BDD
        res.status(200).json(pokemon);
    } catch (error) {
        return res.status(500).json({ message: `Error al buscar el Pokemon con ese id || Error: ${error.message}` });
    }
    };

    module.exports = getByIdHandlers;
