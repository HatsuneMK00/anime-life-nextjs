"use client"
import React, {useState} from 'react';
import {emptyStar, eraser, star} from "@/app/utils/icons";
import styled from "styled-components";
import {useGlobalContext} from "@/app/context/globalProvider";

function RatingRow({editable, rating, setRating, isConfirmed}) {
  const {theme} = useGlobalContext()
  const [confirmed, setConfirmed] = useState(isConfirmed)
  const maxRating = 4
  const ratingDiv = []
  for (let i = 0; i < maxRating; i++) {
    if (i < rating) {
      ratingDiv.push(star)
    } else {
      ratingDiv.push(emptyStar)
    }
  }

  const handleHover = (index) => {
    if (editable && !confirmed) {
      setRating(index + 1)
    }
  }

  const handleClick = () => {
    setConfirmed(true)
  }

  const handleErase = () => {
    setConfirmed(false)
    setRating(0)
  }

  return (
    <RatingRowStyled theme={theme} confirmed={confirmed} editable={editable}>
      {ratingDiv.map((item, index) => (
        editable ?
          <div key={index} onMouseOver={() => handleHover(index)} onClick={handleClick}>{item}</div>
          : <div key={index}>{item}</div>
      ))}
      { editable && <div className="eraser" onClick={handleErase}>{eraser}</div> }
    </RatingRowStyled>
  )
}

const RatingRowStyled = styled.div`
    display: flex;
    gap: 0.2rem;
    font-size: 1.5rem;
    color: ${(props) => props.confirmed && props.theme.colorGreenDark};
    
    i {
        cursor: ${(props) => props.editable && "pointer"};
    }
    
    .eraser {
        color: white;
        margin-left: auto;
    }
`

export default RatingRow;