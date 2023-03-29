import React from "react";

const Item = (
    props:{
        title: string;
        malUrl: string;
        imgUrl: string;
        metric: any;
    }
) => {
    return (
        <li>
            <a href={props.malUrl} className="m-2 w-4/5 h-fit flex-col flex place-items-center place-content-center">
                <h3 className="h-8 w-full  text-ellipsis overflow-hidden whitespace-nowrap">{props.title}</h3>
                <img className="w-full h-32 object-cover" src={props.imgUrl}/>
                <h6 className='p-2'>{props.metric}</h6>
            </a>
        </li>
    )
}

export default Item