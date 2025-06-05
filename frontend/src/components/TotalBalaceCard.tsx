import React from 'react'

interface TotalBalanceCardProps {
  balance: number
}

const TotalBalanceCard: React.FC<TotalBalanceCardProps> = ({ balance }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6 mb-6 w-full">
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Valor total</h3>
      <p className="text-5xl font-bold text-black dark:text-white">${balance}</p>
    </div>
  )
}

export default TotalBalanceCard
