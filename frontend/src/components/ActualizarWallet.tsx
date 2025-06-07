// src/components/EditarWalletModal.tsx
import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
  onUpdated: () => void
  wallet: {
    id: number
    direccion_publica: string
    proveedor: string
    valor_total: number
  }
}

export default function EditarWalletModal({ isOpen, onClose, onUpdated, wallet }: Props) {
  const [form, setForm] = useState({
    direccion_publica: '',
    proveedor: '',
    valor_total: ''
  })

  useEffect(() => {
    if (wallet) {
      setForm({
        direccion_publica: wallet.direccion_publica,
        proveedor: wallet.proveedor,
        valor_total: wallet.valor_total.toString()
      })
    }
  }, [wallet])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/wallet/actualizar/${wallet.id}`, {
        direccion_publica: form.direccion_publica,
        proveedor: form.proveedor,
        valor_total: parseFloat(form.valor_total)
      })
      toast.success('Wallet actualizada correctamente')
      onUpdated()
      onClose()
    } catch (error) {
      console.error('Error al actualizar wallet:', error)
      toast.error('Error al actualizar wallet')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Editar Wallet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Dirección Pública
          </label>
          <input
            type="text"
            name="direccion_publica"
            placeholder="Dirección pública"
            value={form.direccion_publica}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Proveedor
          </label>
          <input
            type="text"
            name="proveedor"
            placeholder="Proveedor"
            value={form.proveedor}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Valor Total (en USD)
          </label>
          <input
            type="number"
            name="valor_total"
            placeholder="Valor total"
            value={form.valor_total}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
