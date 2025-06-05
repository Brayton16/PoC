import React from 'react'
import bgHero from '../assets/bg-hero.jpeg'
import pm from '../assets/pm.png'
import sim from '../assets/sim.png'
import sec from '../assets/sec.png'
import { Link } from 'react-router-dom'
export default function Landing() {
  return (
    <div className="bg-white dark:bg-black text-gray-800 dark:text-white">
      {/* Hero Section */}
    <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: `url(${bgHero})` }}
        >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 bg-opacity-10 z-0"></div>

        {/* Contenido */}
        <div className="relative z-10 text-white">
            <h1 className="text-5xl font-extrabold mb-4">Macaflow</h1>
            <p className="text-xl mb-6 max-w-xl mx-auto">
            El mejor aliado para tus inversiones, con transparencia y poder.
            </p>
            <Link to={'/register'} className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
            Empecemos
            </Link>
        </div>
    </section>


      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-neutral-900">
        <h2 className="text-3xl font-bold text-center mb-10">¿Qué ofrece nuestra herramienta?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Manejo de portafolios"
            description="Visualiza y organiza tus activos tokenizados de manera eficiente."
            image={pm}
          />
          <FeatureCard
            title="Herramientas de simulación"
            description="Prueba tus escenarios y pronostica tus resultados de inversión."
            image={sim}
          />
          <FeatureCard
            title="Secure Transactions"
            description="Maneja y rastrea transacciones con total seguridad y transparencia."
            image={sec}
          />
        </div>
      </section>
    </div>
  )
}

type CardProps = {
  title: string
  description: string
  image: string
}

function FeatureCard({ title, description, image }: CardProps) {
  return (
    <div className="bg-white dark:bg-black shadow-md rounded-lg p-6 text-center">
      <img src={image} alt={title} className="h-32 mx-auto mb-4 object-contain" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
