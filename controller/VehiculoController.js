import { VehiculoModel } from "../models/VehiculoModel.js";

export const getVehiculo = async (req, res) => {
    try {
        const vehiculos= await VehiculoModel.findAll({
          attributes: ['id', 'placa', 'anioPublicacion','marca_id','datospersonales_id','color_id',
          'tipoVehiculo_id','modelo_id']
        },{where: {state:true}});
      
        res.status(200).json({vehiculos});
       
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
};
export const getVehiculoId = async (req, res) => {
  try {
      const datos = await VehiculoModel.findOne({
        attributes: ['id', 'placa', 'anioPublicacion','marca_id','datospersonales_id','color_id',
        'tipoVehiculo_id','modelo_id'] , where: {id: req.params.id, state: 1 }  });
        
      if(datos==null){
        return res.status(404).json({message: "Vehiculo  no encontrado"});
      }
      return res.status(200).json({datos});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};
export const createVehiculo = async (req, res) => {
  try {
    const { placa, anioPublicacion, marca_id, datospersonales_id, color_id, tipoVehiculo_id, modelo_id } = req.body;
    
    if (!(placa || anioPublicacion || marca_id || color_id || tipoVehiculo_id || datospersonales_id || modelo_id)) {
      res.status(400).json({ message: "All input is required" });
      return;
    }

    // Verificar si el usuario ya tiene un vehículo
    const existingVehicle = await VehiculoModel.findOne({ where: { datospersonales_id: datospersonales_id } });
    if (existingVehicle) {
      return res.status(409).json("El usuario ya tiene un vehículo registrado.");
    }

    const vehicle = await VehiculoModel.create({
      placa,
      color_id,
      marca_id,
      modelo_id,
      anioPublicacion,
      tipoVehiculo_id,
      datospersonales_id
    });

    res.status(201).json({ vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateVehiculo = async (req, res) => {
    if (!req.body.placa) {
        res.status(400).json({ message: "placa is required" });
      }
      const type = await VehiculoModel.findOne({ where: { id: req.params.id } });
      if (type) {
        type.set(req.body);
        await type.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }
};
/* export const deleteVehiculo= async (req, res) => {
    const type = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (type) {
      type.set({ ...type, state: false });
      await type.save();
      res.status(200).json({ message: "delete" });
    } else {
      res.status(404).json({ message: "type not found" });
    }
}; */
export const deleteVehiculo= async (req, res) => {
  try {
    const vehiculoId = req.params.id;

    // Buscar el vehículo por ID
    const vehiculo = await VehiculoModel.findByPk(vehiculoId);

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    // Eliminar el vehículo de la base de datos
    await vehiculo.destroy();

    return res.status(200).json({ message: "Vehículo eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const createUpdatePlaca = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "placa no encontrada"});
  }
  if (!req.body.placa) {
      return res.status(400).json({ message: "placa is required" });
    }
    const datos = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, placa: req.body.placa });
        await datos.save();
       return res.status(200).json({ message: "placa actualizado"});
    }
};
export const createUpdateColor = async (req, res) => {
  try {
    const vehiculoId = req.params.id;
    const nuevoColorId = req.body.color_id;

    // Verificar si la fila a actualizar existe
    const vehiculo = await VehiculoModel.findByPk(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({ message: "Color no encontrado" });
    }

    // Actualizar la marca
    vehiculo.color_id = nuevoColorId;
    await vehiculo.save();

    return res.status(200).json({ message: "Color actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar el color:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createUpdateMarca = async (req, res) => {
  try {
    const vehiculoId = req.params.id;
    const nuevaMarcaId = req.body.marca_id;

    // Verificar si la fila a actualizar existe
    const vehiculo = await VehiculoModel.findByPk(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    // Actualizar la marca
    vehiculo.marca_id = nuevaMarcaId;
    await vehiculo.save();

    return res.status(200).json({ message: "Marca actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la marca:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createUpdateModelo = async (req, res) => {
  
  try {
    const vehiculoId = req.params.id;
    const nuevaModeloId = req.body.modelo_id;

    // Verificar si la fila a actualizar existe
    const vehiculo = await VehiculoModel.findByPk(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    // Actualizar la marca
    vehiculo.modelo_id = nuevaModeloId;
    await vehiculo.save();

    return res.status(200).json({ message: "Modelo actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar el modelo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const createUpdateAnio = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "año no encontrada"});
  }
  if (!req.body.anioPublicacion) {
      return res.status(400).json({ message: "año is required" });
    }
    const datos = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, anioPublicacion: req.body.anioPublicacion });
        await datos.save();
       return res.status(200).json({ message: "año actualizado"});
    }
};
export const createUpdateTipo = async (req, res) => {
  try {
    const vehiculoId = req.params.id;
    const nuevoTipoId = req.body.tipoVehiculo_id;

    // Verificar si la fila a actualizar existe
    const vehiculo = await VehiculoModel.findByPk(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    // Actualizar la marca
    vehiculo.tipoVehiculo_id = nuevoTipoId;
    await vehiculo.save();

    return res.status(200).json({ message: "TipoVehiculo actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar el TipoVehiculo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
