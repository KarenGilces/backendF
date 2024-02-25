import express from 'express';
import { getValoraciones,createValoraciones,updateValoraciones, deleteValoraciones} from '../controller/CalificacionController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/valoraciones', getValoraciones);
rotuer.post('/valoraciones', verifyToken, createValoraciones);
rotuer.put('/valoraciones/:id',verifyToken, updateValoraciones);
rotuer.delete('/valoraciones/:id', verifyToken, deleteValoraciones);
export default rotuer;