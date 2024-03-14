import React, { useEffect, useState } from "react";
import Logo from "./assets/Logo";
import { Search } from "./assets/Search";
import { Wishlist } from "./assets/Wishlist";
import Cart from "./assets/Cart";
import "./style.css";
import { BottomHeader } from "./assets/BottomHeader";
import CallAction from "./assets/CallAction";
import { LoginLink } from "./assets/LoginLink";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";

export const Header = () => {
  //this state for mob nav togle
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSticky, setIsSticky] = useState(false);
  const location = window.location;
  const admin_Path = location.pathname.slice(1, 6);

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

  return (
    <>
      {/* <header className={adminHeader===true?'header-none':''}> */}
      <header className={`header sticky ${isSticky ? "sticky" : ""}`}>
        {user && user.role === "admin" ? <AdminHeader /> : null}
        {/* <TopHeader event={toggleContent} isContentVisible={isContentVisible} /> */}

        <>
          <div className={user && user.role === "admin"?"containor admin-header":"containor"}>
            <div className="nav-area">
              <div className="h-left-col nav-mon-cont">
                <Logo />
                {windowWidth < 767 &&
                  (!isContentVisible ? <LoginLink /> : null)}
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
        </>
      </header>
    </>
  );
};
