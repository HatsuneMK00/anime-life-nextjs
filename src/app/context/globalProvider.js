'use client';
import React, {createContext, useContext, useState} from 'react';
import themes from "@/app/context/themes";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({children}) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const theme = themes[selectedTheme];

  const openCreateModal = () => {
    setCreateModal(true);
  }
  const closeCreateModal = () => {
    setCreateModal(false);
  }
  const openEditModal = () => {
    setEditModal(true);
  }
  const closeEditModal = () => {
    setEditModal(false);
  }
  const closeModal = () => {
    setEditModal(false);
    setCreateModal(false);
  }

  return (
    <GlobalContext.Provider value={{
      theme,
      createModal,
      editModal
    }}>
      <GlobalUpdateContext.Provider value={{
        openCreateModal,
        closeCreateModal,
        openEditModal,
        closeEditModal,
        closeModal
      }}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);
