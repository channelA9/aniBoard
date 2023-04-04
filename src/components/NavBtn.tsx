import React from "react";
import { Link } from "react-router-dom";
const NavBtn = (props: { route: string; routeStr: string }) => {
  return (
    <Link to={props.route}>
      <button className="w-full h-16 hover:bg-slate-100 bg-slate-200">{props.routeStr}</button>
    </Link>
  );
};

export default NavBtn;
