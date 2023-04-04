import React from "react";
import { Link } from "react-router-dom";
const Item = (
    props:{
        title: string;
        malId: string;
        imgUrl: string;
        metric: any;
    }
) => {
    return (
        <li>
            <Link to={`./anime/${props.malId}`} className="m-2 w-4/5 h-fit flex-col flex place-items-center place-content-center">
                <h3 className="h-8 w-full  text-ellipsis overflow-hidden whitespace-nowrap">{props.title}</h3>
                <img className="w-full h-32 object-cover" src={props.imgUrl}/>
                <h6 className='p-2'>{props.metric}</h6>
            </Link>
        </li>
    )
}

export default Item