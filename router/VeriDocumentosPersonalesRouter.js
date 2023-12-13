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
import { getVeriDocumentosPersonales,createVeriDocumentosPersonales,uploadImagenes,
    updateVeriDocumentosPersonales,deleteVeriDocumentosPersonales} 
from '../controller/VeriDocumentosPersonalesController..js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();
rotuer.post('/veri/documento/imagenes', upload.single('imagen'), uploadImagenes);
rotuer.get('/veri/documento/:id', getVeriDocumentosPersonales);
rotuer.post('/veri/documento',verifyToken,  createVeriDocumentosPersonales);
rotuer.put('/veri/documento/:id', verifyToken, updateVeriDocumentosPersonales);
rotuer.delete('/veri/documento/:id',verifyToken,  deleteVeriDocumentosPersonales);


export default rotuer;