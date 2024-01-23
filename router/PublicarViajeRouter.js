import express from 'express';
import { getPublicarViaje,createPublicarViaje,updatePublicarViaje,deletePublicarViaje} from '../controller/PublicarViajeController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();
rotuer.get('/publicar',verifyToken, getPublicarViaje);
rotuer.post('/publicar', verifyToken,createPublicarViaje);
rotuer.put('/publicar/:id', verifyToken,updatePublicarViaje);
rotuer.delete('/publicar/:id',verifyToken,deletePublicarViaje);


export default rotuer;