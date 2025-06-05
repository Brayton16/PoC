import sql from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { nombre, correo, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await sql`
      SELECT * FROM fn_registrar_usuario(${nombre}, ${correo}, ${hashedPassword})
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
}

export const login = async (req, res) => {
  const { correo, password } = req.body

  try {
    const result = await sql`
      SELECT * FROM fn_login_usuario(${correo})
    `
    if (result.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const user = result[0]
    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const token = jwt.sign({ id: user.id, nombre:user.nombre }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, nombre: user.nombre, id: user.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}
