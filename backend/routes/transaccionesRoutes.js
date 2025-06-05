import express from 'express';
const router = express.Router();
import {
    getGanadoMes, 
    getGastadoMes,
    getHistorial
} from '../controllers/transaccionesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

router.get('/ganado-mes/:userId', verifyToken, getGanadoMes)
router.get('/gastado-mes/:userId', verifyToken, getGastadoMes)
router.get('/historial/:userId', verifyToken, getHistorial)

export default router;