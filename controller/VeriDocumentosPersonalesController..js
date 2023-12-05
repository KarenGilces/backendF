import { VeriDocumentosPersonalesModel } from "../models/VeriDocumentosPersonalesModel.js";
import { DatosPersonalesModel } from "../models/DatosPersonalesModel.js";

export const getVeriDocumentosPersonales = async (req, res) => {
  try {
    const DocumentosPersonales= await VeriDocumentosPersonalesModel.findAll({
      attributes: ['id', 'foto', 'id_tipoDocumento', 'id_datosPersonales']
    },{where: {state:true}});
  
    res.status(200).json({DocumentosPersonales});
   
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const createVeriDocumentosPersonales = async (req, res) => {
  try {
    const { foto, id_tipoDocumento, id_datosPersonales} = req.body;
    if (!(foto ||  id_tipoDocumento ||  id_datosPersonales )) {
      res.status(400).json({ message: "all input is required" });
    }
    // const oldUser = await VeriDocumentosPersonalesModel.findOne({ where: { foto: foto } });
    // if (oldUser) {
    //   return res.status(409).json("descripcion already exist, enter again");
    // }
    const VeriDocumentosPersonales = await VeriDocumentosPersonalesModel.create({
      foto,
      id_tipoDocumento, // sanitize: convert email to lowercase
      id_datosPersonales
       
        
    });
    res.status(201).json({ VeriDocumentosPersonales});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateVeriDocumentosPersonales = async (req, res) => { 

 if (!req.body.descripcion) {
        res.status(400).json({ message: "descripcion is required" });
      }
      const type = await VeriDocumentosPersonalesModel.findOne({ where: { id: req.params.id } });
      if (type) {
        type.set(req.body);
        await type.save();
        res.status(200).json({ message: "update" });
      } else {
        res.status(404).json({ message: "type not found" });
      }};
export const deleteVeriDocumentosPersonales = async (req, res) => {
  const descripcion = await VeriDocumentosPersonalesModel.findOne({ where: { id: req.params.id } });
  if (descripcion) {
    descripcion.set({ ...descripcion, state: false });
    await descripcion.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
  };
  import mime from 'mime-types';
import path from 'path';

export const uploadImagen = async (req, res) => {
  try {
    const { foto, id_tipoDocumento, id_datosPersonales } = req.body;
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!foto) {
      return res.status(400).json({ 'message': 'No se proporcionó una imagen' });
    }

    // Obtener la extensión del archivo
    const extname = path.extname(foto);
    // Obtener el tipo MIME a partir de la extensión del archivo
    const mimeType = mime.lookup(extname);

    if (allowedMimes.includes(mimeType)) {
      const nuevaImagen = await VeriDocumentosPersonalesModel.create({
        foto,
        id_tipoDocumento,
        id_datosPersonales,
      });
      
      return res.status(200).json({ message: 'Imagen subida con éxito', img: nuevaImagen.foto });
    } else {
      return res.status(404).json({ message: 'Solo se permiten archivos JPEG, PNG y JPG' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
