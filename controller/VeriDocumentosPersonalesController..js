import { VeriDocumentosPersonalesModel } from "../models/VeriDocumentosPersonalesModel.js";
import { DatosPersonalesModel } from "../models/DatosPersonalesModel.js";

export const getVeriDocumentosPersonales = async (req, res) => {
  try {
    const idDatosPersonales = req.params.id; 
    const documentosPersonales = await VeriDocumentosPersonalesModel.findAll({
      attributes: ['id', 'foto', 'id_tipoDocumento', 'id_datosPersonales','detail', 'type'],
      where: {
        id_datosPersonales: idDatosPersonales,
      },
    });

    if (!documentosPersonales || documentosPersonales.length === 0) {
      return res.status(404).json({ error: 'Documentos personales no encontrados' });
    }
  
    res.status(200).json({ documentosPersonales });
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const gettVeriDocumentosPersonalesT = async (req, res) => {
  try {
    const documentosPersonales = await VeriDocumentosPersonalesModel.findAll({
      attributes: ['id', 'foto', 'id_tipoDocumento', 'id_datosPersonales','detail', 'type']
    ,where: {state:true}});
  
    res.status(200).json({documentosPersonales});
   
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

  export const uploadImagenes = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
      }
  
      const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedMimes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: 'Solo se permiten archivos JPEG, PNG y JPG' });
      }
  
      const nuevaImagen = await VeriDocumentosPersonalesModel.create({
        foto: req.file.filename,
        id_tipoDocumento: req.body.id_tipoDocumento, // Corregido a req.body
        id_datosPersonales: req.body.id_datosPersonales, // Corregido a req.body
      });
  
      return res.status(200).json({ message: 'Imagen subida con éxito', img: nuevaImagen.foto });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  export const uploadImagen = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({'message':'No se proporcionó una imagen'});
      }
      const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedMimes.includes(req.file.mimetype)) {
        const persona= await VeriDocumentosPersonalesModel.findOne({where:{id:req.params.id}});
        if(persona){
          const nombreImagen = req.file.filename;
          persona.set({...persona,foto:nombreImagen});
          await persona.save();
          res.status(200).json({ message: "Imagen subida con éxito" , img:persona.foto});
          }else{
          res.status(404).json({message: "Usuario no encontrado"});
        }
      } else {
        res.status(404).json({message: "Solo se permiten archivos JPEG, PNG y JPG"});
      }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  export const actualizarVerificacion = async (req, res) => {
    try {
      const { id } = req.params;
      const verification = await VeriDocumentosPersonalesModel.findByPk(id);
  
      if (!verification) {
        return res.status(404).json({ message: 'Verification not found' });
      }
  
      if (req.body.type !== undefined) {
        verification.type = req.body.type === 'true';
      }
  
      if (req.body.detail !== undefined) {
        verification.detail = req.body.detail;
      }
  
      await verification.save();
  
      return res.status(200).json({ message: 'Verification updated', verification });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
