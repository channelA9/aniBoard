import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailedInfoBoard from "../components/DetailedInfoBoard";
import Anime from "./Anime";

const AnimeInfoBoard = () => {
  let params = useParams();
  useEffect(() => {
    let malId = params.malId;
    if (malId) makeLocalQuery(malId.toString());
  }, []);
  let trigger = false;

  const [data, setData] = useState({
    url: "",
    images: {
      webp: {
        large_image_url: "",
      },
    },
    title: '',
    title_japanese: '',
    synopsis: '',
    score: 0,
    rank: 0,
    source: '',
    trailer: {
        embed_url: '',
    },
    background: '',
    year: 0,

  });
  
  let valid = false;

  const callLocalAPI = async (query: string) => {
    const response = await fetch(query);
    const json = await response.json();
    if (json.data == null) {
    } else {
      valid = true;
      console.log(json.data);
      setData(json.data);
    }
  };

  const makeLocalQuery = (id: String) => {
    if (!trigger) {
      trigger = true;
      let query = `https://api.jikan.moe/v4/anime/${id}/full`;
      callLocalAPI(query);
    }
  };

  return (
    <DetailedInfoBoard
    url={data.url}
      large_image_url={data.images.webp.large_image_url}
      title={data.title}
      title_japanese={data.title_japanese}
      desc={data.synopsis}
      score={data.score}
      rank={data.rank}
      source={data.source}
      trailerUrl={(data.trailer?.embed_url != null && data.trailer?.embed_url != '')  ? data.trailer.embed_url : ''}
      background={data.background}
      year={data.year}
    />
  );
};

export default AnimeInfoBoard;
