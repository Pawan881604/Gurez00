import React from "react";
import { NavList } from "./NavList";
import { Search } from "./Search";
import { FaXmark } from "react-icons/fa6";


export const MobNav = ({ isContentVisible, toggleContentRemove }) => {
  return (
    <>
      <div
        id={isContentVisible === true ? "nav-trans" : "no-trans"}
        className="mob-nav"
      >
        <div className="mob-call">
          <div className="hab-remove">
            <FaXmark onClick={toggleContentRemove} />
          </div>
          <Search />
          <NavList  toggleContentRemove={toggleContentRemove} />
        </div>
      </div>
    </>
  );
};
