import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { NavLink } from "react-router-dom";
export const MegaMenu = ({ open, removeDialog }) => {
  return (
    <>
      <Dialog
        className="mega-menu"
        area-aria-labelledby="simpale-dialog-title"
        open={open}
        maxWidth="lg"
        onClose={() => removeDialog()}
      >
        <DialogContent>
            <div  style={{ paddingBottom: 120 }}>


          <div className="cards-containor row flex-wrap ">
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
            <div style={{ padding: 5 }} className="card col-md-5">
              <div style={{ position: "relative" }} className="inner-card">
                <p style={{ position: "absolute", top: 10, left: 10 }}>Home</p>
                <img src="./depositphotos_318710218-stock-ph.webp" />
              </div>
            </div>
          </div>
          <div className="menu-list">
            <ul style={{padding:0}} className="row">
              <li >
                <NavLink to={"/order"}>Orders</NavLink>
              </li>
              <li >
                <NavLink to={"/account"}>Account</NavLink>
              </li>
              <li >
                <NavLink to={"/wishlist"}>List</NavLink>
              </li>
              <li >
                <NavLink to={"/cart"}>Cart</NavLink>
              </li>
            </ul>
          </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
