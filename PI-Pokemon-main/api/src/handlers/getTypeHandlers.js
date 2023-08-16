const getAllTypesController = require('../controllers/getAllTypesControllers');

const getAllTypesHandlers = async (req, res) => {
    const {type} = req.query;
        try {
          const allTypes = await getAllTypesController();
          res.status(200).send(allTypes);
        } catch (error) {
          res.status(404).json({ message: `Error al traer Types || Error: ${error.message}` });
        }
      };


module.exports = getAllTypesHandlers;

