import React from 'react'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* Logo + nombre */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Macaflow logo" className="h-10" />
          <span className="text-lg font-semibold text-gray-800 dark:text-white">Macaflow</span>
        </div>

        {/* Producto */}
        <div>
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Producto</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">¿Qué es Macaflow?</a></li>
            <li><a href="#" className="hover:underline">Características</a></li>
            <li><a href="#" className="hover:underline">Seguridad</a></li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Recursos</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Documentación</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Legal</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            <li><a href="#" className="hover:underline">Política de privacidad</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        <p>© 2025 Macaflow. Todos los derechos reservados.</p>
        <p>Desarrollado como prueba de concepto para proyectos educativos.</p>
      </div>
    </footer>
  )
}
