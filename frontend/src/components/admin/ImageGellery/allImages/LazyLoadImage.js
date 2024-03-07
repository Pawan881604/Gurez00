import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "../../../layout/loader/Loader";
export const LazyLoadImage = ({ src, alt, handleImageClick, image }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the loading once
    rootMargin: "200px 0px", // Adjust the root margin based on your needs
  });

  //----------------------------------------------------

  const imageRef = useRef(null);

  const handleImageMouseDown = () => {
    if (imageRef.current) {
      imageRef.current.classList.toggle("imgSelectactive");
    }
  };

  return (
    <>
      <div ref={ref} className={`admin-image-cont-coll`}>
        {inView ? (
          <>
            <div ref={imageRef}>
              <img
                onMouseDown={handleImageMouseDown}
                // onMouseUp={handleImageMouseUp}
                onClick={(e) => {
                  handleImageClick(image);
                }}
                src={`https://gurez.onrender.com/${src}`}
                alt={image && image.altText?image.altText:'avatar'}
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
