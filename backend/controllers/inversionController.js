import sql from '../config/db.js';

export const crearInversion = async (req, res) => {
    const { activo_id, monto_invertido, fraccion } = req.body;
    const usuario_id = req.userId; 
    console.log('Datos de inversión:', { usuario_id, activo_id, monto_invertido, fraccion });
    try {
        const result = await sql`
            SELECT * FROM fn_crear_inversion(${usuario_id}, ${activo_id}, ${monto_invertido}, ${fraccion})
        `;
        res.status(201).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear inversión' });
    }
}

export const listarInversiones = async (req, res) => {
    const usuario_id = req.userId; 

    try {
        const result = await sql`
            SELECT * FROM fn_listar_inversiones_usuario(${usuario_id})
        `
        console.log('Inversiones del usuario:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al listar inversiones' });
    }
};

export const obtenerInversion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`
      SELECT * FROM fn_obtener_inversion_por_id(${id})
    `
    if (result.rowCount === 0) return res.status(404).json({ error: 'Inversión no encontrada' });
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener inversión' });
  }
};

export const actualizarInversion = async (req, res) => {
  const { id } = req.params;
  const { monto_invertido, fraccion } = req.body;

  const campos = [];
  const valores = [];

  if (monto_invertido !== null) {
    campos.push(`monto_invertido = $${campos.length + 1}`);
    valores.push(monto_invertido);
  }

  if (fraccion !== null) {
    campos.push(`fraccion = $${campos.length + 1}`);
    valores.push(fraccion);
  }

  if (campos.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
  }
  valores.push(id);

  const query = `
    UPDATE inversiones
    SET ${campos.join(', ')}
    WHERE id = $${valores.length};
  `;

  try {
    await sql.unsafe(query, valores);
    res.json({ mensaje: 'Inversión actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar inversión:', err);
    res.status(500).json({ error: 'Error al actualizar inversión' });
  }
};

export const eliminarInversion = async (req, res) => {
  const { id } = req.params;
  try {
    await sql`
      SELECT fn_eliminar_inversion(${id})
    `
    res.json({ mensaje: 'Inversión eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar inversión' });
  }
};
