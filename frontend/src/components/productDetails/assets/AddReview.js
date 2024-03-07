import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { FaAngellist, FaHeart } from "react-icons/fa6";

const AddReview = ({
  addToWishtHandler,
  submitReviewToggle,
  setRating,
  open,
  rating,
  comment,
  setComment,
  reviewSubmitHandler,
}) => {
  return (
    <>
      <div className="review-area">
        <DialogActions>
          <div>
            <FaHeart className="faheart" onClick={()=>addToWishtHandler()} />
          </div>
          <Button onClick={()=>submitReviewToggle()}>
            <FaAngellist /> Add Review
          </Button>
        </DialogActions>
        <Dialog
          className="review-main-div"
          area-aria-labelledby="simpale-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={parseFloat(rating)}
              readOnly={false}
              name="dd"
            />
            <textarea
              className="submitDialogtext"
              cols="10"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle}>Cancle</Button>
            <Button onClick={reviewSubmitHandler}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AddReview;
