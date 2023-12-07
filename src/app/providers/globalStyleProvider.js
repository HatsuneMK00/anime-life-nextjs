'use client';
import React from 'react'
import styled from "styled-components";

function GlobalStyleProvider({children}) {
  return (
    <GlobalStyled>
      {children}
    </GlobalStyled>
  )
}

const GlobalStyled = styled.div`
padding: 2.5rem;
display: flex;
gap: 2.5rem;
height: 100%;
`

export default GlobalStyleProvider