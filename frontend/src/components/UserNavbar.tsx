import React from 'react';
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Topbar() {
    const { user } = useAuth()
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })
    const toggleTheme = () => {
        setDarkMode(prev => {
        const next = !prev
        localStorage.setItem('theme', next ? 'dark' : 'light')
        return next
        })
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    useEffect(() => {
        const html = document.documentElement
        if (darkMode) {
        html.classList.add('dark')
        } else {
        html.classList.remove('dark')
        }
    }, [darkMode])

    const [busqueda, setBusqueda] = useState('')
    const navigate = useNavigate()
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (busqueda.trim() !== '') {
        navigate(`/buscar?q=${encodeURIComponent(busqueda.trim())}`)
        }
    }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-900 shadow-md w-full">
        <Link to='/Dashboard' className="flex items-center justify-center gap-4 ">
            <img
                src={logo}
                alt="Macaflow Logo"
                className="h-10 w-auto object-contain rounded-4xl"
            />
            <h2 className="text-xl font-bold">Macaflow</h2>
        </Link>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
            type="text"
            placeholder="Buscar activos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-neutral-700 text-black dark:text-white"
            />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md">
            Buscar
            </button>
        </form>
        <div className="flex items-center gap-3">
            <button
                onClick={toggleTheme}
                className="mx-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
                >
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <img
            src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Macario"
            alt="avatar"
            className="h-8 w-8 rounded-full"
            />
            <Link to='/Perfil' className="font-semibold text-gray-700 dark:text-gray-200">{user?.nombre || 'Usuario'}</Link>
            <button onClick={() => cerrarSesion()} className='bg-yellow-400 bg-yellow-500 text-black px-3 py-1 rounded'>Cerrar sesión</button>
        </div>
    </header>
  );
}
