import React from "react";

const ShippingDetails = ({ shiping_info }) => {
  return (
    <div className="order-details">
      <div className="billing-details">
        <h2>Billing Addresss</h2>
        <div className="Billing-details-area">
          {shiping_info && shiping_info ? (
            <>
              <div className="order-item">
                <div className="order-li-item-price">
                  <p>
                    <strong>Name</strong>
                    <span>{shiping_info.fullName}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>Phone No.</strong>
                    <span>{shiping_info.phoneNo}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>Address</strong>
                    <span>{shiping_info.address}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>City</strong>
                    <span>{shiping_info.city}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>Pincode</strong>
                    <span>{shiping_info.pinCode}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>State</strong>
                    <span>{shiping_info.state}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>country</strong>
                    <span>{shiping_info.country}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>State</strong>
                    <span>{shiping_info.state}</span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Shipping details not found</p>
          )}
        </div>
      </div>

      <div className="pay-mode">
        <h2>Shipping Address</h2>

        <div className="pay-mod-details">
          {shiping_info && shiping_info ? (
            <>
              <div className="order-item">
                <div className="order-li-item-price">
                  <p>
                    <strong>Name</strong>
                    <span>{shiping_info.fullName}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>Phone No.</strong>
                    <span>{shiping_info.phoneNo}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>Address</strong>
                    <span>{shiping_info.address}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>City</strong>
                    <span>{shiping_info.city}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>Pincode</strong>
                    <span>{shiping_info.pinCode}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>State</strong>
                    <span>{shiping_info.state}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>country</strong>
                    <span>{shiping_info.country}</span>
                  </p>
                </div>
                <div className="order-li-item-price">
                  <p>
                    <strong>State</strong>
                    <span>{shiping_info.state}</span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Shipping details not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
