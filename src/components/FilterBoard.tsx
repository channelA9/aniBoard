import React from "react";

const FilterBoard = (props: {
    inputs: any,
    onSubmit: any,
    handleChange: any,
}) => {
  return (
    <div className="w-full max-w-screen-md xl:max-w-screen-lg h-fit p-4 bg-white  rounded-sm">
      <h1 className="text-2xl font-bold">Filters</h1>
      <form className="grid grid-cols-6 grid-rows-2">
        <div className="p-2 flex flex-col col-span-full place-items-start place-content-center">
          <label className="text-xl">Title</label>
          <input
            type="text"
            name="title"
            className="rounded-sm h-12 w-full mr-40 text-lg"
            placeholder="(e.g. Steins; Gate...)"
            onChange={props.handleChange}
            value={props.inputs.title}
          />
        </div>

        <div className="flex flex-col p-4 col-span-1 border-r">
          <label>Status</label>
          <div className="m-2 text-sm flex flex-row place-items-evenly place-content-start">
            <input
              className=" mr-2"
              type="radio"
              id="all"
              name="status"
              value=""
              checked={props.inputs.status === ''}
              onChange={props.handleChange}
            />
            <label htmlFor="airing">All</label>
          </div>
          <div className="m-2 text-sm flex flex-row place-items-evenly place-content-start">
            <input
              className=" mr-2"
              type="radio"
              id="airing"
              name="status"
              value="airing"
              checked={props.inputs.status === 'airing'}
              onChange={props.handleChange}
            />
            <label htmlFor="airing">Airing</label>
          </div>
          <div className="m-2 text-sm flex flex-row place-items-evenly place-content-start">
            <input
              className="mr-2"
              type="radio"
              id="complete"
              name="status"
              value="complete"
              checked={props.inputs.status === 'complete'}
              onChange={props.handleChange}
            />
            <label htmlFor="airing">Complete</label>
          </div>
          <div className="m-2 text-sm flex flex-row place-items-evenly place-content-start">
            <input
              className="mr-2"
              type="radio"
              id="upcoming"
              name="status"
              value="upcoming"
              checked={props.inputs.status === 'upcoming'}
              onChange={props.handleChange}
            />
            <label htmlFor="airing">Upcoming</label>
          </div>
        </div>

        <div className="flex flex-col p-4 col-span-2 border-r">
          <label>Rating Filter</label>
          <div className="m-2 text-sm flex flex-col place-items-evenly place-content-start">
            <label htmlFor="min_rating">Min Rating</label>
            <input
              type="range"
              min="0"
              max="10"
              name="min_rating"
              value={props.inputs.min_rating}
              onChange={props.handleChange}
              className="w-full"
              id="min_rating"
            />
          </div>
          <div className="m-2 text-sm flex flex-col place-items-evenly place-content-start">
            <label htmlFor="max_rating">Max Rating</label>
            <input
              type="range"
              min="1"
              max="10"
              name="max_rating"
              value={props.inputs.max_rating}
              onChange={props.handleChange}
              className="w-full"
              id="max_rating"
            />
          </div>
          <div className="flex font-bold place-content-center">
            <h3>{props.inputs.min_rating}-{props.inputs.max_rating}</h3>
          </div>
        </div>

        <div className="flex flex-col p-4 col-span-2">
          <label>Sort by</label>
          <select name="sort_by" value={props.inputs.sort_by} onChange={(e) => props.handleChange(e)}>
            <option value="title">Title</option>
            <option value="type">Type</option>
            <option value="rating">Rating</option>
            <option value="start_date">Start Date</option>
            <option value="end_date">End Date</option>
            <option value="episodes">Episodes</option>
            <option value="score">Score</option>
            <option value="rank">Rank</option>
            <option value="popularity">Popularity</option>
            <option value="members">Members</option>
            <option value="favorites">Favorites</option>
          </select>
          <div className="m-2 text-sm flex flex-row place-items-evenly place-content-start">
            <input
              className=" mr-2"
              type="radio"
              id="desc"
              name="sort_order"
              value="desc"
              checked={props.inputs.sort_order === 'desc'}
              onChange={props.handleChange}
            />
            <label htmlFor="airing">Descending</label>
          </div>
          <div className="m-2 text-sm flex flex-row place-items-evenly place-content-start">
            <input
              className=" mr-2"
              type="radio"
              id="asc"
              name="sort_order"
              value="asc"
              checked={props.inputs.sort_order === 'asc'}
              onChange={props.handleChange}
            />
            <label htmlFor="airing">Ascending</label>
          </div>
        </div>

        <div className="flex place-items-center place-content-center col-span-1">
            <button type="submit" onClick={props.onSubmit} className="bg-blue-600 p-4 text-4xl h-full w-full rounded-md text-white font-bold">GO</button>
        </div>

      </form>
    </div>
  );
};

export default FilterBoard;
