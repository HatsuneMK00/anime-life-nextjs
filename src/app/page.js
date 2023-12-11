"use client";

import Animes from "@/app/components/Animes/animes";
import {mock_animes} from "@/mock/anime_data";
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import {useEffect} from "react";

export default function Home() {
  const {animes} = useGlobalContext();
  const {allAnimes} = useGlobalUpdateContext();

  useEffect(() => {
    allAnimes();
  }, []);

  return (
    <Animes title="All Animes" animes={animes} searchable={true}></Animes>
  )
}
