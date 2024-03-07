import React from "react";
import CouponTab from "./CouponTab";
const CouponForm = ({
  handleSubmit,
  onchageInputValue,
  inputValue,
  setInputValue,
  //--- for product search input
  searchInput,
  searchHandle,
  handlerSearchDropdown,
  InputLength,
  productIds,
  removeItem,
  //--product cat
  productcatHandle,
  handerProductCatDropdown,
  removeProductCatItem,
  productCatIds,
  productCatInputToggle,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-field-area">
          <label>Name</label>
          <input
            type="text"
            value={inputValue.name}
            name="name"
            onChange={onchageInputValue}
          />
        </div>
        <div className="input-field-area">
          <label>Description</label>
          <textarea name="desscription" rows="4" cols="50"></textarea>
          <input
            type="text"
            value={inputValue.description}
            name="desscription"
            onChange={onchageInputValue}
          />
        </div>
        <div className="coupon-tabs">
          <CouponTab
            setInputValue={setInputValue}
            onchageInputValue={onchageInputValue}
            inputValue={inputValue}
            //--- for product search input
            searchInput={searchInput.search}
            searchHandle={searchHandle}
            handlerSearchDropdown={handlerSearchDropdown}
            InputLength={InputLength}
            productIds={productIds}
            removeItem={removeItem}
            //--product cat
            productcatHandle={productcatHandle}
            handerProductCatDropdown={handerProductCatDropdown}
            removeProductCatItem={removeProductCatItem}
            productCatIds={productCatIds}
            productCatInputToggle={productCatInputToggle}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default CouponForm;
