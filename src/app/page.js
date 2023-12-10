"use client";

import Animes from "@/app/components/Animes/animes";
import {mock_animes} from "@/mock/anime_data";
import {useGlobalContext} from "@/app/context/globalProvider";

export default function Home() {
  const {animes} = useGlobalContext();

  return (
    <Animes title="All Animes" animes={animes}></Animes>
  )
}
