'use client';
import React, {createContext, useContext, useEffect, useState} from 'react';
import themes from "@/app/context/themes";
import {useUser} from "@clerk/nextjs";
import useFetch from "@/app/hooks/useFetch";
import {BASE_URL} from "@/app/context/network";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({children}) => {
  const {user} = useUser();
  const fetch = useFetch();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [animes, setAnimes] = useState([]);

  const theme = themes[selectedTheme];

  const clearAnimes = () => {
    setAnimes([]);
  }

  const allAnimes = () => {
    setIsLoading(true)
    fetch(`${BASE_URL}/api/anime_record`)
      .then(data => {
        data = data.data;
        setAnimes(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        toast.error("Error fetching animes")
        setIsLoading(false)
      })
  };

  const ratedAnimes = (rating) => {
    setIsLoading(true)
    fetch(`${BASE_URL}/api/anime_record/rating/${rating}`)
      .then(data => {
        data = data.data;
        setAnimes(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        toast.error("Error fetching animes")
        setIsLoading(false)
      })
  }

  const searchAnimes = (searchText) => {
    setIsLoading(true)
    fetch(`${BASE_URL}/api/anime_record/search?searchText=${searchText}`)
      .then(data => {
        data = data.data;
        setAnimes(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (user) {
      allAnimes();
    }
  }, [user]);

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
      animes,
      createModal,
      editModal,
      isLoading
    }}>
      <GlobalUpdateContext.Provider value={{
        openCreateModal,
        closeCreateModal,
        openEditModal,
        closeEditModal,
        closeModal,
        clearAnimes,
        allAnimes,
        ratedAnimes,
        searchAnimes
      }}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);
