import React, { createContext, useContext, useEffect, useState } from 'react'

type CurrencyContextType = {
  currency: string
  setCurrency: (value: string) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState(() => localStorage.getItem('currency') || 'USD')

  const setCurrency = (value: string) => {
    setCurrencyState(value)
    localStorage.setItem('currency', value)
  }

  useEffect(() => {
    const saved = localStorage.getItem('currency')
    if (saved) setCurrencyState(saved)
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider')
  return context
}
