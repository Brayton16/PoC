import express from 'express';
const router = express.Router();
import {
    crearInversion, 
    listarInversiones, 
    obtenerInversion, 
    actualizarInversion, 
    eliminarInversion
} from '../controllers/inversionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/', verifyToken, crearInversion);
router.get('/', verifyToken, listarInversiones);
router.get('/:id', verifyToken, obtenerInversion);
router.put('/:id', verifyToken, actualizarInversion);
router.delete('/:id', verifyToken, eliminarInversion);

export default router;