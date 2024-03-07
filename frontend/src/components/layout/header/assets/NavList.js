import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../../../actions/CategoreAction";
import { FaWineBottle } from "react-icons/fa";
import { GiBeerBottle } from "react-icons/gi";
import { MdOutlineArrowDropDown } from "react-icons/md";

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
    {!catLoading?(
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
                    <NavLink to={`/product-category/${item.slug}`}>
                      {item.name}
                    </NavLink>
                    <MdOutlineArrowDropDown
                    
                      onClick={() => handleClick(i)}
                    />
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
                          <NavLink
                            to={`/product-category/${item.slug}/${subItem.slug}`}
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}

          <li>
            <NavLink to={"/contact-us"}>Contact Us</NavLink>
          </li>
          <li>
            <NavLink to={"/blog"}>Blog</NavLink>
          </li>
        </ul>
      </div>
      ):null}
    </>
  );
};