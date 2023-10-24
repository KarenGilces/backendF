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
  
import { login,updateUsersPassword, uploadImagen,updateUsersEmail, getUsers,createUsers,updateUsers,deleteUsers} from '../controller/UserController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/user', getUsers);
rotuer.post('/user/imagen/:id', upload.single('imagen'), uploadImagen);
rotuer.post('/user', createUsers);
rotuer.put('/user/:id',verifyToken, updateUsers);
rotuer.delete('/user/:id', verifyToken, deleteUsers);
rotuer.post('/login', login);
rotuer.put('/user/email/:id',verifyToken, updateUsersEmail);
rotuer.put('/user/password/:id',verifyToken, updateUsersPassword);


export default rotuer;