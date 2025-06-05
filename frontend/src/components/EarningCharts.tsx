
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const mockData = [
  { name: 'Hace 30 días', ganado: 450, gastado: 230 },
  { name: 'Hace 25 días', ganado: 600, gastado: 420 },
  { name: 'Hace 20 días', ganado: 500, gastado: 380 },
  { name: 'Hace 15 días', ganado: 850, gastado: 390 },
  { name: 'Hace 10 días', ganado: 900, gastado: 500 },
  { name: 'Hace 5 días', ganado: 700, gastado: 450 },
  { name: 'Hoy', ganado: 650, gastado: 300 },
]

const EarningsChart = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resumen últimos 30 días</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ganado" fill="#4ade80" name="Ganado" />
          <Bar dataKey="gastado" fill="#f87171" name="Gastado" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EarningsChart
