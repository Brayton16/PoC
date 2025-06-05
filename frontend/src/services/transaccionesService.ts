import { api } from '../utils/api.ts'

export const getUserActivos = async (usuarioId: number) => {
    const response = await api.get(`/token/creados/${usuarioId}`)
    return response.data
}

export const getUserTransacciones = async (usuarioId: number) => {
    const response = await api.get(`/token/invertidos/${usuarioId}`)
    return response.data
}