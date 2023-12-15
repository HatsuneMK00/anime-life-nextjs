'use client'
import React from 'react';
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import styled from "styled-components";
import {edit, emptyStar, star, trash} from "@/app/utils/icons";
import RatingRow from "@/app/components/RatingRow/ratingRow";
import Image from "next/image";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

function AnimeItem({ animeId, name, nameJp, cover, id, date, rating, watchCount, comment, setEditModalInitialData }) {
  const { theme } = useGlobalContext()
  const { openEditModal } = useGlobalUpdateContext()

  return (
    <AnimeItemStyled theme={theme}>
      <div className="anime-main">
        <div className="anime-info">
          <h1>{name}</h1>
          <h2>{nameJp}</h2>
          <p className="date">{date}</p>
        </div>
        <div className="image">
          <Image
            width={150}
            height={215}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            src={cover}
            alt="cover"/>
        </div>
      </div>
      <div className="anime-footer">
        <RatingRow rating={rating} />
        { watchCount >= 2 && (
          <div className="watch-count">
            {watchCount} 刷
          </div>
        )}
        <button className="edit" onClick={() => {
          setEditModalInitialData({
            animeId: animeId,
            name: name,
            nameJp: nameJp,
            date: date,
            rating: rating,
            watchCount: watchCount,
            bangumiId: id,
            comment: comment
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
            width: 50%;
            
            > h1 {
                font-size: 1.3rem;
                font-weight: 500;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
            }

            > h2 {
                font-size: 1.1rem;
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
            width: 50%;
            object-fit: cover;
            
            img {
                border-radius: 12px;
                margin-left: auto;
            }
        }
    }

    .anime-footer {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 1.2rem;

        .watch-count {
            display: inline-block;
            padding: 0.4rem 0.2rem;
            background: ${(props) => props.theme.colorGreenDark};
            border-radius: 20px;
            margin-top: auto;
            width: 20%;
            text-align: center;
        }

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
