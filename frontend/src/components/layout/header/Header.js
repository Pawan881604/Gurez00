import React, { useEffect, useState } from "react";
import Logo from "./assets/Logo";
import { Search } from "./assets/Search";
import { Wishlist } from "./assets/Wishlist";
import Cart from "./assets/Cart";
import "./style.css";
import { BottomHeader } from "./assets/BottomHeader";
import CallAction from "./assets/CallAction";
import { LoginLink } from "./assets/LoginLink";
import { MobNav } from "./assets/MobNav";
import { FaBarsStaggered } from "react-icons/fa6";

export const Header = () => {
  //this state for mob nav togle
  const [isContentVisible, setIsContentVisible] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("scroll", handleScroll);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //nav visibale function
  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
  //-- nav hide function
  const toggleContentRemove = () => {
    setIsContentVisible(false);
  };

  return (
    <>
      {/* <header className={adminHeader===true?'header-none':''}> */}
      <header className={`header sticky ${isSticky ? "sticky" : ""}`}>
        {/* <TopHeader event={toggleContent} isContentVisible={isContentVisible} /> */}
        <div className="containor">
          <div className="nav-area">
            <div className="h-left-col nav-mon-cont">
              {/* {windowWidth < 767 &&
                (!isContentVisible ? (
                  <FaBarsStaggered
                    className="ham-show-toggle"
                    onClick={() => setIsContentVisible(true)}
                  />
                ) : null)} */}
              <Logo />
              {windowWidth < 767 && (!isContentVisible ? <LoginLink /> : null)}
              <Search />
            </div>
            <div className="h-right-col">
              <CallAction />
              <Wishlist />
              <Cart />
              {/* <LoginLink
                event={toggleContent}
                isContentVisible={isContentVisible}
              /> */}
            </div>
          </div>
        </div>

        <BottomHeader />
        {/* {windowWidth < 767 && (
          <MobNav
            toggleContentRemove={toggleContentRemove}
            isContentVisible={isContentVisible}
          />
        )} */}
      </header>
    </>
  );
};
