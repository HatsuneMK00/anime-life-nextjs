import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import styled from "styled-components";
import {add, plus} from "@/app/utils/icons";
import AnimeItem from "@/app/components/AnimeItem/animeItem";
import Modal from "@/app/components/Modals/modal";
import CreateAnime from "@/app/components/Modals/createAnime";
import EditAnime from "@/app/components/Modals/editAnime";
import {useState} from "react";

function Animes({ title, animes }) {
  const { theme, createModal, editModal } = useGlobalContext();
  const { openCreateModal } = useGlobalUpdateContext();
  const [editModalInitialData, setEditModalInitialData] = useState({})

  return (
    <AnimeStyled theme={theme}>
      { createModal && <Modal content={<CreateAnime />} /> }
      { editModal && <Modal content={<EditAnime initialData={...editModalInitialData}/>} /> }
      <h1>{title}</h1>

      <button className="btn-rounded" onClick={openCreateModal}>{plus}</button>

      <div className="animes grid">
        {animes.map((anime) => (
          <AnimeItem
            key={anime.id}
            name={anime.name}
            nameJp={anime.name_jp}
            id={anime.id}
            date={anime.date}
            rating={anime.rating}
            watchCount={anime.watch_count}
            setEditModalInitialData={setEditModalInitialData}/>
        ))}
        {/*<button className="create-anime">*/}
        {/*  {add}*/}
        {/*  Add New Anime*/}
        {/*</button>*/}
      </div>

    </AnimeStyled>
  );
}

const AnimeStyled = styled.main`
    position: relative;
    padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    .btn-rounded {
        position: fixed;
        top: 4.9rem;
        right: 5.1rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;

        background-color: ${(props) => props.theme.colorBg};
        border: 2px solid ${(props) => props.theme.borderColor2};
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
        color: ${(props) => props.theme.colorGrey2};
        font-size: 1.4rem;

        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: 768px) {
            top: 3rem;
            right: 3.5rem;
        }
    }

    .animes {
        margin: 2rem 0;
    }

    > h1 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 3rem;
            height: 0.2rem;
            background-color: ${(props) => props.theme.colorPrimaryGreen};
            border-radius: 0.5rem;
        }
    }

    .create-anime {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        height: 19rem;
        color: ${(props) => props.theme.colorGrey2};
        font-weight: 600;
        cursor: pointer;
        border-radius: 1rem;
        border: 3px dashed ${(props) => props.theme.colorGrey5};
        transition: all 0.3s ease;

        i {
            font-size: 1.5rem;
            margin-right: 0.2rem;
        }

        &:hover {
            background-color: ${(props) => props.theme.colorGrey5};
            color: ${(props) => props.theme.colorGrey0};
        }
    }
`

export default Animes;