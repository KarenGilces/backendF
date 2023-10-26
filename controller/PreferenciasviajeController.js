
  import { PreferenciasviajeModel } from "../models/PreferenciasviajeModel.js";

  export const getPreferenciasviaje = async (req, res) => {
    try {
      const Preferenciasviaje = await PreferenciasviajeModel.findAll({
        attributes: ['id', 'preferencia','state']
      ,where: {state:true}});
  
      res.status(200).json({Preferenciasviaje});
  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

export const createPreferenciasviaje = async (req, res) => {
  try {
    const {preferencia} = req.body;
    if (!(preferencia)) {
      return res.status(400).json({ message: "all input is required" });
    }
    const oldUser = await PreferenciasviajeModel.findOne({ where: { preferencia:preferencia } });
    if (oldUser) {
      return res.status(409).json("color already exist, enter again");
    }
    const Preferenciasviaje = await PreferenciasviajeModel.create({
      preferencia
    });
   return res.status(201).json({ Preferenciasviaje});
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};
export const updatePreferenciasviaje= async (req, res) => { 
  if (!req.body.preferencia) {
    res.status(400).json({ message: "preferencia is required" });
  }
  const preferencia = await PreferenciasviajeModel.findOne({ where: { id: req.params.id } });
  if (preferencia) {
    preferencia.set(req.body);
    await preferencia.save();
    res.status(200).json({ message: "update" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};
export const deletePreferenciasviaje= async (req, res) => {
  const preferencia = await PreferenciasviajeModel.findOne({ where: { id: req.params.id } });
  if (preferencia) {
    preferencia.set({ ...preferencia, state: false });
    await preferencia.save();
   return res.status(200).json({ message: "delete" });
  } else {
   return res.status(404).json({ message: "preferencia not found" });
  }
  };
  