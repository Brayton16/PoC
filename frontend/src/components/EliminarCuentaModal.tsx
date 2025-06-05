// src/components/DeleteAccountModal.tsx
import React from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, userId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/usuarios/eliminar/${userId}`);
      toast.success('Cuenta eliminada correctamente');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      toast.error('Error al eliminar la cuenta');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Eliminar cuenta</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600">
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
