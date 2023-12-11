"use client";
import React, {useEffect} from "react";
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import Animes from "@/app/components/Animes/animes";

function page() {
  const {animes} = useGlobalContext();
  const {ratedAnimes} = useGlobalUpdateContext();

  useEffect(() => {
    ratedAnimes(1);
  }, []);

  return (
    <Animes title="Bad" animes={animes}></Animes>
  );
}

export default page;