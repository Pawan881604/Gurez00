import React from "react";
import { StarComponent } from "./StarComponent";
import TimeAndDate from "../../layout/time/TimeAndDate";

const ReviewCard = ({ review, length }) => {

  return (
    <>
      <div className="review-card">
        <div className="rev-img">
          {/* <img src="/logo512.png" alt="user" /> */}
          <img
            src={
              review.user
                ? `http://localhost:8000/${
                    review.user && review.user.avatar && review.user.avatar.url
                  }`
                : "/icon.png"
            }
            alt="user"
          />
        </div>
        <div className="rev-card-cont">
          <StarComponent review={review.rating} />
          <h4>
            By <span>{review.user && review.user.name}</span>
          </h4>
          <p>{review.comment}</p>
          <TimeAndDate time={review.createdate} />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
