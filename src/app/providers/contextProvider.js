'use client';
import React, {useEffect, useState} from 'react';
import {GlobalProvider} from "@/app/context/globalProvider";

function ContextProvider({children}) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 200)
  }, []);
  if (!isReady) {
    return null;
  }
  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );
}

export default ContextProvider;
