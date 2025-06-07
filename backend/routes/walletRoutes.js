import express from 'express'
import { obtenerValorTotal, actualizarWallet, insertarWallet, obtenerWalletPorUsuario} from '../controllers/walletController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/valor/:userId', verifyToken, obtenerValorTotal)
router.put('/actualizar/:id', verifyToken, actualizarWallet)
router.post('/crear', verifyToken, insertarWallet)
router.get('/usuario/:userId', verifyToken, obtenerWalletPorUsuario)
export default router