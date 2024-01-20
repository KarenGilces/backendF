import express from 'express';
import { getViajes} from '../controller/datosPersoanlesController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();