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
        'tipoVehiculo_id','modelo_id'] , where: {id: req.params.id }  });
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
export const deleteVehiculo= async (req, res) => {
    const type = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (type) {
      type.set({ ...type, state: false });
      await type.save();
      res.status(200).json({ message: "delete" });
    } else {
      res.status(404).json({ message: "type not found" });
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
  
  if(!req.params.id){
     return res.status(404).json({ message: "color no encontrada"});
  }
  if (!req.body.color_id) {
      return res.status(400).json({ message: "color is required" });
    }
    const datos = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, color_id: req.body.color_id });
        await datos.save();
       return res.status(200).json({ message: "color actualizado"});
    }
};
export const createUpdateMarca = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "maarca no encontrada"});
  }
  if (!req.body.marca_id) {
      return res.status(400).json({ message: "marca is required" });
    }
    const datos = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, marca_id: req.body.marca_id });
        await datos.save();
       return res.status(200).json({ message: "marca actualizado"});
    }
};
export const createUpdateModelo = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "modelo no encontrada"});
  }
  if (!req.body.modelo_id) {
      return res.status(400).json({ message: "modelo is required" });
    }
    const datos = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, modelo_id: req.body.modelo_id });
        await datos.save();
       return res.status(200).json({ message: "modelo actualizado"});
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
  
  if(!req.params.id){
     return res.status(404).json({ message: "modelo no encontrada"});
  }
  if (!req.body.tipoVehiculo_id) {
      return res.status(400).json({ message: "modelo is required" });
    }
    const datos = await VehiculoModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, tipoVehiculo_id: req.body.tipoVehiculo_id });
        await datos.save();
       return res.status(200).json({ message: "tipo actualizado"});
    }
};
