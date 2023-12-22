import express from 'express';
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/imagenes/usuario'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const nombreArchivo = Date.now() + extname; // Nombre de archivo
      cb(null, nombreArchivo);
    },
  });
  const upload = multer({ storage })

import { getVeriDocumentosPersonales,createVeriDocumentosPersonales,actualizarVerificacion,gettVeriDocumentosPersonalesT,uploadImagenes,
    updateVeriDocumentosPersonales,deleteVeriDocumentosPersonales, uploadImagen} 
from '../controller/VeriDocumentosPersonalesController..js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();
rotuer.put('/verificar/documento/:id',actualizarVerificacion);
rotuer.post('/veri/documento/imagenes', upload.single('imagen'), uploadImagenes);
rotuer.post('/veri/documento/imagenes/:id', upload.single('imagen'), uploadImagen);
rotuer.get('/veri/documento/:id', getVeriDocumentosPersonales);
rotuer.get('/veri/documento', gettVeriDocumentosPersonalesT);
rotuer.post('/veri/documento',verifyToken,  createVeriDocumentosPersonales);
rotuer.put('/veri/documento/:id', updateVeriDocumentosPersonales);
rotuer.delete('/veri/documento/:id',verifyToken,  deleteVeriDocumentosPersonales);


export default rotuer;