import { Button } from "@material-ui/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ClearError, Otp, Singup, reSendOtp } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import "./style.css";
import { LOAD_USER_REQUEST, OTP_REQUEST } from "../../constants/UserConstants";
import MetaData from "../layout/metaData/MetaData";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const {
    loading,
    error,
    otp,
    isAuthenticated: otpisAuthenticated,
  } = useSelector((state) => state.otp);

  const {
    loading: resendOtpLoading,
    isAuthenticated: isAuthenticatedAuth,
    error: resendOtpError,
    reSendOtp: otpSendAgain,
  } = useSelector((state) => state.resendOtp);

  const [otpInput, setOtpInput] = useState(0);

  useMemo(() => {
    if (otpisAuthenticated) {
      dispatch({ type: OTP_REQUEST, payload: true });
      window.location.reload();
    }
  }, [otpisAuthenticated]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    // if (isAuthenticatedAuth) {
    //   alert.success(otpSendAgain);
    // }
    if (user === null && window.location.pathname === "/otp-verification") {
      navigate("/registration");
    }
    if (
      user &&
      user.verified &&
      window.location.pathname === "/otp-verification"
    ) {
      localStorage.removeItem("userDetails");
      navigate("/account");
    }
  }, [
    user,
    otpisAuthenticated,
    error,
    alert,
    dispatch,
    isAuthenticatedAuth,
    otpSendAgain,
  ]);

  const storedUserDetails = localStorage.getItem("userDetails");

  const otpSubmit = (e) => {
    e.preventDefault();
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      // console.log('ddddddddddddddddddddd')
      dispatch(Otp(userDetails, otpInput));
    }
  };

  const userOtpResend = (e) => {
    e.preventDefault();
    dispatch(reSendOtp(user._id));
  };

  return (
    <>
      <MetaData
        title={"Otp Verification"}
        content={"Otp Verification"}
        keywords={"Otp Verification"}
      />

      <section className="otp-form-section">
        <div className="otp-form-area">
          <>
            {loading ? (
              <Loader />
            ) : (
              <form onSubmit={otpSubmit}>
                <p>{user && user.email}</p>
                <div className="input-list">
                  <input
                    type="number"
                    placeholder="Enter Otp"
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                </div>
                <div className="input-list">
                  <Button type="submit">Submit OTP</Button>
                </div>
              </form>
            )}
            <div>
              <Button onClick={userOtpResend}>
                {resendOtpLoading ? "loding..." : <>Resend otp</>}
              </Button>
            </div>
          </>
        </div>
      </section>
    </>
  );
};

export default OtpVerification;
