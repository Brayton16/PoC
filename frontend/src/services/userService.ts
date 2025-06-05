import { api } from '../utils/api.ts'

export const getUserData = async (usuarioId: number) => {
  const response = await api.get(`/usuarios/${usuarioId}`)
  return response.data
}