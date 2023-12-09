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
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );
}

export default ContextProvider;
