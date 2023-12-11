"use client";
import React, {useEffect} from "react";
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import Animes from "@/app/components/Animes/animes";

function page() {
  const {animes} = useGlobalContext();
  const {ratedAnimes} = useGlobalUpdateContext();

  useEffect(() => {
    ratedAnimes(3);
  }, []);

  return (
    <Animes title="Surprise" animes={animes}></Animes>
  );
}

export default page;