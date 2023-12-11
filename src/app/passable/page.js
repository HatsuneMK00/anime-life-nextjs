"use client";
import React, {useEffect} from "react";
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import Animes from "@/app/components/Animes/animes";

function page() {
  const {animes} = useGlobalContext();
  const {ratedAnimes} = useGlobalUpdateContext();

  useEffect(() => {
    ratedAnimes(2);
  }, []);

  return (
    <Animes title="Passable" animes={animes}></Animes>
  );
}

export default page;