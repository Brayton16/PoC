import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  color?: string 
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-4 flex items-center space-x-4 w-full">
      <div className={`p-3 rounded-full ${color || 'bg-yellow-400'} text-black`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-xl font-semibold text-black dark:text-white">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
