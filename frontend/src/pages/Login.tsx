import React from 'react'
import background from '../assets/bg-login.png'
import { Link } from 'react-router-dom'
import { api } from '../utils/api.ts'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
    const [form, setForm] = useState({ correo: '', password: '' })
  const [errors, setErrors] = useState({ correo: '', password: '', general: '' })

  const validate = () => {
    const newErrors = { correo: '', password: '', general: '' }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) newErrors.correo = 'Correo inválido'
    if (!form.password) newErrors.password = 'Ingrese su contraseña'
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
        const res = await api.post('/auth/login', {
            correo: form.correo,
            password: form.password,
        })
        // Guarda el token en localStorage
        localStorage.setItem('token', res.data.token)
        toast.success('Inicio de sesión exitoso', {
            position: 'top-right',
            autoClose: 3000
        })
        window.location.href = '/dashboard'
    } catch (err) {
        console.error(err)
        setErrors({ ...errors, general: 'Credenciales inválidas' })
        toast.error('Error al iniciar sesión. Intenta de nuevo.', {
            position: 'top-right',
            autoClose: 3000
        })
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Inicia sesión a Macaflow
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {['correo', 'password'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field === 'correo' ? 'Correo' : 'Contraseña'}
              </label>
              <input
                id={field}
                name={field}
                type={field === 'password' ? 'password' : 'email'}
                placeholder={field === 'password' ? '********' : 'email@example.com'}
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
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta? <Link to="/register" className="underline hover:text-yellow-400">Registrate</Link>
        </p>
      </div>
    </div>
  )
}
