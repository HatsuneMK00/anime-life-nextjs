"use client"
import React from 'react';
import {SignIn} from "@clerk/nextjs";

function page() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    }}>
      <SignIn />
    </div>
  );
}

export default page;