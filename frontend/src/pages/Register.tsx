import React, { useState } from 'react'
import { api } from '../utils/api.ts'
import background from '../assets/bg-login.png' // Asegúrate de tener esta imagen
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirm: ''
  })

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirm: '',
    general: ''
  })

  const validate = () => {
    const newErrors = {
      nombre: '',
      correo: '',
      password: '',
      confirm: '',
      general: ''
    }

    if (form.nombre.trim().length < 3) newErrors.nombre = 'El nombre debe tener al menos 3 caracteres'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) newErrors.correo = 'Correo inválido'
    if (form.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    if (form.password !== form.confirm) newErrors.confirm = 'Las contraseñas no coinciden'

    setErrors(newErrors)
    return Object.values(newErrors).every(e => e === '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
        await api.post('/auth/register', {
            nombre: form.nombre,
            correo: form.correo,
            password: form.password
        })
        toast.success('Registro exitoso', {
            position: 'top-right',
            autoClose: 3000
        })
    } catch (error) {
        setErrors({ ...errors, general: 'Error al registrar. Intenta de nuevo.' })
        toast.error('Error al registrar. Intenta de nuevo.', {
            position: 'top-right',
            autoClose: 3000
        })
        console.error('Error al registrar usuario:', error)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Crea una cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {['nombre', 'correo', 'password', 'confirm'].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field === 'confirm' ? 'Confirmar contraseña' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={
                  field === 'password' || field === 'confirm'
                    ? 'password'
                    : field === 'correo'
                    ? 'email'
                    : 'text'
                }
                placeholder={
                  field === 'password' || field === 'confirm'
                    ? '********'
                    : field === 'correo'
                    ? 'email@example.com'
                    : 'John Doe'
                }
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
              />
              {errors[field as keyof typeof errors] && (
                <p className="text-red-500 text-sm">{errors[field as keyof typeof errors]}</p>
              )}
            </div>
          ))}
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="underline hover:text-yellow-400">
                Inicia sesión
            </Link>
        </p>
      </div>
    </div>
  )
}
