import sql from '../config/db.js'

export const getGanadoMes = async (req, res) => {
  const userId = req.params.userId
  const result = await sql`SELECT * FROM GetGanadoMes(${userId}) `
  res.json(result.recordset[0])
}

export const getGastadoMes = async (req, res) => {
  const userId = req.params.userId
  const result = await sql`SELECT * FROM GetGastadoMes( ${userId})`
  res.json(result.recordset[0])
}

export const getHistorial = async (req, res) => {
  const userId = req.params.userId
  const result = await sql`SELECT * FROM GetHistorialTransacciones ${userId}`
  res.json(result.recordset)
}
