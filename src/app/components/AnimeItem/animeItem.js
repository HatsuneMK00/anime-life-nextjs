'use client'
import React from 'react';
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import styled from "styled-components";
import {edit, emptyStar, star, trash} from "@/app/utils/icons";
import RatingRow from "@/app/components/RatingRow/ratingRow";
import Image from "next/image";

function AnimeItem({ name, nameJp, date, rating, watchCount, id, setEditModalInitialData }) {
  const { theme } = useGlobalContext()
  const { openEditModal } = useGlobalUpdateContext()

  return (
    <AnimeItemStyled theme={theme}>
      <div className="anime-main">
        <div className="anime-info">
          <h1>{name}</h1>
          <h2>{nameJp}</h2>
          <p className="date">{date}</p>
          { watchCount >= 2 && (
            <div className="watch-count">
              {watchCount} 刷
            </div>
          )}
        </div>
        <div className="image">
          <Image width={150} height={275} src="/Kyokai no Kanata.jpg" alt="cover"/>
        </div>
      </div>
      <div className="anime-footer">
        <RatingRow rating={rating} />
        <button className="edit" onClick={() => {
          setEditModalInitialData({
            name: name,
            nameJp: nameJp,
            date: date,
            rating: rating,
            watchCount: watchCount,
            bangumiId: id
          })
          openEditModal()
        }}>{edit}</button>
        <button
          className="delete"
          onClick={() => {
            // deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.borderColor2};
    box-shadow: ${(props) => props.theme.shadow7};
    border: 2px solid ${(props) => props.theme.borderColor2};

    height: 19rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    .anime-main {
        display: flex;
        flex-direction: row;
        
        .anime-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            
            > h1 {
                font-size: 1.5rem;
                font-weight: 500;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
            }

            > h2 {
                font-size: 1.2rem;
                font-weight: 400;
                color: ${(props) => props.theme.colorGrey3};
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
            }
        }
        
        .image {
            width: 150px;
            object-fit: cover;
            margin-left: auto;
            
            img {
                border-radius: 12px;
            }
        }

        .watch-count {
            display: inline-block;
            padding: 0.4rem 1rem;
            background: ${(props) => props.theme.colorGreenDark};
            border-radius: 30px;
            margin-top: auto;
            width: 60%;
            text-align: center;
        }
    }

    .anime-footer {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 1.2rem;

        button {
            border: none;
            outline: none;
            cursor: pointer;

            i {
                font-size: 1.4rem;
                color: ${(props) => props.theme.colorGrey2};
            }
        }
    }

    .edit {
        margin-left: auto;
    }
`

export default AnimeItem;
