import { MarcaModel } from "../models/MarcaModel.js";

export const getMarca = async (req, res) => {
  try {
    const marcas = await MarcaModel.findAll({
      attributes: ['id', 'descripcion']
    },{where: {state:true}});
  
    res.status(200).json({marcas});
   
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const createMarca = async (req, res) => {
    try {
        const {descripcion} = req.body;
        if (!(descripcion)) {
          return res.status(400).json({ message: "all input is required" });
        }
        const oldUser = await MarcaModel.findOne({ where: { descripcion:descripcion } });
        if (oldUser) {
          return res.status(409).json("marca already exist, enter again");
        }
        const marcas = await MarcaModel.create({
            descripcion
        });
       return res.status(201).json({ marcas});
      } catch (error) {
       return res.status(500).json({ error: error.message });
      }
};
export const updateMarca= async (req, res) => { 
    if (!req.body.descripcion) {
        res.status(400).json({ message: "descripcion is required" });
      }
      const descripcion = await MarcaModel.findOne({ where: { id: req.params.id } });
      if (descripcion) {
        descripcion.set(req.body);
        await descripcion.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }
};
export const deleteMarca= async (req, res) => {
    const descripcion = await MarcaModel.findOne({ where: { id: req.params.id } });
    if (descripcion) {
        descripcion.set({ ...descripcion, state: false });
      await descripcion.save();
     return res.status(200).json({ message: "delete" });
    } else {
     return res.status(404).json({ message: "descripcion not found" });
    }
  };