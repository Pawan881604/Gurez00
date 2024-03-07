import React from "react";
import Logo from "../../header/assets/Logo";
import { NavLink } from "react-router-dom";


export const FootLeft = () => {
  return (
    <>
      <div className="foot-left-row foot">
        <div className="foot-left-col">
          <div className="foot-logo">
            {/* <Logo /> */}
            <h4>Contact Info</h4>
          </div>
          <div className="contacts">
            <p><strong>Email:</strong> <br/>
            <NavLink to={"/"}>shop@winkycoo.com</NavLink></p>
            <p>
              <strong>Working Hour:</strong><br/>
              Monday - Friday
              <br />
              10:00 AM to 7:00 PM
            </p>
            <p>
             <strong> Our Store Address:</strong>
              <br />
              #12, Second Floor, Khera Enclave, Sector 126, Kharar (Pb) - 140301
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};
