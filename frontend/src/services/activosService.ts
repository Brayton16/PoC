// src/services/tokenService.ts
import { api } from '../utils/api'

export async function obtenerActivosDisponibles() {
  try {
    const response = await api.get('/token')
    return response.data
  } catch (error) {
    console.error('Error al obtener activos:', error)
    throw error
  }
}
