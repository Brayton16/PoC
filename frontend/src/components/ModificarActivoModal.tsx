// components/EditarActivoModal.tsx
import React, { useState } from 'react'
import { api } from '../utils/api'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
  activo: {
    id: number
    nombre: string
    descripcion: string
    valor_monetario: number
  }
  onUpdated: () => void
}

export default function EditarActivoModal({ isOpen, onClose, activo, onUpdated }: Props) {
  const [form, setForm] = useState({
    nombre: activo.nombre,
    descripcion: activo.descripcion,
    valor_monetario: activo.valor_monetario
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/token/${activo.id}`, form)
      toast.success('Activo actualizado correctamente')
      onUpdated()
      onClose()
    } catch (error) {
      console.error('Error al actualizar activo:', error)
      toast.error('Error al actualizar activo')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4 text-center">Editar Activo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-neutral-800 text-black dark:text-white"
            placeholder="Nombre"
            required
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-neutral-800 text-black dark:text-white"
            placeholder="Descripción"
            required
          />
          <input
            type="number"
            name="valor_monetario"
            value={form.valor_monetario}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-neutral-800 text-black dark:text-white"
            placeholder="Valor monetario"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
