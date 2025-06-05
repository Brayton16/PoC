// utils/walletService.ts
import { api } from '../utils/api.ts'

export const getWalletBalance = async (usuarioId: number) => {
  const response = await api.get(`/wallet/valor/${usuarioId}`)
    console.log('Respuesta de getWalletBalance:', response.data)
  return response.data.valor_total
}

export const getGanadoMes = async (usuarioId: number) => {
    const response = await api.get(`/transacciones/ganado-mes/${usuarioId}`)
    console.log('Respuesta de getGanadoMes:', response.data)
    return response.data.ganado_mes
}
