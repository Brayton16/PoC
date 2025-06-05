// src/components/dashboard/TransactionHistory.tsx
import React from 'react'

type Transaction = {
  id: number
  tipo: 'activo' | 'inversion'
  descripcion: string
  monto: number
  fecha: string
}

const mockTransactions: Transaction[] = [
  { id: 1, tipo: 'activo', descripcion: 'Venta de laptop', monto: 300, fecha: '2025-06-01' },
  { id: 2, tipo: 'activo', descripcion: 'Compra de escritorio', monto: -120, fecha: '2025-05-28' },
  { id: 3, tipo: 'inversion', descripcion: 'Interés ganado (ETF)', monto: 50, fecha: '2025-05-26' },
  { id: 4, tipo: 'inversion', descripcion: 'Compra de acciones', monto: -200, fecha: '2025-05-20' },
  { id: 5, tipo: 'activo', descripcion: 'Venta de silla', monto: 80, fecha: '2025-05-18' },
]

const TransactionHistory = () => {
  const activos = mockTransactions.filter(tx => tx.tipo === 'activo')
  const inversiones = mockTransactions.filter(tx => tx.tipo === 'inversion')

  const renderTransactions = (items: Transaction[]) => (
    <ul className="divide-y divide-gray-300 dark:divide-gray-700">
      {items.map((tx) => (
        <li key={tx.id} className="py-3 flex justify-between">
          <div>
            <p className="font-medium text-gray-800 dark:text-white">{tx.descripcion}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tx.fecha}</p>
          </div>
          <p className={`font-semibold ${tx.monto >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {tx.monto >= 0 ? '+' : '-'}₡{Math.abs(tx.monto).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl w-full h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Historial de Transacciones</h3>
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Activos</h4>
        {renderTransactions(activos)}
      </div>

      <div>
        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Inversiones</h4>
        {renderTransactions(inversiones)}
      </div>
    </div>
  )
}

export default TransactionHistory
