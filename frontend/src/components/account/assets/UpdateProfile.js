import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  LoadUser,
  updateUserProfile,
} from "../../../actions/UserAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../../constants/UserConstants";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";

export const UpdateProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./favicon.ico");
  const [avatar, setAvatar] = useState();

  const profileUpdateHeandle = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      setAvatar(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateProfileBtn = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(name, email, avatar ? avatar : avatarPreview));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user && user.avatar ? user.avatar.url : "/icon.png");
    }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated successfully");
      dispatch(LoadUser());
      Navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, Navigate, isUpdated, user]);

  return (
    <>
      <MetaData
        title={"Update Profile"}
        content={"Update Profile"}
        keywords={"Update Profile"}
      />
      {loading ? (
        <Loader />
      ) : user ? (
        <>
          <section className="section-cont updatepage">
            <div id="prod-cont" className="cont-area-h">
              <div className="my--form">
                <h1>Update Profile</h1>
                <form
                  className="login-form"
                  onSubmit={updateProfileBtn}
                  action="PUT"
                  encType="multipart/from-data"
                >
                  <div className="input-list">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="on"
                      id="name-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-list">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="on"
                      id="email-singup"
                      // value={singupValue.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-list">
                    <label htmlFor="avatar">avatar</label>
                    <div className="avatar-input-area">
                      <div className="input-list-avatar">
                        <img
                          src={
                            user && user.avatar && user.avatar.url
                              ? `http://localhost:8000/${user.avatar.url}`
                              : avatarPreview
                          }
                          alt="avatar preview"
                        />
                      </div>
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        // value={singupValue.avatar}
                        accept="image/"
                        onChange={profileUpdateHeandle}
                      />
                    </div>
                  </div>
                  <div className="input-list">
                    <input type="submit" value="Update Profile" />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Data not found</p>
      )}
    </>
  );
};
