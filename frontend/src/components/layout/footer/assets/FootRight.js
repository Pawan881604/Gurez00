import React from "react";
import { NavLink } from "react-router-dom";

export const FootRight = () => {
  return (
    <>
      <div className="foot-right-row foot">
        <div className="foot-right-col">
          <h4>Quick Links</h4>
          <ul className="foot-list">
          <li>
              <NavLink to={"/registration"}>Login/Signup</NavLink>
            </li>
            <li>
              <NavLink to={"/account"}>My Account</NavLink>
            </li>
            <li>
              <NavLink to={"/shop"}>Shop</NavLink>
            </li>
            <li>
              <NavLink to={"/wishlist"}>Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
