
# Plataforma de Tokenización de Activos

Este proyecto es una **plataforma web educativa** para simular la **tokenización e inversión en activos del mundo real**. Los usuarios pueden explorar activos, ver imágenes, realizar simulaciones, invertir con su wallet y visualizar estadísticas.

---

## Tecnologías utilizadas

- **Frontend:** React + Tailwind CSS + Chart.js + React Responsive Carousel
- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **ORM/Query:** PostgreSQL nativo (`postgres.js`)
- **Autenticación:** JWT
- **Carga de imágenes:** `multer`
- **Otros:** `react-toastify`, `react-chartjs-2`, `react-router-dom`

---

## Estructura del proyecto

```
PoC/
│
├── backend/                     # Servidor Express con PostgreSQL
|   ├── config/                  # Conexión de base de datos y manejo de archivos
│   ├── controllers/             # Lógica para usuarios, activos, inversiones
│   ├── middleware/              # Middleware para autenticación JWT
│   ├── routes/                  # Rutas de la API
│   ├── uploads/                 # Carpeta donde se almacenan las imágenes
│   └── index.js                 # Punto de entrada del servidor
│
├── frontend/                    # Proyecto en React
│   ├── src/
│   │   ├── assets/              # Imágenes del proyecto
│   │   ├── context/             # Se utilizaría para manejo de varias monedas
│   │   ├── hooks/               # Maneja la autorización del JWT dentro del frontend
│   │   ├── layout/              # Se manejan layouts para las pantallas de cliente y las demás.
│   │   ├── router/              # Maneja las rutas de las pantallas.
│   │   ├── services/            # Realiza algunos llamados a la API.
│   │   ├── components/          # Componentes reutilizables (cards, modals, formularios)
│   │   ├── pages/               # Páginas principales (Inicio, Perfil, Activos, Simulaciones)
│   │   ├── utils/               # Funciones auxiliares (api.js)
│   │   └── App.tsx              # Enrutamiento principal
│   ├── public/
│   └── vite.config.ts           # Configuración de Vite
│   └── tailwind.config.js       # Configuración de Tailwind
│   └── index.html               # Index que monta el proyecto
│
└── README.md                    # Este archivo
```

---

## Instalación y ejecución

### Requisitos previos

- Node.js y npm
- PostgreSQL


---

### Backend

```bash
cd backend
npm install
npm run dev
```

> El servidor correrá por defecto en `http://localhost:4000`

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> La app React correrá por defecto en `http://localhost:5173`

---

## Autenticación

- El sistema usa JWT.
- Al iniciar sesión, se guarda el token en `localStorage`.
- Se incluye `verifyToken` como middleware para proteger rutas.

---

## Funcionalidades principales

- ✅ Registro e inicio de sesión
- 📷 Carga de imágenes por activo
- 📊 Simulación de inversión, fracción y portafolio
- 💳 Wallet funcional con saldo e inversiones
- 🗃️ Panel de administración de activos
- 🔎 Buscador en navbar

---

## Librerías clave usadas

```bash
# Backend
npm install express cors multer jsonwebtoken postgres dotenv

# Frontend
npm install react-toastify react-router-dom react-chartjs-2 chart.js
npm install react-responsive-carousel
```

---

## Autor

Desarrollado por **grupo 1** como parte del curso de Administración de Proyectos en el Instituto Tecnológico de Costa Rica.


