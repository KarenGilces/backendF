import express from 'express';
import { getDatos ,createDatos,updateDatos,deleteDatos,crearResenaYCalificacion,createUpdateLastName,getDatosTodos, createUpdateCedula,createUpdateCelular,createUpdateNames,createUpdateDate,createUpdateMinBibliografia,createUpdateAcercade, createUpdateSexo} from '../controller/datosPersoanlesController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/datos/:id',getDatos );
rotuer.get('/datos', getDatosTodos );
rotuer.post('/datos',verifyToken,createDatos);
rotuer.put('/datos/lastname/:id',verifyToken,createUpdateLastName);
rotuer.put('/datos/names/:id',createUpdateNames);
rotuer.put('/datos/cedula/:id',verifyToken,createUpdateCedula);
rotuer.put('/datos/celular/:id',verifyToken,createUpdateCelular);
rotuer.put('/datos/sexo/:id',verifyToken,createUpdateSexo);
rotuer.put('/datos/minBibliografia/:id',verifyToken,createUpdateMinBibliografia);
rotuer.put('/datos/acercade/:id',verifyToken,createUpdateAcercade);
rotuer.put('/datos/resena/:id',crearResenaYCalificacion);
rotuer.put('/datos/date/:id',verifyToken,createUpdateDate);
rotuer.put('/datos/:id', verifyToken, updateDatos);
rotuer.delete('/datos/:id',verifyToken, deleteDatos);


export default rotuer;