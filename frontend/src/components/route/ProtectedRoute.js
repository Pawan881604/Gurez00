import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";

export const ProtectedRoute = (props) => {
  const { Component } = props;
  const data = props.isAdmin;
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const { success,message, error } = useSelector((state) => state.forgetPassword);

  const navigate = useNavigate(); // Change 'Navigate' to 'navigate'

  const [pageLoad, SetLoad] = useState(true);
  useEffect(() => {
    if (!loading) {
      SetLoad(false);
    }
  
    if (!loading && !isAuthenticated) {
      navigate("/registration"); // Corrected: Use 'navigate' instead of returning
      return;
    }
   
    if (isAuthenticated && !user.verified) {
      navigate("/otp-verification");

    }

   
    if (data === true && user && user.role !== "admin") {
      navigate("/404");
      return;
    }
  }, [SetLoad, loading, isAuthenticated, data, user, navigate]);

  return <>{pageLoad ? <Loader /> : <Component />}</>;
};

// export const ProtectedRoute = ({component:Component,...rest}) => {
//   const navigate = useNavigate();
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);

//   return(
//     <>
//       {!loading&&(
//         <Route
//         {...rest}
//         render={(props)=>{
//           if(!isAuthenticated){
//            return navigate('/')
//           }
//           return <Component {...props}/>
//         }}
//         />
//       )}
//     </>
//   );
// };
