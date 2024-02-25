
import { CalificacionModel } from "../models/CalificacionModel.js";

export const getValoraciones = async (req, res) => {
  try {
    const valoraciones= await CalificacionModel.findAll({
      attributes: ['id', 'resena', 'calificacion','publicarviajes_id','user_id']
    },{where: {state:true}});
  
    res.status(200).json({valoraciones});
   
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const createValoraciones= async (req, res) => {
  try {
    const { resena,calificacion,  publicarviajes_id ,user_id} = req.body;
    if (!(resena ||  calificacion||publicarviajes_id|| user_id)) {
      res.status(400).json({ message: "all input is required" });
    }
    const valoraciones = await CalificacionModel.create({
        resena,calificacion,
        publicarviajes_id,
      user_id
       
        
    });
    res.status(201).json({ valoraciones});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateValoraciones= async (req, res) => { 

 if (!req.body.resena) {
        res.status(400).json({ message: "resena is required" });
      }
      const type = await CalificacionModel.findOne({ where: { id: req.params.id } });
      if (type) {
        type.set(req.body);
        await type.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }};
export const deleteValoraciones= async (req, res) => {
        try {
          const valoracionesId = req.params.id;
      
          // Buscar el vehículo por ID
          const valoraciones = await CalificacionModel.findByPk(valoracionesId);
      
          if (!valoraciones) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
          }
      
          // Eliminar el vehículo de la base de datos
          await valoraciones.destroy();
      
          return res.status(200).json({ message: "Vehículo eliminado exitosamente" });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      };