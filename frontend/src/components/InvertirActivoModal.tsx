// src/components/InvertirActivoModal.tsx
import React, { use, useState, useEffect } from 'react'
import { api } from '../utils/api'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
  activo: any
  onInvested: () => void
}

export default function InvertirActivoModal({ isOpen, onClose, activo, onInvested }: Props) {
  const [monto, setMonto] = useState('')
  const [wallet, setWallet] = useState<any>(null)

  useEffect(() => {
    const fetchWallet = async () => {
      const walletRes = await api.get(`/wallet/usuario/${activo.usuario_id}`)
      setWallet(walletRes.data)
    }
    if (activo && activo.usuario_id) {
      fetchWallet()
    }
  }, [activo])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!monto || Number(monto) <= 0) {
      return toast.error('Ingrese un monto válido')
    }
    if (Number(monto) > activo.valor) {
      return toast.error('El monto no puede ser mayor al valor del activo')
    }
    if (!wallet || wallet.valor_total < parseFloat(monto)) {
      return toast.error('Saldo insuficiente en la wallet')
    }
    try {
      await api.post('/inversiones', {
        activo_id: activo.id,
        monto_invertido: parseFloat(monto),
        fraccion: monto ? parseFloat(monto) / activo.valor : 0,
      })
      toast.success('Inversión realizada con éxito')
      onClose()
      onInvested()
    } catch (error) {
      console.error(error)
      toast.error('Error al realizar la inversión')
    }
  }

  if (!isOpen || !activo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center dark:text-white">Invertir en Activo</h2>

        {/* Información del activo */}
        <div className="mb-4">
          {Array.isArray(activo.imagen_url) && activo.imagen_url.length > 0 ? (
            <img
              src={`http://localhost:4000/uploads${activo.imagen_url[0].split('uploads')[1]}`}
              alt={activo.nombre}
              className="w-full h-40 object-cover rounded mb-2"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-500 rounded mb-2">
              Sin imagen
            </div>
          )}
          <h3 className="text-lg font-bold dark:text-white">{activo.nombre}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{activo.descripcion}</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Valor: ${Number(activo.valor).toLocaleString()}</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Monto a invertir (USD)"
            value={monto}
            onChange={e => setMonto(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-yellow-400 text-black rounded">Invertir</button>
          </div>
        </form>
      </div>
    </div>
  )
}
