import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

import Anime from "./routes/Anime";
import Dashboard from "./routes/Dashboard";
import AnimeInfoBoard from "./routes/AnimeInfoBoard";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="" element={<Dashboard/>} />
        <Route path="anime" element={<Anime/>}>
          <Route index element={<h3>Please select an Anime from the Dashboard.</h3>} />
          <Route path=":malId" element={<AnimeInfoBoard/>} />  
        </Route>
        <Route path="*" element={<h3>???</h3>} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
