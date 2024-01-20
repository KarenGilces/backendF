import { PublicarViajeModel } from "../models/PublicarViajeModel.js";

export const getViaje = async (req, res) => {
    try {
      const viajes = await PublicarViajeModel.findAll({
        attributes: ['id', 'code', 'name']
      },{where: {state:true}});
    
      res.status(200).json({viajes});
     
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };