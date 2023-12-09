"use client"
import React from 'react';
import {emptyStar, star} from "@/app/utils/icons";
import styled from "styled-components";

function RatingRow({rating}) {
    const maxRating = 4
    const ratingDiv = []
    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        ratingDiv.push(star)
      } else {
        ratingDiv.push(emptyStar)
      }
    }

    return (
      <RatingRowStyled>
        {ratingDiv.map((item) => (
          item
        ))}
      </RatingRowStyled>
    )
}

const RatingRowStyled = styled.div`
    display: flex;
    gap: 0.2rem;
    font-size: 1.5rem;
`

export default RatingRow;