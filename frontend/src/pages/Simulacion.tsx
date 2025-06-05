import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

export default function SimuladorInversion() {
  const [activoNombre, setActivoNombre] = useState('Activo Simulado')
  const [valorActivo, setValorActivo] = useState(10000)
  const [monto, setMonto] = useState(1000)
  const [plazo, setPlazo] = useState(1)
  const [unidadTiempo, setUnidadTiempo] = useState<'años' | 'meses'>('años')
  const [tasaAnual, setTasaAnual] = useState(8) // editable en porcentaje

  const fraccion = (monto / valorActivo) * 100
  const meses = unidadTiempo === 'años' ? plazo * 12 : plazo
  const tasaDecimal = tasaAnual / 100

  const proyeccion = Array.from({ length: meses + 1 }, (_, i) => {
    const t = i / 12
    return monto * Math.pow(1 + tasaDecimal, t)
  })

  const chartData = {
    labels: proyeccion.map((_, i) => unidadTiempo === 'años' ? (i / 12).toFixed(1) + ' años' : i + ' meses'),
    datasets: [
      {
        label: 'Proyección de Inversión',
        data: proyeccion.map(v => Number(v.toFixed(2))),
        fill: false,
        borderColor: '#facc15',
        tension: 0.2,
      },
    ],
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Simulador de Inversión</h2>

      <div className="space-y-4">
        {/* Nombre del activo */}
        <div>
          <label className="block text-sm mb-1 dark:text-white">Nombre del activo:</label>
          <input
            type="text"
            value={activoNombre}
            onChange={e => setActivoNombre(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Valor del activo */}
        <div>
          <label className="block text-sm mb-1 dark:text-white">Valor total del activo ($):</label>
          <input
            type="number"
            value={valorActivo}
            onChange={e => setValorActivo(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Monto a invertir */}
        <div>
          <label className="block text-sm mb-1 dark:text-white">Monto a invertir ($):</label>
          <input
            type="number"
            value={monto}
            onChange={e => setMonto(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Plazo e intervalo */}
        <div>
          <label className="block text-sm mb-1 dark:text-white">Plazo de inversión:</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={plazo}
              onChange={e => setPlazo(Number(e.target.value))}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
            <select
              value={unidadTiempo}
              onChange={e => setUnidadTiempo(e.target.value as 'años' | 'meses')}
              className="p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="años">Años</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>

        {/* Tasa editable */}
        <div>
          <label className="block text-sm mb-1 dark:text-white">Tasa anual estimada (%):</label>
          <input
            type="number"
            value={tasaAnual}
            step={0.1}
            onChange={e => setTasaAnual(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        {/* Resultados */}
        <div className="mt-4">
          <p className="text-sm dark:text-white">
            Fracción adquirida del activo: <strong>{fraccion.toFixed(2)}%</strong>
          </p>
          <p className="text-sm dark:text-white">
            Rentabilidad estimada en {plazo} {unidadTiempo} a una tasa de {tasaAnual.toFixed(1)}%
          </p>
        </div>

        {/* Gráfico */}
        <div className="mt-6">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  )
}
