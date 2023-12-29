"use client"
import React from 'react';
import {SignUp} from "@clerk/nextjs";

function page() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    }}>
      <SignUp />
    </div>
  );
}

export default page;