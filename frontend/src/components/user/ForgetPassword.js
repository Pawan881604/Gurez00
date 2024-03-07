import { Button } from "@material-ui/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ClearError, userForgetPassword } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import "./style.css";
import {
  FORGET_PASSWORD_RESET,
  LOAD_USER_REQUEST,
  OTP_REQUEST,
} from "../../constants/UserConstants";
import MetaData from "../layout/metaData/MetaData";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(5);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, success, message, error } = useSelector(
    (state) => state.forgetPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success(message);
      dispatch({ type: FORGET_PASSWORD_RESET });
      navigate("/registration");
    }
  }, [error, alert, dispatch, success, count, navigate]);
  const emailSubmit = (e) => {
    e.preventDefault();
    dispatch(userForgetPassword(email));
  };

  return (
    <>
      <section className="otp-form-section">
        <div className="otp-form-area">
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                <form onSubmit={emailSubmit}>
                  <div className="input-list">
                    <input
                      type="eamil"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-list">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </>
            )}
          </>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
