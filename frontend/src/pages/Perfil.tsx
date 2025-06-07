import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import EditarPerfilModal from '../components/EditarPerfilModal';
import EliminarCuentaModal from '../components/EliminarCuentaModal';
import { getUserData } from '../services/userService';
import { getUserActivos, getUserTransacciones } from '../services/transaccionesService';
import { toast } from 'react-toastify';
import EliminarActivoModal from '../components/EliminarActivoModal';
import EditarActivoModal from '../components/ModificarActivoModal';
import EditarWalletModal from '../components/ActualizarWallet';

const Perfil = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({ id: 0, nombre: '', correo: '', password: '' });
  const [activos, setActivos] = useState([]);
  const [inversiones, setInversiones] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activoIdEliminar, setActivoIdEliminar] = useState<number | null>(null);
  const [activoEditar, setActivoEditar] = useState<any | null>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletEditar, setWalletEditar] = useState<any | null>(null);

  const handleEditarActivo = (activo: any) => {
    setActivoEditar(activo);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const resUserData = await getUserData(user.id);
          setUserData(resUserData);
          const resActivos = await getUserActivos(user.id);
          setActivos(resActivos);
          const resInversiones = await getUserTransacciones(user.id);
          setInversiones(resInversiones);
          const resWallets = await api.get(`/wallet/usuario/${user.id}`);
          setWallets(resWallets.data);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Perfil Header */}
      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6 text-center relative">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 dark:bg-neutral-700" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userData.nombre}</h2>
        <p className="text-gray-500 dark:text-gray-400">Correo: {userData.correo}</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setEditModalOpen(true)}
            className="px-4 py-2 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black rounded-md"
          >
            Editar Perfil
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Eliminar Cuenta
          </button>
          <button
            onClick={() => setWalletEditar(true)}
            className="px-4 py-2 text-sm font-medium bg-black hover:bg-yellow-400 hover:text-black text-yellow-400 rounded-md"
          >
            Editar Wallet
          </button>
        </div>
      </div>

      {/* Activos Propios */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Mis Activos</h3>
        <div className="overflow-x-auto flex space-x-4 pb-2">
          {activos.map((activo: any) => (
            <div
              key={activo.id}
              className="w-72 bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
            >
              {/* Imagen */}
              {Array.isArray(activo.imagen_url) && activo.imagen_url.length > 0 ? (
                <img
                  src={`http://localhost:4000/uploads${activo.imagen_url[0].split('uploads')[1]}`}
                  alt={activo.nombre}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-500 italic">
                  Imagen no disponible
                </div>
              )}

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-bold mb-1 dark:text-white">{activo.nombre}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{activo.descripcion}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-4">
                  <span className="font-semibold">Valor:</span> ${Number(activo.valor_monetario).toLocaleString()}
                </p>

                {/* Botones */}
                <div className="flex justify-between mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleEditarActivo(activo)}
                    className="w-[48%] px-2 py-1 bg-yellow-400 text-black text-sm rounded hover:bg-yellow-500"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => setActivoIdEliminar(activo.id)}
                    className="w-[48%] px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inversiones */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Mis Inversiones</h3>
        <div className="overflow-x-auto flex space-x-4 pb-2">
          {inversiones.map((inv: any) => (
            <div
              key={inv.activo_id}
              className="min-w-[250px] bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
            >
              {/* Imagen del activo */}
              {Array.isArray(inv.imagen_url) && inv.imagen_url.length > 0 ? (
                <img
                  src={`http://localhost:4000/uploads${inv.imagen_url[0].split('uploads')[1]}`}
                  alt={inv.nombre}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}

              {/* Contenido */}
              <div className="p-4">
                <h4 className="text-lg font-bold mb-1 dark:text-white">{inv.nombre}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{inv.descripcion}</p>
                <p className="text-sm text-gray-800 dark:text-gray-300">
                  Inversión: ${Number(inv.monto_invertido).toLocaleString()}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-300">
                  Fracción: {(inv.fraccion * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EditarPerfilModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} usuario={userData} />
      <EliminarCuentaModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} userId={user?.id} />
      <EliminarActivoModal
        isOpen={activoIdEliminar !== null}
        onClose={() => setActivoIdEliminar(null)}
        activoId={activoIdEliminar!}
        onDeleted={() => {
          setActivoIdEliminar(null);
          toast.success('Activo eliminado correctamente');
        }}
      />
      {activoEditar && (
        <EditarActivoModal
            isOpen={true}
            onClose={() => setActivoEditar(null)}
            activo={activoEditar}
            onUpdated={() => {
            setActivoEditar(null)
            toast.success('Activo modificado correctamente')
            window.location.reload()
            }}
        />
        )}

      { walletEditar && (
        <EditarWalletModal
          isOpen={true}
          onClose={() => setWalletEditar(null)}
          wallet={wallets}
          onUpdated={() => {
            setWalletEditar(null);
            toast.success('Wallet actualizada correctamente');
            window.location.reload();
          }}
        />
      )}

    </div>
  );
};

export default Perfil;
