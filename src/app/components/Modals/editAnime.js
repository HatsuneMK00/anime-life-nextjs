"use client";
import React, {useState} from 'react';
import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import {mock_animes} from "@/mock/anime_data";
import Button from "@/app/components/Button/button";
import toast from "react-hot-toast";
import styled from "styled-components";
import {add} from "@/app/utils/icons";

function EditAnime({initialData}) {
  const [name, setName] = useState(initialData.name);
  const [bangumiId, setBangumiId] = useState(initialData.bangumiId);
  const [rating, setRating] = useState(initialData.rating);

  // const { theme, allTasks, closeModal } = useGlobalContext();
  const { theme } = useGlobalContext();
  const { closeModal } = useGlobalUpdateContext();

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

    toast.success("Uploading")
    // const task = {
    //   title: nameJp,
    //   description: rating,
    //   date,
    //   completed,
    //   important,
    // };
    //
    // try {
    //   const res = await axios.post("/api/tasks", task);
    //
    //   if (res.data.error) {
    //     toast.error(res.data.error);
    //   }
    //
    //   if (!res.data.error) {
    //     toast.success("Task created successfully.");
    //     // allTasks();
    //     closeModal();
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong.");
    //   console.log(error);
    // }
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
      {/*<div className="input-control">*/}
      {/*  <label htmlFor="comment">随便写点什么</label>*/}
      {/*  <textarea*/}
      {/*    value={comment}*/}
      {/*    onChange={handleChange("comment")}*/}
      {/*    name="comment"*/}
      {/*    id="comment"*/}
      {/*    rows={4}*/}
      {/*    placeholder="随便写点什么"*/}
      {/*  ></textarea>*/}
      {/*</div>*/}
      <div className="input-control">
        <label htmlFor="rating">评价</label>
        <input
          value={rating}
          onChange={handleChange("rating")}
          type="text"
          name="rating"
          id="rating"
        />
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