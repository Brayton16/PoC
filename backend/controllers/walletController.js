import sql from '../config/db.js'

export const obtenerValorTotal = async (req, res) => {
  const userId = req.params.userId 

  try {
    const result = await sql`
      SELECT valor_total FROM wallets WHERE usuario_id = ${userId}
    `
    if (result.length === 0) {
      return res.status(404).json({ error: 'Wallet no encontrada' })
    }
    res.json({ valor_total: result[0].valor_total })
  } catch (error) {
    console.error('Error al obtener valor total:', error)
    res.status(500).json({ error: 'Error al obtener valor total' })
  }
}

export const actualizarWallet = async (req, res) => {
  const userId = req.userId
  const { valor_total } = req.body

  try {
    await sql`
      UPDATE wallets SET valor_total = ${valor_total} WHERE usuario_id = ${userId}
    `
    res.json({ mensaje: 'Wallet actualizada correctamente' })
  } catch (error) {
    console.error('Error al actualizar wallet:', error)
    res.status(500).json({ error: 'Error al actualizar wallet' })
  }
}
