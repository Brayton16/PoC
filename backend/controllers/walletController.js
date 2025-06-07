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
  const userId = req.userId;
  const { nombre, direccion_publica, proveedor, valor_total } = req.body;

  const campos = [];
  const valores = [];

  if (nombre !== undefined && nombre.trim() !== '') {
    campos.push(`nombre = $${campos.length + 1}`);
    valores.push(nombre);
  }

  if (direccion_publica !== undefined && direccion_publica.trim() !== '') {
    campos.push(`direccion_publica = $${campos.length + 1}`);
    valores.push(direccion_publica);
  }

  if (proveedor !== undefined && proveedor.trim() !== '') {
    campos.push(`proveedor = $${campos.length + 1}`);
    valores.push(proveedor);
  }

  if (valor_total !== undefined && !isNaN(valor_total)) {
    campos.push(`valor_total = $${campos.length + 1}`);
    valores.push(valor_total);
  }

  if (campos.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
  }

  valores.push(userId); // último parámetro para WHERE

  const query = `
    UPDATE wallets
    SET ${campos.join(', ')}
    WHERE usuario_id = $${valores.length};
  `;

  try {
    await sql.unsafe(query, valores);
    res.json({ mensaje: 'Wallet actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar wallet:', error);
    res.status(500).json({ error: 'Error al actualizar wallet' });
  }
};



export const insertarWallet = async (req, res) => {
  const { direccion_publica, proveedor, valor_total } = req.body
  const userId = req.userId
  try {
    await sql`
      SELECT fn_crear_wallet(
        ${userId},
        ${direccion_publica},
        ${proveedor},
        ${valor_total}
      )
    `
    res.json({ mensaje: 'Wallet insertada correctamente' })
  } catch (error) {
    console.error('Error al insertar wallet:', error)
    res.status(500).json({ error: 'Error al insertar wallet' })
  }
}

export const obtenerWalletPorUsuario = async (req, res) => {
  const userId = req.params.userId

  try {
    const result = await sql`
      SELECT * FROM wallets WHERE usuario_id = ${userId}
    `
    if (result.length === 0) {
      return res.status(404).json({ error: 'Wallet no encontrada' })
    }
    res.json(result[0])
  } catch (error) {
    console.error('Error al obtener wallet por usuario:', error)
    res.status(500).json({ error: 'Error al obtener wallet por usuario' })
  }
}