import React, { useState } from 'react'
import { api } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CrearActivo() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    valor_monetario: '',
  })

  const [imagenes, setImagenes] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImagenes(files)
    const previewUrls = files.map(file => URL.createObjectURL(file))
    setPreviews(previewUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()

    data.append('nombre', form.nombre)
    data.append('descripcion', form.descripcion)
    data.append('valor_monetario', form.valor_monetario)

    imagenes.forEach(img => {
      data.append('imagenes', img) 
    })

    try {
      await api.post('/token', data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('Activo creado con éxito')
      navigate('/activos')
    } catch (error) {
      console.error(error)
      toast.error('Hubo un error al crear el activo')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nuevo Activo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del activo"
          value={form.nombre}
          onChange={handleInputChange}
          className="w-full p-3 border rounded dark:bg-neutral-800 dark:text-white"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleInputChange}
          className="w-full p-3 border rounded dark:bg-neutral-800 dark:text-white"
          rows={4}
          required
        />
        <input
          type="number"
          name="valor_monetario"
          placeholder="Valor monetario"
          value={form.valor_monetario}
          onChange={handleInputChange}
          className="w-full p-3 border rounded dark:bg-neutral-800 dark:text-white"
          required
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full p-2"
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((src, i) => (
              <img key={i} src={src} alt={`preview ${i}`} className="w-full h-40 object-cover rounded" />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
        >
          Crear Activo
        </button>
      </form>
    </div>
  )
}
