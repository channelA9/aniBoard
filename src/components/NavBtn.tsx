import React from "react"

const NavBtn = (props: {
    route: string;

}) => {
    return (
        <button className='w-full h-16 bg-slate-100'>
            <a>
            {props.route}
            </a>
        </button>
        
    )
}

export default NavBtn;