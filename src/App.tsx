import { useState, useEffect } from "react";

import "./App.css";
import NavBtn from "./components/NavBtn";
import FilterBoard from "./components/FilterBoard";
import SearchBoard from "./components/SearchBoard";
import DataBoard from "./components/DataBoard";
function App() {
  let queryQueue = [];

  const [animes,setAnimeList] = useState([]);

  const [avgScore, setAvgScore] = useState(0.000);
  const [totalFavs, setTotalFavs] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
    
  const [inputs, setInputs] = useState({
    status: "",
    min_rating: 0,
    max_rating: 10,
    sort_by: "title",
    sort_order: "desc",
    title: "",
  })

  const updateAnimes = (data: any) => {
    setAnimeList((prevState) => ([...prevState, ...data]))
  }

  const callAPI = async (query: string) => {
    console.log(query)
    const response = await fetch(query);
    const json = await response.json()
    console.log(json)
    if (json.data == null) {
      alert("An error occurred with the request. Try again!")
    } else {
      updateAnimes(json.data);

      for (let i = 2; i < Math.min(6,json.pagination.last_visible_page);i++) {
        let queryExtra = `https://api.jikan.moe/v4/anime?page=${i}&limit=100&q=${inputs.title}&sfw&status=${inputs.status}&min_score=${inputs.min_rating}&max_score=${inputs.max_rating}&order_by=${inputs.sort_by}&sort=${inputs.sort_order}`
        queryQueue.push(setTimeout(() => {  callAPIRecurs(queryExtra); }, 1000*i))
      }

    }
  }
  
  const callAPIRecurs = async (query: string) => {
    console.log(query)
    const response = await fetch(query);
    const json = await response.json()
    console.log(json)
    if (json.data == null) {
      alert("An error occurred with the request. Try again!")
    } else {
      updateAnimes(json.data);

    }
  }

  const makeQuery = () => {
    for (var i=0; i<queryQueue.length; i++) {
      clearTimeout(queryQueue[i]);
    }
    
    let query = `https://api.jikan.moe/v4/anime?limit=100&q=${inputs.title}&sfw&status=${inputs.status}&min_score=${inputs.min_rating}&max_score=${inputs.max_rating}&order_by=${inputs.sort_by}&sort=${inputs.sort_order}`
    callAPI(query).catch(console.error)
  }

  const startSearch = (formSubmitEvent: Event) => {
    for (var i=0; i<queryQueue.length; i++) {
      clearTimeout(queryQueue[i]);
    }

    formSubmitEvent.preventDefault();

    setAnimeList([]);

    makeQuery();

    console.log(inputs)
  }

  const parseInput = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // 


  useEffect(() => {
    console.log(animes)
    if (animes.length > 0) {
        let datum = animes.map(anime => (anime.score))
        let total = 0.00;
        datum.forEach((i) => (
            total += i
        ))
        setAvgScore(Math.round((total/(datum.length))*100)/100)

        datum = animes.map(anime => (anime.favorites))
        total = 0;
        datum.forEach((i) => (
            total += i
        ))
        setTotalFavs(total)

        datum = animes.map(anime => (anime.scored_by))
        total = 0;
        datum.forEach((i) => (
            total += i
        ))
        setTotalReviews(total)
    }



  }, [animes])
  return (
    <div className="App bg-slate-200">
      <div className="place-items-start flex place-content-start">
        <nav className="h-screen w-48 lg:w-64 z-0 flex-none">
          <NavBtn route="Dashboard" />
        </nav>
        <div className="min-h-screen flex-grow bg-slate-100 p-4">
          <div className="">
            <FilterBoard 
            inputs={inputs}
            onSubmit={startSearch}
            handleChange={(e: any) => 
            parseInput(e)}/>
            <DataBoard
            totalFavs={totalFavs}
            totalReviews={totalReviews}
            avgScore={avgScore}/>
            <SearchBoard 
            listAnims={animes}
            metricMethod={inputs.sort_by}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
