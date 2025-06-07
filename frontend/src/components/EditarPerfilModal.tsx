import React, { useState } from 'react'
import { api } from '../utils/api'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
  usuario: { id: number; nombre: string; correo: string }
}

export default function EditarPerfilModal({ isOpen, onClose, usuario }: Props) {
  const [form, setForm] = useState({ nombre: usuario.nombre, correo: usuario.correo, password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/usuarios/actualizar/${usuario.id}`, form)
      toast.success('Perfil actualizado correctamente')
      onClose()
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      toast.error('Error al actualizar perfil')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="Nombre"
          />
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="Correo"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            placeholder="Nueva contraseña (opcional)"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-yellow-400 text-black rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
