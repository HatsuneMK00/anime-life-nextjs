import {useGlobalContext, useGlobalUpdateContext} from "@/app/context/globalProvider";
import styled from "styled-components";
import {plus, search} from "@/app/utils/icons";
import AnimeItem from "@/app/components/AnimeItem/animeItem";
import Modal from "@/app/components/Modals/modal";
import CreateAnime from "@/app/components/Modals/createAnime";
import EditAnime from "@/app/components/Modals/editAnime";
import {useState} from "react";
import formatDate from "@/app/utils/formatDate";

function Animes({title, animes, searchable}) {
  const {theme, isLoading, createModal, editModal} = useGlobalContext();
  const {searchAnimes} = useGlobalUpdateContext();
  const {openCreateModal} = useGlobalUpdateContext();
  const [editModalInitialData, setEditModalInitialData] = useState({})
  const [searchText, setSearchText] = useState("")

  const handleChange = (name) => (e) => {
    switch (name) {
      case "search":
        setSearchText(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleSearch = () => {
    searchAnimes(searchText);
  }

  return (
    <AnimeStyled theme={theme}>
      {createModal && <Modal content={<CreateAnime/>}/>}
      {editModal && <Modal content={<EditAnime initialData={...editModalInitialData}/>}/>}
      <div className="animes-header">
        <h1>{title}</h1>
        {searchable &&
          <div className="input-control">
            <label htmlFor="search" onClick={handleSearch}>{search}</label>
            <input
              type="text"
              placeholder="想搜什么？"
              value={searchText}
              id="search"
              name="search"
              onChange={handleChange("search")}/>
          </div>
        }
      </div>
      <button className="btn-rounded" onClick={openCreateModal}>{plus}</button>

      {isLoading &&
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
      <div className="animes grid">
        {animes.map((anime) => (
          <AnimeItem
            key={anime.id}
            name={anime.name}
            nameJp={anime.name_jp}
            cover={anime.cover}
            id={anime.bangumi_id}
            date={formatDate(anime.record_at)}
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

    .animes-header {
        display: flex;
        align-items: center;

        .input-control {
            width: 30rem;
            position: relative;
            margin: 0 1.6rem;
            font-weight: 500;

            @media screen and (max-width: 450px) {
                margin: 1rem 0;
            }

            label {
                cursor: pointer;
                position: absolute;
                bottom: 0;
                right: 1rem;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: clamp(0.9rem, 5vw, 1.2rem);
                
                i {
                    font-size: 1.5rem;
                }

                span {
                    color: ${(props) => props.theme.colorGrey3};
                }
            }

            input {
                width: 100%;
                padding: 1rem;

                resize: none;
                background-color: ${(props) => props.theme.colorGreyDark};
                color: ${(props) => props.theme.colorGrey2};
                border-radius: 0.5rem;
            }
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