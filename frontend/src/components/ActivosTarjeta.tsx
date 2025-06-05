import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import InvertirActivoModal from '../components/InvertirActivoModal' // Asegúrate de que la ruta esté bien

type ActivoProps = {
  id: number
  nombre: string
  descripcion: string
  valor: number
  imagenes: string[]
}

export default function ActivoCard({ id, nombre, descripcion, valor, imagenes }: ActivoProps) {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-6 w-full">
      {Array.isArray(imagenes) && imagenes.length > 0 ? (
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {imagenes.map((img, index) => {
            const relativePath = img.split('uploads')[1]
            const url = `http://localhost:4000/uploads${relativePath}`
            return (
              <div key={index}>
                <img
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="object-cover h-100 w-full rounded-md"
                />
              </div>
            )
          })}
        </Carousel>
      ) : (
        <div className="h-64 w-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center rounded-md text-gray-500">
          No hay imágenes disponibles
        </div>
      )}

      <h3 className="text-xl font-bold mt-4 dark:text-white">{nombre}</h3>
      <p className="text-gray-600 dark:text-gray-300">{descripcion}</p>
      <p className="mt-2 text-sm text-yellow-500 font-semibold">Valor: ${valor}</p>
      <button
        onClick={() => setModalAbierto(true)}
        className="mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md"
      >
        Invertir
      </button>

      {/* Modal de inversión */}
      <InvertirActivoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        activo={{
          id,
          nombre,
          descripcion,
          valor,
          imagen_url: imagenes,
        }}
        onInvested={() => {
          setModalAbierto(false)
          // Aquí podrías agregar lógica adicional, como actualizar el estado del componente padre
        }}
      />
    </div>
  )
}
