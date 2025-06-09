
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

### ✅ Registro e inicio de sesión
  
  Este módulo gestiona el proceso de registro e inicio de sesión de usuarios. Garantiza la confidencialidad de credenciales y permite la autenticación mediante tokens JWT. Está diseñado para operar en conjunto con funciones almacenadas en base de datos (PostgreSQL o similar).
  
  **Registro**
  La funcionalidad de registro permite a un nuevo usuario crear una cuenta en el sistema. Para ello, el usuario debe proporcionar un nombre, correo electrónico y una contraseña. Esta operación realiza las siguientes acciones:

  1. Recepción de datos del usuario desde el cuerpo de la solicitud HTTP (nombre, correo, password).
  2. Encriptación segura de la contraseña utilizando el algoritmo bcrypt con un factor de salt de 10 rondas.
  3. Invocación de una función almacenada en la base de datos `fn_registrar_usuario` que se encarga de persistir al usuario, utilizando los valores proporcionados.
  4. Respuesta al cliente con el resultado devuelto por la base de datos, indicando que el usuario ha sido creado exitosamente.

  **Login**
  La funcionalidad de inicio de sesión autentica a un usuario mediante sus credenciales. Si las credenciales son válidas, se emite un token JWT que permite sesiones autenticadas. El proceso consiste en:

  1. Recepción de las credenciales del usuario (correo, password) desde la solicitud.
  2. Consulta en la base de datos mediante una función almacenada `fn_login_usuario` para obtener los datos asociados al correo electrónico ingresado.
  3. Verificación de la contraseña mediante comparación de la contraseña ingresada y la contraseña encriptada almacenada, utilizando bcrypt.
  4. Generación de un token JWT si las credenciales son correctas. Este token contiene el ID y el nombre del usuario, y tiene una vigencia de 24 horas.
  5. Respuesta al cliente con el token y datos básicos del usuario, que pueden ser utilizados por el frontend para mantener una sesión activa.

### 📷 CRUD de activos

Este módulo permite realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre "activos tokenizados". Está diseñado para permitir a los usuarios crear representaciones digitales de activos, los cuales pueden incluir imágenes y detalles monetarios. También ofrece funcionalidades de búsqueda, filtrado por usuario y recuperación de activos asociados a inversiones.

1. Creación de Activo (crearActivo)

Descripción:
Permite a un usuario autenticado registrar un nuevo activo digital en el sistema.

Parámetros esperados (cuerpo de la solicitud):

- nombre: Nombre del activo.
- descripcion: Descripción textual del activo.
- valor_monetario: Valor económico asociado.
- imagen_url: Arreglo de rutas de imágenes subidas.
- creado_por: ID del usuario autenticado .

Se procesan las imágenes del request. Se llama a la función SQL `fn_crear_activo_tokenizado()`. Y se retorna el activo creado con código `201`.

2. Listado de Todos los Activos (listarActivos)
Recupera todos los activos tokenizados disponibles en la plataforma.

- Invoca la función almacenada `fn_listar_activos_tokenizados`.
- Devuelve un listado completo.
  
3. Obtención de Activo por ID (obtenerActivo)
Devuelve los detalles de un activo específico a partir de su identificador único.
- Se llama a fn_obtener_activo_por_id(id).
- Si el activo no existe, se responde con 404.
- Si existe, se devuelve con estado 200.

4. Actualización de Activo (actualizarActivo)
Permite a un usuario modificar un activo que él mismo ha creado.
- Se construye dinámicamente una sentencia UPDATE en SQL según los campos provistos.
- Solo el creador original del activo puede modificarlo.
- Se retorna el activo actualizado.

5. Eliminación de Activo (eliminarActivo)
Permite eliminar un activo por su ID.
- Llama a fn_eliminar_activo(id).
- Devuelve mensaje de confirmación.

6. Obtener Activos Creados por Usuario (obtenerActivosCreados)
Lista todos los activos creados por un usuario específico.
- Se invoca `fn_activos_por_usuario(id)`.
- Se retorna el conjunto de activos creados por dicho usuario.

7. Obtener Activos con Inversión de Usuario `obtenerActivosInvertidos`
Devuelve los activos en los que el usuario ha realizado inversiones.

Llama a la función `fn_activos_invertidos_por_usuario(id)`.

8. Buscar Activos por Nombre (buscarActivos)
Realiza una búsqueda textual sobre los nombres de los activos registrados.
- Consulta la tabla `activos_tokenizados` usando LIKE sobre el campo nombre, haciendo una comparación insensible a mayúsculas (LOWER).
- Devuelve una lista filtrada por coincidencia parcial.

### 📊 Simulación de inversión, fracción y portafolio
1. Crear Inversión (crearInversion)
Permite al usuario invertir en un activo existente, especificando el monto y la fracción correspondiente del activo.
- Se invoca la función `fn_crear_inversion()` desde la base de datos.
- Se retorna la inversión registrada con estado HTTP `201` Created.

2. Listar Inversiones del Usuario (listarInversiones)
Recupera todas las inversiones realizadas por el usuario autenticado. Se utiliza para mostrar el portafolio de inversiones de un usuario.
- Se llama a `fn_listar_inversiones_usuario()`.
- Se devuelve un arreglo con las inversiones propias.

3. Obtener Inversión por ID (obtenerInversion)
Devuelve los detalles de una inversión específica, usando su ID.
- Se llama a `fn_obtener_inversion_por_id()`.
- Si no existe, retorna `404`. En caso contrario, retorna los datos de la inversión.

4. Actualizar Inversión
Permite modificar los valores monetarios o proporcionales de una inversión existente.
- Se construye dinámicamente una sentencia UPDATE SQL según los campos enviados.
- Si no se envían campos válidos, retorna `400`.
- Aplica los cambios y responde con un mensaje de éxito.

5. Eliminar Inversión (eliminarInversion)
Elimina una inversión a partir de su ID.
- Se invoca la función almacenada fn_eliminar_inversion(...).
- Se devuelve un mensaje de confirmación.
    
### 💳 Wallet funcional con saldo e inversiones
### 🗃️ Panel de administración de activos
### 🔎 Buscador en navbar

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


