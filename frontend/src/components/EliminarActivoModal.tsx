// components/EliminarActivoModal.tsx
import React from 'react'
import { api } from '../utils/api'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
  activoId: number
  onDeleted: () => void
}

export default function EliminarActivoModal({ isOpen, onClose, activoId, onDeleted }: Props) {
  if (!isOpen) return null

  const handleDelete = async () => {
    try {
      await api.delete(`/token/${activoId}`)
      toast.success('Activo eliminado correctamente')
      onDeleted()
      onClose()
    } catch (error) {
      console.error('Error al eliminar el activo:', error)
      toast.error('Error al eliminar el activo')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4 text-center">¿Eliminar activo?</h2>
        <p className="text-center mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            Cancelar
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
