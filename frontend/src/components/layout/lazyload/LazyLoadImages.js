import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "../loader/Loader";

const LazyLoadImages = ({ product }) => {
  
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the loading once
    rootMargin: "200px 0px", // Adjust the root margin based on your needs
  });
  //----------------------------------------------------

  const imageRef = useRef(null);
  return (
    <>
      <div className="img-cont" ref={ref} >
        {inView ? (
          <>
            <div ref={imageRef}>
              <img
                src={`http://localhost:8000/${product && product.path}`}
                alt={product ? product.altText : "avatar"}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default LazyLoadImages;
