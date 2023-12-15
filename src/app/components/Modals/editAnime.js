"use client";
import React, {useState} from 'react';
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import {mock_animes} from "@/mock/anime_data";
import Button from "@/app/components/Button/button";
import toast from "react-hot-toast";
import styled from "styled-components";
import {add} from "@/app/utils/icons";
import RatingRow from "@/app/components/RatingRow/ratingRow";
import usePost from "@/app/hooks/usePost";
import {BASE_URL} from "@/app/context/network";

function EditAnime({initialData}) {
  const [name, setName] = useState(initialData.name);
  const [bangumiId, setBangumiId] = useState(initialData.bangumiId);
  const [rating, setRating] = useState(initialData.rating);
  const [comment, setComment] = useState(initialData.comment);
  const [isLoading, setIsLoading] = useState(false);

  // const { theme, allTasks, closeModal } = useGlobalContext();
  const { theme } = useGlobalContext();
  const { closeModal, reloadAnimes } = useGlobalUpdateContext();

  const post = usePost();

  const handleChange = (name) => (e) => {
    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "bangumiId":
        setBangumiId(e.target.value)
        break;
      case "rating":
        setRating(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const requestData = {
      animeId: initialData.animeId,
      // convert props.bangumiId to int if it is string, otherwise stay the same
      bangumiId: typeof bangumiId === 'string' ? parseInt(bangumiId) : bangumiId,
      animeRating: parseInt(rating),
      comment: comment
    }

    post(`${BASE_URL}/api/anime_record/updateRecord`, requestData)
      .then(data => {
        setIsLoading(false);
        toast.success("Successfully update anime")
        setTimeout(() => {
          closeModal()
          reloadAnimes()
        }, 500)
      })
      .catch(err => {
        console.log(err)
        toast.error("Fail to update anime")
        setIsLoading(false);
      })
  };

  return (
    <EditAnimeStyled onSubmit={handleSubmit} theme={theme}>
      <h1>{name}</h1>
      <div className="input-control">
        <label htmlFor="bangumiId">Bangumi ID</label>
        <input
          type="text"
          id="bangumiId"
          value={bangumiId}
          name="bangumiId"
          onChange={handleChange("bangumiId")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="name">动画名称</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={handleChange("name")}
          placeholder="动画名称"
        />
      </div>
      <div className="input-control">
        <label htmlFor="comment">随便写点什么</label>
        <textarea
          value={comment}
          onChange={handleChange("comment")}
          name="comment"
          id="comment"
          rows={4}
          placeholder="随便写点什么"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="rating">评价</label>
        <RatingRow editable={true} rating={rating} setRating={setRating} isConfirmed={true}/>
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Update"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </EditAnimeStyled>
  );
}

const EditAnimeStyled = styled.form`
    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }
`;

export default EditAnime;