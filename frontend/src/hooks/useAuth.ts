// src/hooks/useAuth.ts
import { useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'

interface UserPayload {
  nombre: string
  correo: string
  // puedes añadir más campos según tu token
  exp: number
  iat: number
}

export const useAuth = () => {
  const token = localStorage.getItem('token')

  const user = useMemo(() => {
    if (!token) return null
    try {
      const decoded = jwtDecode<UserPayload>(token)
      return decoded
    } catch (error) {
      console.error('Token inválido:', error)
      return null
    }
  }, [token])

  return { user, token }
}
