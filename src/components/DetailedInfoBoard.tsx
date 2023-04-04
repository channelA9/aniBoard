import React from "react";

const DetailedInfoBoard = (props: {
  url: string;
  large_image_url: string;
  title: string;
  title_japanese: string;
  desc: string;
  score: number;
  source: string;
  rank: number;
  background: string;
  year:number;
  trailerUrl:string;
}) => {
  return (
    <>
      <div className="w-full max-w-screen-md xl:max-w-screen-lg h-fit bg-white  rounded-sm">
        <span className="grid grid-cols-4 bg-slate-900 text-white">
          <div className="flex place-content-center place-items-center flex-col col-span-3">
            <h2 className="rounded-sm w-full pl-4 pt-4 text-4xl font-bold">
              {props.title}
            </h2>
            <h3 className="rounded-sm w-full pl-4 mb-8 text-xl">
              {props.title_japanese}
            </h3>
          </div>
          <a
            href={props.url}
            className="w-full h-full z-10 flex place-items-center place-content-center bg-blue-700 hover:bg-blue-900"
          >
            <h3 className="text-4xl text-white text-bold">MAL ➡</h3>
          </a>
        </span>
        <span className="grid grid-cols-3 p-4 bg-slate-200">
          <div className="flex place-content-center place-items-center flex-col">
            <h3>SCORE</h3>
            <h3 className="text-4xl">{props.score}</h3>
          </div>
          <div className="flex place-content-center place-items-center flex-col border-x border-slate-400">
            <h3>RANK</h3>
            <h3 className="text-3xl">{props.rank}</h3>
          </div>
          <div className="flex place-content-center place-items-center flex-col">
            <h3>SOURCE</h3>
            <h3 className="text-xl">{props.source}</h3>
          </div>
        </span>
        <span className="flex flex-row border-y my-4 p-4 ">
          {props.trailerUrl != "" ? (
            <>
              <img
                className="w-1/3 h-fit object-cover"
                src={props.large_image_url}
              />
              <iframe
                src={props.trailerUrl}
                className="flex-grow"
                allowFullScreen
              />
            </>
          ) : (
            <img
              className="w-full h-96 object-contain"
              src={props.large_image_url}
            />
          )}
        </span>
        <span className="grid grid-cols-2 border-y my-4 p-4 ">
          <div className="flex place-content-center place-items-start flex-col">
            <h3 className="font-bold">Background</h3>
            <p>{props.background}</p>
          </div>
          <div className="flex place-content-center place-items-start flex-col">
            <h3 className="font-bold text-6xl">{props.year}</h3>
           
          </div>
        </span>
        <h2 className="px-4 text-lg font-bold">Description</h2>
        <p className="border-slate-500text-lg p-4">{props.desc}</p>
      </div>
      <a href={props.url} className="m-2 w-fit h-fit z-10">
        MyAnimeList
      </a>
    </>
  );
};
export default DetailedInfoBoard;
