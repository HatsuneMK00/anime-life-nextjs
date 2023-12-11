"use client"
import React from 'react';
import {useAuth} from "@clerk/nextjs";

function usePost() {
  const {getToken} = useAuth();

  const authenticatedPost = async (url, data) => {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Dest': 'empty'
      },
      body: JSON.stringify(data),
      method: "POST",
    }).then(res => res.json());
  };

  return authenticatedPost;
}

export default usePost;