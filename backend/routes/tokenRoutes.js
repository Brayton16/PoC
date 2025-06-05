import express from 'express';
import { upload } from '../middleware/upload.js'; 
const router = express.Router();
import {
    crearActivo,
    listarActivos,
    obtenerActivo,
    actualizarActivo,
    eliminarActivo,
    obtenerActivosCreados,
    obtenerActivosInvertidos,
    buscarActivos
} from '../controllers/tokenController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/', verifyToken, upload.array('imagenes', 5), crearActivo);
router.get('/', verifyToken, listarActivos);
router.get('/creados/:id', verifyToken, obtenerActivosCreados)
router.get('/invertidos/:id', verifyToken, obtenerActivosInvertidos)
router.get('/buscar', verifyToken, buscarActivos);
router.get('/:id', verifyToken, obtenerActivo);
router.put('/:id', verifyToken, actualizarActivo);
router.delete('/:id', verifyToken, eliminarActivo);

export default router;