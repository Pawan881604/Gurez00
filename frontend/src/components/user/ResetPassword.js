import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClearError, resetPassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PASSWORD_RESET } from "../../constants/UserConstants";
import Loader from "../layout/loader/Loader";

const ResetPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, isUpdated, message, error } = useSelector(
    (state) => state.resetPassword
  );
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success(message);
      Navigate("/registration");
      dispatch({ type: RESET_PASSWORD_RESET });
    }
  }, [error, alert, isUpdated, dispatch, Navigate, message]);

  const resetSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password, Cpassword));
  };

  return (
    <section className="otp-form-section">
      <div className="otp-form-area">
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <form onSubmit={resetSubmit}>
                <div className="input-list">
                  <input
                    type="password"
                    placeholder="New password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-list">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>
                <div className="input-list">
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </>
          )}
        </>
      </div>
    </section>
  );
};

export default ResetPassword;
