import React from "react";
import Item from "./Item";

const SearchBoard = (props:{listAnims: Array<any>, metricMethod: string}) => {
    let animProps = [<></>];
    if (props.listAnims.length > 0) {
        if (props.metricMethod == "title") {
            animProps = props.listAnims.map(anime => (
                <Item 
                title={anime.title}
                malUrl={anime.url}
                imgUrl={anime.images.webp.large_image_url}
                metric={""}
                />
            ));
        } else if (props.listAnims[0][props.metricMethod] != null) {
            animProps = props.listAnims.map(anime => (
                <Item 
                title={anime.title}
                malUrl={anime.url}
                imgUrl={anime.images.webp.large_image_url}
                metric={anime[props.metricMethod]}
                />
            ));
        } else if (props.metricMethod == "start_date" || props.metricMethod == "end_date"  ) {
            animProps = props.listAnims.map(anime => (
                <Item 
                title={anime.title}
                malUrl={anime.url}
                imgUrl={anime.images.webp.large_image_url}
                metric={anime.aired.string}
                />
            ));
        } else {
            animProps = props.listAnims.map(anime => (
                <Item 
                title={anime.title}
                malUrl={anime.url}
                imgUrl={anime.images.webp.large_image_url}
                metric={""}
                />
            ));
        }
    }


    return (
        <div className="w-full max-w-screen-md xl:max-w-screen-lg min-h-64 p-4 mt-2 bg-white  rounded-sm">
            <h2 className="font-bold text-2xl">Results</h2>
            <span className="flex place-content-evenly place-items-center">
                <h6>{props.listAnims.length > 0 ? (props.listAnims.length > 1 ? props.listAnims.length + ' items': props.listAnims.length + 'item') : 'There are no results!'}</h6>
            </span>
            <ul className="grid grid-cols-6 lg:grid-cols-8">
                {animProps}
            </ul>
        </div>
    )
}

export default SearchBoard;