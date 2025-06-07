import sql from '../config/db.js'
import bcrypt from 'bcryptjs'

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, password } = req.body;

  const campos = [];
  const valores = [];

  if (nombre !== undefined && nombre !== null && nombre.trim() !== '') {
    campos.push(`nombre = $${campos.length + 1}`);
    valores.push(nombre);
  }

  if (correo !== undefined && correo !== null && correo.trim() !== '') {
    campos.push(`correo = $${campos.length + 1}`);
    valores.push(correo);
  }

  if (password !== undefined && password !== null && password.trim() !== '') {
    campos.push(`password = $${campos.length + 1}`);
    const hashedPassword = await bcrypt.hash(password, 10)
    valores.push(hashedPassword);
  }

  if (campos.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
  }

  valores.push(id); // Último valor es el ID

  const query = `
    UPDATE usuarios
    SET ${campos.join(', ')}
    WHERE id = $${valores.length};
  `;

  try {
    await sql.unsafe(query, valores);
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};


export async function eliminarUsuario(req, res) {
  const id = req.params.id

  try {
    await sql`
      SELECT fn_eliminar_usuario(${id})
    `
    res.json({ mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

export const obtenerUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await sql`
      SELECT * FROM fn_obtener_usuario(${id})
    `;
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
};