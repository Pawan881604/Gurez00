import React, { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { BsLayers, BsCartDash } from "react-icons/bs";
import "./BottomNav.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MobNav } from "../header/assets/MobNav";

import { MegaMenu } from "./MegaMenu";

function BottomNav() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);

  const nav = [
    { link: "/", icon: <IoHomeOutline /> },
    { link: "/user-dashboard", icon: <FaRegUser /> },
    { link: "/order/me", icon: <BsLayers /> },
    { link: "/cart", icon: <BsCartDash /> },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(open);
  const pageHabdler = (i) => {
    switch (i) {
      case 0:
        setOpen(false);

        navigate("/");
        break;
      case 1:
        setOpen(false);
        navigate("/user-dashboard");
        break;
      case 3:
        setOpen(false);
        navigate("/cart");
        break;
      default:
        break;
    }
    setIsContentVisible(false);
    setActiveTab(activeTab);
    if (i === 2) {
      setOpen(!open);
    }
  };

  const removeDialog = () => {
    setOpen(false);
  };
  const toggleContentRemove = () => {
    setOpen(false);
    setIsContentVisible(false);
  };
  const toggleContentadd = () => {
    setOpen(false);
    setIsContentVisible(!isContentVisible);
  };
  return (
    <>
      <MegaMenu open={open} removeDialog={removeDialog} />
      <div className="mob-navigate">
        <div className="mob-icon">
          {nav.map((item, i) => (
            <span key={i} onClick={() => pageHabdler(i)}>
              {/* <NavLink
                className={activeTab ? null : "bottom-active"}
                to={item.link}
              > */}
              {item.icon}
              {/* </NavLink> */}
            </span>
          ))}

          <RxHamburgerMenu onClick={toggleContentadd} />
        </div>
        {windowWidth < 767 && (
          <MobNav
            toggleContentRemove={toggleContentRemove}
            isContentVisible={isContentVisible}
          />
        )}
      </div>
    </>
  );
}

export default BottomNav;
