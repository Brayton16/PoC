import React, { useState } from 'react'
import logo from '../assets/logo.png' // o .svg si es SVG
import { useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useCurrency } from '../context/CurrencyContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark'
    })

    const { currency, setCurrency } = useCurrency()

    const toggleTheme = () => {
        setDarkMode(prev => {
        const next = !prev
        localStorage.setItem('theme', next ? 'dark' : 'light')
        return next
        })
    }

    useEffect(() => {
        const html = document.documentElement
        if (darkMode) {
        html.classList.add('dark')
        } else {
        html.classList.remove('dark')
        }
    }, [darkMode])

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value)
    }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black text-gray-800 dark:text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
            <img src={logo} alt="Macaflow Logo" className="h-8 w-8 rounded-4xl" />
            <div className="text-xl font-bold">Macaflow</div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Selector de moneda */}
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="bg-gray-100 dark:bg-gray-800 text-sm rounded-md p-1.5"
          >
            <option value="USD">USD</option>
            <option value="CRC">CRC</option>
            <option value="EUR">EUR</option>
            <option value="MXN">MXN</option>
          </select>

          {/* Botón de tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Botones de login/signup */}
          <Link to={"/login"} className="px-3 py-1 text-sm bg-transparent border border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Inicia sesión
          </Link>
          <Link to={"/register"} className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800">
            Registrate
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
