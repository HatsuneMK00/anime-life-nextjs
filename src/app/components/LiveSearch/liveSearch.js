import React, {useEffect, useState} from 'react';
import {mock_live_search} from "@/mock/live_search";
import styled from "styled-components";
import {useGlobalContext} from "@/app/context/globalProvider";
import {BANGUMI_BASE_URL} from "@/app/context/network";
import toast from "react-hot-toast";

function LiveSearch({handleLiveSearchSelect, query}) {
  const {theme} = useGlobalContext();
  const [isLiveSearchLoading, setIsLiveSearchLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([])
  const [timer, setTimer] = useState(0)

  const getSearchResult = (query) => {
    setIsLiveSearchLoading(true);
    const url = `${BANGUMI_BASE_URL}/search/subject/${query}?type=2&responseGroup=small&max_results=5`
    fetch(encodeURI(url), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setSearchResult(data.list.map((item) => {
          return item.name_cn === "" ? item.name : item.name_cn
        }))
      })
      .catch(err => {
        console.log(err)
        toast.error("Fail to load animes from bangumi", {
          id: "fail_to_fetch_bangumi"
        })
      })
      .finally(() => {
        setIsLiveSearchLoading(false);
      })
  }

  useEffect(() => {
    // set a timer of 1.5s to send a request to bangumi api
    // if the user doesn't type anything in 1.5s, then send the request
    // if the user types something in 1.5s, then cancel the timer and set a new timer
    clearTimeout(timer)
    setIsLiveSearchLoading(true)
    const newTimer = setTimeout(() => {
      getSearchResult(query)
    }, 1000)
    setTimer(newTimer)
  }, [query]);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <LiveSearchStyled theme={theme}>
      <div className="live-search">
        {isLiveSearchLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <ul>
            {searchResult.map((item) => (
              <li onClick={() => handleLiveSearchSelect(item)}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </LiveSearchStyled>
  );
}

const LiveSearchStyled = styled.div`
    .live-search {
        z-index: 100;
        position: absolute;
        padding: 1rem;
        width: 100%;
        border-radius: 0.5rem;
        background-color: ${(props) => props.theme.colorGrey5};

        li {
            margin: 0.5rem 0;
            border-radius: 0.4rem;
            padding: 0.5rem;
        }

        li:hover {
            background-color: ${(props) => props.theme.colorGrey3};
        }
`

export default LiveSearch;