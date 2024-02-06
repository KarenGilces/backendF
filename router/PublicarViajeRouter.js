import express from 'express';
import { getPublicarViaje,createPublicarViaje,updatePublicarViaje,deletePublicarViaje, getViajesFilter} from '../controller/PublicarViajeController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();
rotuer.get('/publicar',verifyToken, getPublicarViaje);
rotuer.post('/publicar', verifyToken,createPublicarViaje);
rotuer.put('/publicar/:id', verifyToken,updatePublicarViaje);
rotuer.delete('/publicar/:id',verifyToken,deletePublicarViaje);
rotuer.post('/publicar/filter',verifyToken,getViajesFilter);


export default rotuer;
