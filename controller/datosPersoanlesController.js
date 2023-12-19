import { DatosPersonalesModel } from "../models/DatosPersonalesModel.js";
import { VehiculoModel } from "../models/VehiculoModel.js";
export const getDatos = async (req, res) => {
    try {
        const datos = await DatosPersonalesModel.findOne({
          attributes: ['id', 'names','lastname','cedula', 'date','acercade','celular','sexo', 'foto'
          ,'minBibliografia','calificacion','resena','state'] ,
           where: {id: req.params.id },
          
           include: [
            {
              model: VehiculoModel, 
              attributes: ['id',] 
            }
          ]
          
          });
        if(datos==null){
          return res.status(404).json({message: "Usuario no encontrado"});
        }
        return res.status(200).json({datos});
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
};
export const getDatosTodos = async (req, res) => {
  try {
    const datos = await DatosPersonalesModel.findAll({
      attributes: ['id', 'names','lastname','cedula', 'date','celular','sexo', 'foto','acercade'
      ,'minBibliografia','calificacion','resena','state']
    },{where: {state:true}});
  
    res.status(200).json({datos});
   
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
export const createDatos  = async (req, res) => {
  try {
    const { cedula, names, email, date ,celular, sexo, foto ,minBibliografia,acercade, cantones_id} = req.body;
    if (!(cedula ||  names ||  email ||  date||  celular  ||  sexo ||  foto||  minBibliografia||acercade|| cantones_id)) {
      res.status(400).json({ message: "all input is required" });
    }
    const oldUser = await DatosPersonalesModel.findOne({ where: { cedula: cedula } });
    if (oldUser) {
      return res.status(409).json("cedula existente");
    }
    const users = await DatosPersonalesModel.create({
    cedula,
    names, // sanitize: convert email to lowercase
    email,
    date,
    celular,
    sexo, // sanitize: convert email to lowercase
    foto,
      minBibliografia,
      acercade,
      cantones_id
    });
    res.status(201).json({ users});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateDatos = async (req, res) => {
    if (!req.body.cedula) {
        res.status(400).json({ message: "cedula is required" });
      }
      const type = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
      if (type) {
        type.set(req.body);
        await type.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }
};
export const deleteDatos = async (req, res) => {
  const type = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
  if (type) {
    type.set({ ...type, state: false });
    await type.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};

export const createUpdateLastName = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "usuario no encontrado"});
  }
  if (!req.body.apellido) {
      return res.status(400).json({ message: "apellido is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, lastname: req.body.apellido });
        await datos.save();
       return res.status(200).json({ message: "apellido actualizado"});
    }
};
export const createUpdateCedula = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "cedula no encontrada"});
  }
  if (!req.body.cedula) {
      return res.status(400).json({ message: "cedula is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, cedula: req.body.cedula });
        await datos.save();
       return res.status(200).json({ message: "cedula actualizado"});
    }
};
export const createUpdateCelular = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "celular no encontrada"});
  }
  if (!req.body.celular) {
      return res.status(400).json({ message: "celular is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, celular: req.body.celular });
        await datos.save();
       return res.status(200).json({ message: "celular actualizado"});
    }
};
export const createUpdateSexo= async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "sexo no encontrada"});
  }
  if (!req.body.sexo) {
      return res.status(400).json({ message: "sexo is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, sexo: req.body.sexo });
        await datos.save();
       return res.status(200).json({ message: "sexo actualizado"});
    }
};
export const createUpdateMinBibliografia= async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "minBibliografia no encontrada"});
  }
  if (!req.body.minBibliografia) {
      return res.status(400).json({ message: "minBibliografia is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, minBibliografia: req.body.minBibliografia });
        await datos.save();
       return res.status(200).json({ message: "minBibliografia actualizado"});
    }
};
export const createUpdateAcercade= async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "acercade no encontrada"});
  }
  if (!req.body.acercade) {
      return res.status(400).json({ message: "acercade is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, acercade: req.body.acercade });
        await datos.save();
       return res.status(200).json({ message: "acercade actualizado"});
    }
};
export const createUpdateDate= async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "date no encontrada"});
  }
  if (!req.body.date) {
      return res.status(400).json({ message: "date is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, date: req.body.date });
        await datos.save();
       return res.status(200).json({ message: "date actualizado"});
    }
};
export const createUpdateNames = async (req, res) => {
  
  if(!req.params.id){
     return res.status(404).json({ message: "names no encontrada"});
  }
  if (!req.body.names) {
      return res.status(400).json({ message: "names is required" });
    }
    const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
    if (datos) {
        datos.set({ ...datos, names: req.body.names });
        await datos.save();
       return res.status(200).json({ message: "names actualizado"});
    }
};
export const crearResenaYCalificacion = async (req, res) => {
  if (!req.body.resena && !req.body.calificacion) {
    return res.status(400).json({ message: "resena or calificacion is required" });
  }
  const datos = await DatosPersonalesModel.findOne({ where: { id: req.params.id } });
  if (datos) {
    if (req.body.resena) {
      datos.set({ ...datos, resena: req.body.resena });
    }

    if (req.body.calificacion) {
      datos.set({ ...datos, calificacion: req.body.calificacion });
    }

    await datos.save();
    return res.status(200).json({ message: "resena and/or calificacion updated" });
  }
};
