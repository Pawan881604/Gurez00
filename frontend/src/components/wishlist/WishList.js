import React from 'react'
import {useDispatch,useSelector}from 'react-redux';
import { WishListItem } from './assets/WishListItem';
import './wishlist.css'
import { NavLink } from 'react-router-dom';
const WishList = () => {
  const {wishL}= useSelector(state=>state.wishList);
console.log(wishL)
  return (
   <>
   <section className="section-cont">
        <div id="cart-cont" className="cont-area-h">
          {wishL&& wishL.length === 0 ? (
            <>
              <div className="cart-emty">
                <h1>WishList is Emty</h1>
                <p>
                  <NavLink to={"/shop"}>View product</NavLink>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="page-cart">
                <div className="cart-page-header">
                  <h1>My WishList</h1>
                </div>
                <div className="cart-containor">
                  {wishL&&wishL.map((item,i)=> 
                  <WishListItem key={i} item={item} />
                  )}
                </div>
                
              </div>
            </>
          )}
        </div>
      </section>
   </>
  )
}

export default WishList