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

export const createVehiculo = async (req, res) => {
    try {
        const { placa,anioPublicacion, marca_id, datospersonales_id,color_id,tipoVehiculo_id,modelo_id} = req.body;
        if (!(placa ||  anioPublicacion|| marca_id ||  color_id ||  tipoVehiculo_id	 || datospersonales_id||modelo_id)) {
          res.status(400).json({ message: "all input is required" });
        }
        const oldUser = await VehiculoModel.findOne({ where: { placa: placa } });
        if (oldUser) {
          return res.status(409).json("placa already exist, enter again");
        }
        const users = await VehiculoModel.create({
            placa,
            color_id, // sanitize: convert email to lowercase
            marca_id,
             modelo_id,
            anioPublicacion,
            tipoVehiculo_id,
            datospersonales_id
            
        });
        res.status(201).json({ users});
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
