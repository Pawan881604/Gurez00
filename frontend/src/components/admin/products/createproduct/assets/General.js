import React from "react";

const General = ({ setProduct_sale_price, setProduct_regular_price }) => {
  // const generalPrice = (e, position, state) => {
  //   const { value } = e.target;
  //   const numericValue = parseInt(value);

  //   // setGeneralPrice((prevPrices) => {
  //   //   if (!prevPrices) {
  //   //     prevPrices = [];
  //   //   }
  //   //   const updatedPrices = [...prevPrices] || [];
  //   //   updatedPrices[position] = {
  //   //     [position === 0 ? "regular_price" : "sale_price"]:
  //   //       numericValue && numericValue,
  //   //   };
  //   //   return updatedPrices;
  //   // });
  // };

  return (
    <>
      <div className="tab-general">
        <div className="tab-left">
          <label htmlFor="regularprice">Regular price</label>
        </div>
        <div className="tab-right">
          <input
            type="text"
            id="regularprice"
            onBlur={(e) => setProduct_regular_price(e.target.value)}
          />
        </div>
      </div>
      <div className="tab-general">
        <div className="tab-left">
          <label htmlFor="saleprice">Sale price</label>
        </div>
        <div className="tab-right">
          <input
            type="text"
            id="saleprice"
            onBlur={(e) => setProduct_sale_price(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default General;
