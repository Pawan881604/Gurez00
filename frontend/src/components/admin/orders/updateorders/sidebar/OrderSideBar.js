import React from 'react'
import CustomerHistory from './CustomerHistory'
import { useSelector } from 'react-redux';
const OrderSideBar = () => {
    const { loading, Total_revenue, Total_orders, error } = useSelector(
        (state) => state.orderDetails
      );
  return (
    <>
    <CustomerHistory Total_revenue={Total_revenue} Total_orders={Total_orders}/>
    </>
  )
}

export default OrderSideBar
