// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Landing from '../pages/Landing'
import PrivateRoute from './PrivateRoute'
import Perfil from '../pages/Perfil'
import PrivateLayout from '../layouts/DashboardLayout'
import Activos from '../pages/Activos'
import CrearActivo from '../pages/CrearActivo'
import Simulacion from '../pages/Simulacion'
import BuscarActivos from '../pages/BuscarActivos'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/perfil', element: <Perfil /> },
          { path: '/activos', element: <Activos />},
          { path: '/activos/nuevo', element: <CrearActivo /> },
          { path: '/simulacion', element: <Simulacion/> }, 
          { path: '/buscar', element: <BuscarActivos /> },
        ],
      },
    ],
  },
  { path: '*', element: <Login /> },
])
