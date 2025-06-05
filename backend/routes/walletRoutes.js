import express from 'express'
import { obtenerValorTotal, actualizarWallet } from '../controllers/walletController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/valor/:userId', verifyToken, obtenerValorTotal)
router.put('/actualizar/:id', verifyToken, actualizarWallet)

export default router