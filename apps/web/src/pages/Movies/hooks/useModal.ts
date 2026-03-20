import { useState } from 'react';

const useModal = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [editingMovie, setEditingMovie] = useState<number | null>(null);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const openEditModal = (movieId: number) => {
    setEditingMovie(movieId);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditingMovie(null);
    setEditModalOpen(false);
  };

  return {
    isCreateModalOpen,
    isEditModalOpen,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    editingMovie,
  };
};

export default useModal;
