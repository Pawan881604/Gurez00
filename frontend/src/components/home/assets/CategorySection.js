import React from "react";
import { NavLink } from "react-router-dom";

export const CategorySection = () => {
  const cat = [
    {
      Cname: "Dolls",
      img: "https://winkycoo.com/wp-content/uploads/2022/05/1-3.png",
      link: "dolls",
    },
    {
      Cname: "Animals",
      img: "https://winkycoo.com/wp-content/uploads/2022/05/Animals.png",
      link: "animals",
    },
    {
      Cname: "School Bags",
      img: "https://winkycoo.com/wp-content/uploads/2022/05/Animals-1.png",
      link: "school-bags",
    },
    {
      Cname: "Kids Essential",
      img: "https://winkycoo.com/wp-content/uploads/2022/05/5.png",
      link: "kids-essential",
    },
    {
      Cname: "Teddies",
      img: "https://winkycoo.com/wp-content/uploads/2022/05/2-3.png",
      link: "teddies",
    },
    {
      Cname: "Our Creations",
      img: "https://winkycoo.com/wp-content/uploads/2022/05/3-3.png",
      link: "our-creations",
    },
  ];
  return (
    <>
      <section className="section-cont">
        <div className="coll-title">
          <h2>Our Category</h2>
        </div>
        <div className="post-cat-cont cont-area-h">
          <div className="post-cat-cont-area">
            {cat &&
              cat.map((item, i) => (
                <div className="cate-card" key={i}>
                  <NavLink to={`/category/${item.link}`}>
                    <img src={item.img} alt={item.Cname} />
                  </NavLink>
                  {/* <p>{item.Cname}</p> */}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
