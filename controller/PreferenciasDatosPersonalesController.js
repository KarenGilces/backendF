
  import { PreferenciasDatosPersonalesModel } from "../models/PreferenciasDatosPersonalesModel.js";



export const getPreferenciasDatosPersonales = async (req, res) => {
  try {
    const PreferenciasDatosPersonales = await PreferenciasDatosPersonalesModel.findAll({
      attributes: ['id', 'id_preferencia', 'id_datosPersonales','state']
    ,where: {state:true}});

    res.status(200).json({PreferenciasDatosPersonales});

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const createPreferenciasDatosPersonales = async (req, res) => {
  try {
    const {  id_preferencia, id_datosPersonales} = req.body;
    if (!(  id_preferencia ||  id_datosPersonales )) {
      res.status(400).json({ message: "all input is required" });
    }
    const PreferenciasDatosPersonales = await PreferenciasDatosPersonalesModel.create({
      id_preferencia, // sanitize: convert email to lowercase
      id_datosPersonales
    });
    res.status(201).json({ PreferenciasDatosPersonales});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePreferenciasDatosPersonales = async (req, res) => { 

 if (!req.body.id_datosPersonales) {
        res.status(400).json({ message: "descripcion is required" });
      }
      const type = await PreferenciasDatosPersonalesModel.findOne({ where: { id: req.params.id } });
      if (type) {
        type.set(req.body);
        await type.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }};
export const deletePreferenciasDatosPersonales = async (req, res) => {
  const descripcion = await PreferenciasDatosPersonalesModel.findOne({ where: { id: req.params.id } });
  if (descripcion) {
    descripcion.set({ ...descripcion, state: false });
    await descripcion.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
  };
