// src/pages/Dashboard.tsx
import React, { useEffect, useState} from 'react'
import Sidebar from '../components/UserSidebar'
import Topbar from '../components/UserNavbar'
import TotalBalanceCard from '../components/TotalBalaceCard'
import StatCard from '../components/StatCard'
import { ArrowUp, ArrowDown, Repeat } from 'lucide-react'
import EarningsChart from '../components/EarningCharts'
import TransactionHistory from '../components/TransactionHistory'
import { useAuth } from '../hooks/useAuth'
import { getWalletBalance } from '../services/walletService'

export default function Dashboard() {
    //TODO: Implementar llamadas a la base que me devuelvan los valores para el resumen
    //TODO: Implementar historial de transacciones
    const [balanceTotal, setBalanceTotal] = useState<number | null>(null)
    const { user } = useAuth()

    useEffect(() => {
    const fetchBalance = async () => {
      try {
        const total = await getWalletBalance(user?.id)
        console.log('Valor total del wallet:', total)
        setBalanceTotal(total)
      } catch (err) {
        console.error('Error al obtener el valor total del wallet', err)
      }
    }

    fetchBalance()
  }, [user])
  return (
    <div className="min-h-screen flex w-full bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-white">
      {/* Main section */}
      <div className="flex-1 flex flex-col">
        {/* Contenido principal dividido en 2 columnas */}
        <main className="flex flex-row flex-1 w-full min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Overview */}
            <section className="flex-1 bg-gray-100 dark:bg-neutral-900 p-6 overflow-auto">
                <TotalBalanceCard balance= {balanceTotal !== null ? balanceTotal : 0} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard
                        title="Ganado este mes"
                        value="$1,250.00"
                        icon={<ArrowUp />}
                        color="bg-green-200"
                        />
                    <StatCard
                        title="Gastado este mes"
                        value="$830.00"
                        icon={<ArrowDown />}
                        color="bg-red-200"
                        />
                    <StatCard
                        title="Transacciones"
                        value="27"
                        icon={<Repeat />}
                        color="bg-blue-200"
                        />
                </div>
                <div className="mt-6">
                    <EarningsChart />
                </div>
            </section>

            {/* Transacciones */}
            <section className="w-[25%] bg-white dark:bg-neutral-800 p-6 overflow-y-auto border-gray-300 dark:border-neutral-700 ">
                <TransactionHistory />
            </section>
        </main>
      </div>
    </div>
  )
}
