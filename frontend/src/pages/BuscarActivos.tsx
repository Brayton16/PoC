import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import ActivoCard from '../components/ActivosTarjeta'

export default function BuscarActivos() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await api.get(`/token/buscar?q=${query}`)
        setResultados(res.data)
      } catch (error) {
        console.error('Error en búsqueda:', error)
      }
    }

    if (query.trim()) buscar()
  }, [query])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4 dark:text-white">Resultados para: "{query}"</h1>
      {resultados.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No se encontraron activos.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {resultados.map((a: any) => (
            <ActivoCard
              key={a.id}
              id={a.id}
              nombre={a.nombre}
              descripcion={a.descripcion}
              valor={a.valor_monetario}
              imagenes={a.imagen_url}
            />
          ))}
        </div>
      )}
    </div>
  )
}
