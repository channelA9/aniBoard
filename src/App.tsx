import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";


import "./App.css";
import NavBtn from "./components/NavBtn";


function App() {
  return (
    <div className="App bg-slate-200">
      <div className="place-items-start flex place-content-start">
        <nav className="h-screen w-48 lg:w-64 z-0 flex-none">
          <NavBtn route="" routeStr="Dashboard" />
          <NavBtn route="anime" routeStr="Anime" />
          
        </nav>
        <div className="min-h-screen flex-grow bg-slate-100 p-4">
        <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
