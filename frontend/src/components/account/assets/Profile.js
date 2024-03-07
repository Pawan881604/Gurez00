import { NavLink } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <>
          <div id="profile-page" className="profile-containor">
            <div className="prof-cont-row">
              <div className="user-profile-area">
                <div className="user-prf-e">
                  <div className="profile-img">
                    <img
                      src={
                        user && user.avatar && user.avatar.url
                          ? `http://localhost:8000/${user.avatar.url}`
                          : "/icon.png"
                      }
                      alt="User Avatar"
                    />
                  </div>
                  <p>
                    <NavLink to={"/account/me/update"}>Update Profile</NavLink>
                  </p>
                </div>
              </div>
              <div className="ot-det">
                <div className="userDetails">
                  <p>
                    <b>Name </b>
                    <span>{user.name}</span>
                  </p>
                  <p>
                    <b>Email </b>
                    <span>{user.email}</span>
                  </p>
                  <p>
                    <b>Joinig Date </b>
                    <span> {String(user.date).substr(0, 10)}</span>
                  </p>
                </div>
                <p>
                  <NavLink to={"/order/me"}>My orders</NavLink>
                </p>
                <p>
                  <NavLink to={"/account/password/update"}>
                    Password update
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Data not found</p>
        </>
      )}
    </>
  );
};
