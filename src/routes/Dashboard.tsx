import React from "react";

import { useState, useEffect } from "react";

import FilterBoard from "../components/FilterBoard";
import SearchBoard from "../components/SearchBoard";
import DataBoard from "../components/DataBoard";

const Dashboard = () => {
  let queryQueue: any = [];

  const [animes, setAnimeList] = useState<any[]>([]);

  const [avgScore, setAvgScore] = useState(0.0);
  const [totalFavs, setTotalFavs] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [inputs, setInputs] = useState({
    status: "",
    min_rating: 0,
    max_rating: 10,
    sort_by: "title",
    sort_order: "desc",
    title: "",
  });

  let shadowData = [
    { name: "1", value: 0 },
    { name: "2", value: 0 },
    { name: "3", value: 0 },
    { name: "4", value: 0 },
    { name: "5", value: 0 },
    { name: "6", value: 0 },
    { name: "7", value: 0 },
    { name: "8", value: 0 },
    { name: "9", value: 0 },
    { name: "10", value: 0 },
  ];

  const [comprehensiveArrayedAvgData, setComprehensiveArrayedAvgData] =
    useState([
      { name: "1", value: 0 },
      { name: "2", value: 0 },
      { name: "3", value: 0 },
      { name: "4", value: 0 },
      { name: "5", value: 0 },
      { name: "6", value: 0 },
      { name: "7", value: 0 },
      { name: "8", value: 0 },
      { name: "9", value: 0 },
      { name: "10", value: 0 },
    ]);

  let shadowData2: Array<Object> = [];
  const [comprehensiveTypeData, setTypeDataA] = useState<Array<Object>>([]);

  const updateAnimes = (data: any) => {
    setAnimeList((prevState: Array<Object>) => [...prevState, ...data]);
  };

  const callAPI = async (query: string) => {
    console.log(query);
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    if (json.data == null) {
      alert("An error occurred with the request. Try again!");
    } else {
      updateAnimes(json.data);

      for (let i = 2; i < Math.min(6, json.pagination.last_visible_page); i++) {
        let queryExtra = `https://api.jikan.moe/v4/anime?page=${i}&limit=100&q=${inputs.title}&sfw&status=${inputs.status}&min_score=${inputs.min_rating}&max_score=${inputs.max_rating}&order_by=${inputs.sort_by}&sort=${inputs.sort_order}`;
        queryQueue.push(
          setTimeout(() => {
            callAPIRecurs(queryExtra);
          }, 1000 * i)
        );
      }
    }
  };

  const callAPIRecurs = async (query: string) => {
    console.log(query);
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    if (json.data == null) {
      alert("An error occurred with the request. Try again!");
    } else {
      updateAnimes(json.data);
    }
  };

  const makeQuery = () => {
    setComprehensiveArrayedAvgData([
      { name: "1", value: 0 },
      { name: "2", value: 0 },
      { name: "3", value: 0 },
      { name: "4", value: 0 },
      { name: "5", value: 0 },
      { name: "6", value: 0 },
      { name: "7", value: 0 },
      { name: "8", value: 0 },
      { name: "9", value: 0 },
      { name: "10", value: 0 },
    ]);
    shadowData = [
      { name: "1", value: 0 },
      { name: "2", value: 0 },
      { name: "3", value: 0 },
      { name: "4", value: 0 },
      { name: "5", value: 0 },
      { name: "6", value: 0 },
      { name: "7", value: 0 },
      { name: "8", value: 0 },
      { name: "9", value: 0 },
      { name: "10", value: 0 },
    ];
    setTypeDataA([]);
    shadowData2 = [];

    for (var i = 0; i < queryQueue.length; i++) {
      clearTimeout(queryQueue[i]);
    }

    let query = `https://api.jikan.moe/v4/anime?limit=100&q=${inputs.title}&sfw&status=${inputs.status}&min_score=${inputs.min_rating}&max_score=${inputs.max_rating}&order_by=${inputs.sort_by}&sort=${inputs.sort_order}`;
    if (inputs.status == 'upcoming') {
      query = `https://api.jikan.moe/v4/anime?limit=100&q=${inputs.title}&sfw&status=${inputs.status}&order_by=${inputs.sort_by}&sort=${inputs.sort_order}`;
    }
    callAPI(query).catch(console.error);
  };

  const startSearch = (formSubmitEvent: Event) => {
    for (var i = 0; i < queryQueue.length; i++) {
      clearTimeout(queryQueue[i]);
    }

    formSubmitEvent.preventDefault();

    setAnimeList([]);

    makeQuery();

    console.log(inputs);
  };

  const parseInput = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //

  useEffect(() => {
    console.log(animes);
    if (animes.length > 0) {
      let datum = animes.map((anime) => anime.score);
      let total = 0.0;
      datum.forEach((i) => (total += i));
      setAvgScore(Math.round((total / datum.length) * 100) / 100);

      datum.forEach((i) => {
        if (shadowData[Math.ceil(i)] != null) {
          shadowData[Math.ceil(i)].value += 1;
        }
      });
      setComprehensiveArrayedAvgData(shadowData);

      datum = animes.map((anime) => anime.favorites);
      total = 0;
      datum.forEach((i) => (total += i));
      setTotalFavs(total);

      datum = animes.map((anime) => anime.scored_by);
      total = 0;
      datum.forEach((i) => (total += i));

      animes.forEach((anime) => {
        shadowData2.push({
          name: anime.title,
          members: anime.members,
          favorites: anime.favorites,
        });
      });

      setTypeDataA(shadowData2);

      // data
    }
  }, [animes]);

  useEffect(() => {
    console.log(comprehensiveTypeData);
  }, [comprehensiveTypeData]);
  return (
    <div className="">
      <FilterBoard
        inputs={inputs}
        onSubmit={startSearch}
        handleChange={(e: any) => parseInput(e)}
      />
      <DataBoard
        totalFavs={totalFavs}
        totalReviews={totalReviews}
        avgScore={avgScore}
        dataScore={comprehensiveArrayedAvgData}
        dataType={comprehensiveTypeData}
      />
      <SearchBoard listAnims={animes} metricMethod={inputs.sort_by} />
    </div>
  );
};

export default Dashboard;
