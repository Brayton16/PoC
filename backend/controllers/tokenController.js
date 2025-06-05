import sql from '../config/db.js'


export const crearActivo = async (req, res) => {
  const { nombre, descripcion, valor_monetario } = req.body
  const creado_por = req.userId

  const imagen_url = Array.isArray(req.files)
  ? req.files.map(file => file.path)
  : []


  try {
    const result = await sql`
      SELECT * FROM fn_crear_activo_tokenizado(${nombre}, ${descripcion}, ${valor_monetario}, ${imagen_url}, ${creado_por})
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear activo' })
  }
}

export const listarActivos = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM fn_listar_activos_tokenizados()`
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al listar activos' })
  }
}

export const obtenerActivo = async (req, res) => {
  const { id } = req.params
  try {
    const result = await sql`SELECT * FROM fn_obtener_activo_por_id(${id})`
    if (result.length === 0) return res.status(404).json({ error: 'Activo no encontrado' })
    res.json(result[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener activo' })
  }
}


export const actualizarActivo = async (req, res) => {
  const { id } = req.params;
  const creado_por = req.userId;

  const updates = [];
  const values = [];

  if (req.body.nombre) {
    updates.push(`nombre = $${updates.length + 1}`);
    values.push(req.body.nombre);
  }

  if (req.body.descripcion) {
    updates.push(`descripcion = $${updates.length + 1}`);
    values.push(req.body.descripcion);
  }

  if (req.body.valor_monetario) {
    updates.push(`valor_monetario = $${updates.length + 1}`);
    values.push(req.body.valor_monetario);
  }

  if (req.files && req.files.length > 0) {
    const imagenes = req.files.map(file => file.path);
    updates.push(`imagen_url = $${updates.length + 1}`);
    values.push(imagenes); 
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No hay campos para actualizar' });
  }

  const query = `
    UPDATE activos_tokenizados
    SET ${updates.join(', ')}
    WHERE id = $${updates.length + 1} AND creado_por = $${updates.length + 2}
    RETURNING *;
  `;

  values.push(id, creado_por);

  try {
    const result = await sql.unsafe(query, values);
    res.json(result[0]);
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({ error: 'Error al actualizar el activo' });
  }
};


export const eliminarActivo = async (req, res) => {
  const { id } = req.params
  try {
    await sql`SELECT fn_eliminar_activo(${id})`
    res.json({ mensaje: 'Activo eliminado correctamente' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al eliminar activo' })
  }
}

export const obtenerActivosCreados = async (req, res) => {
  const userId = req.params.id
  try {
    const result = await sql`
      SELECT * FROM fn_activos_por_usuario(${userId})
    `
    res.json(result)
  } catch (error) {
    console.error('Error al obtener activos creados:', error)
    res.status(500).json({ error: 'Error al obtener activos creados por el usuario' })
  }
}

export const obtenerActivosInvertidos = async (req, res) => {
  const userId = req.params.id
  try {
    const result = await sql`
      SELECT * FROM fn_activos_invertidos_por_usuario(${userId})
    `
    res.json(result)
  } catch (error) {
    console.error('Error al obtener activos invertidos:', error)
    res.status(500).json({ error: 'Error al obtener activos con inversiones del usuario' })
  }
}

export const buscarActivos = async (req, res) => {
  const q = req.query.q?.toString().toLowerCase() || ''
  try {
    const result = await sql`
      SELECT * FROM activos_tokenizados WHERE LOWER(nombre) LIKE ${'%' + q + '%'}
    `
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al buscar activos' })
  }
}
