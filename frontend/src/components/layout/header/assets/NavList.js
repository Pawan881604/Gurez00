import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../../../actions/CategoreAction";
import { FaWineBottle } from "react-icons/fa";
import { GiBeerBottle } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const NavList = ({ toggleContentRemove }) => {
  const data = useParams();

  const [visible, setVisible] = useState(null);

  const handleClick = (i) => {
    setVisible((prevVisible) => (prevVisible === i ? null : i));
  };
  const dispatch = useDispatch();

  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const icons = [<FaWineBottle />, <GiBeerBottle />];
  return (
    <>
      {!catLoading ? (
        <div className="nav-col nav-li-list">
          <ul className="nav-list parent-navlist">
            <li>
              <NavLink to={"/shop"} onClick={toggleContentRemove}>
                Shop
              </NavLink>
            </li>
            {allcategroes &&
              allcategroes
                .filter((item) => item.categorystatus === true)
                .map((item, i) => (
                  <li key={i}>
                    <div className="mob-list">
                      <span onClick={toggleContentRemove}>
                        <NavLink to={`/product-category/${item.slug}`}>
                          {item.name}
                        </NavLink>
                      </span>
                      <span onClick={() => handleClick(i)}>
                        {visible === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </span>
                    </div>
                    <ul
                      className={
                        visible === i
                          ? "child-navlist list-active"
                          : "child-navlist "
                      }
                    >
                      {item.childs
                        .filter((item) => item.subcategorystatus === true)
                        .map((subItem, i) => (
                          <li key={i}>
                            <span onClick={toggleContentRemove}>
                              <NavLink
                                to={`/product-category/${item.slug}/${subItem.slug}`}
                              >
                                {subItem.name}
                              </NavLink>
                            </span>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}

            <li onClick={toggleContentRemove}>
              <NavLink to={"/contact-us"}>Contact Us</NavLink>
            </li>
            <li onClick={toggleContentRemove}>
              <NavLink to={"/blog"}>Blog</NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="nav-col nav-li-list">
          <div style={{    maxWidth: '65%',margin:'0px auto',padding:'17px 0'}} className="nav-list parent-navlist">
            {/* <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" />{" "}
            <div style={{margin:'5px 0'}} className="animated-background col3" /> */}
          </div>
        </div>
      )}
    </>
  );
};
