// utils/walletService.ts
import { api } from '../utils/api.ts'

export const getWalletBalance = async (usuarioId: number) => {
  const response = await api.get(`/wallet/valor/${usuarioId}`)
  return response.data.valor_total
}

export const getGanadoMes = async (usuarioId: number) => {
    const response = await api.get(`/transacciones/ganado-mes/${usuarioId}`)
    return response.data.ganado_mes
}
