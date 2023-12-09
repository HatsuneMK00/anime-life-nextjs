"use client";

import Animes from "@/app/components/Animes/animes";
import {mock_animes} from "@/mock/anime_data";

export default function Home() {
  return (
    <Animes title="All Animes" animes={mock_animes}></Animes>
  )
}
