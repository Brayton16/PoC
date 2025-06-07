import React, { useEffect, useState } from 'react'
import { obtenerActivosDisponibles } from '../services/activosService'
import ActivoCard from '../components/ActivosTarjeta'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
interface Activo {
  id: number;
  nombre: string;
  descripcion: string;
  valor_monetario: number;
  imagen_url: string[];
}

export default function Activos() {
  const [activos, setActivos] = useState([])

  useEffect(() => {
    const fetchActivos = async () => {
      try {
        const data = await obtenerActivosDisponibles()
        setActivos(data)
      } catch (err) {
        console.error('Error cargando los activos')
      }
    }

    fetchActivos()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Descubre Activos para Invertir</h1>
      {activos.map((activo: Activo) => (
        <ActivoCard
          key={activo.id}
          id={activo.id}
          nombre={activo.nombre}
          descripcion={activo.descripcion}
          valor={activo.valor_monetario}
          imagenes={activo.imagen_url}
        />
      ))}
        <Link
            to="/activos/nuevo" // ajusta la ruta según tu flujo
            className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black text-3xl rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition"
            title="Agregar nuevo activo"
        >
            <Plus className="w-8 h-8" />
        </Link>

    </div>
  )
}
