import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Loader from "../layout/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { ClearError, Login, Singup } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData/MetaData";
import { Button } from "@material-ui/core";

//----------Login function
const LoginSingup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, isAuthenticated, message, success, error } = useSelector(
    (state) => state.user
  );
  const Navigate = useNavigate();

  const loginTab = useRef(null);
  const SingupTab = useRef(null);
  const switchTab = useRef(null);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isAuthenticated) {
      Navigate("/account");
    }
    if (success) {
      alert.success(message);
    }
  }, [dispatch, error, alert, isAuthenticated, Navigate, success]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switchTab.current.classList.add("shiftToNeutral");
      switchTab.current.classList.remove("shiftToRight");

      SingupTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "Singup") {
      switchTab.current.classList.add("shiftToRight");
      switchTab.current.classList.remove("shiftToNeutral");

      SingupTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  //------------------Login Function--------------------
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginValue;
    dispatch(Login(email, password));
  };

  //------------------Singup Function--------------------
  const [singupValue, setsingupValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("./favicon.ico");
  const [avatar, setAvatar] = useState();

  const SingupInputHandle = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          // const originalFileName = e.target.files[0].name;
        }
      };
      setAvatar(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    } else {
      const { name, value } = e.target;
      setsingupValue({ ...singupValue, [name]: value });
    }
  };

  const singupSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = singupValue;
    const userDetails = {
      name,
      email,
      password,
    };

    // Convert the object to a JSON string and store it in localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    dispatch(Singup(email));
  };

  return (
    <>
      <MetaData
        title={"Registeration"}
        content={"Registeration"}
        keywords={"Registeration"}
      />

      <section className="registration-section">
        <div className="my-account-row">
          <div className="my-account-box">
            <div className="form-toggel">
              <h2 onClick={(e) => switchTabs(e, "login")}>Login</h2>
              <h2 onClick={(e) => switchTabs(e, "Singup")}>Singup</h2>
            </div>
            <span className="shiftToNeutral" ref={switchTab}></span>
          </div>
          {/* -------------------LOGIN FORM-------------------------- */}
          <div className="my-form-area" ref={loginTab}>
            <div className="form-cont" ref={SingupTab}>
              <div className="my--form">
                <form
                  className="login-form"
                  action="POST"
                  onSubmit={loginSubmit}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="input-list">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          autoComplete="on"
                          id="email-login"
                          value={loginValue.email}
                          onChange={inputHandle}
                        />
                      </div>
                      <div className="input-list">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          autoComplete="off"
                          id="password-login"
                          value={loginValue.password}
                          onChange={inputHandle}
                        />
                      </div>
                      <div className="input-list">
                        <Button type="submit">Login</Button>
                      </div>
                    </>
                  )}
                </form>
                <p>
                  <NavLink to={"/forget-password"}>Forget password</NavLink>
                </p>
              </div>
              {/* -------------------Singup FORM-------------------------- */}
              <div className="my--form">
                <form
                  className="login-form"
                  onSubmit={singupSubmit}
                  action="POST"
                  encType="multipart/from-data"
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="input-list">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          autoComplete="on"
                          id="name-input"
                          value={singupValue.name}
                          onChange={SingupInputHandle}
                        />
                      </div>
                      <div className="input-list">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          autoComplete="on"
                          id="email-singup"
                          value={singupValue.email}
                          onChange={SingupInputHandle}
                        />
                      </div>
                      <div className="input-list">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          autoComplete="off"
                          id="password-singup"
                          value={singupValue.password}
                          onChange={SingupInputHandle}
                        />
                      </div>
                      <div className="input-list">
                        <label htmlFor="cpassword">Password</label>
                        <input
                          type="password"
                          name="cpassword"
                          autoComplete="off"
                          id="Confirm-password-singup"
                          value={singupValue.cpassword}
                          onChange={SingupInputHandle}
                        />
                      </div>

                      <div className="input-list">
                        <Button type="submit">Singup</Button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSingup;
