import express from 'express'
import { actualizarUsuario, eliminarUsuario, obtenerUsuario } from '../controllers/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.put('/actualizar/:id', verifyToken, actualizarUsuario)
router.delete('/eliminar/:id', verifyToken, eliminarUsuario)
router.get('/:id', verifyToken, obtenerUsuario);

export default router