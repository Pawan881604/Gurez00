import React from "react";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";

const ImageSlider = ({ product, imgIndex, imgSlideFun, variantPriceValue }) => {
  const date = new Date(String(product?.createdate).substr(0, 10));
  const currentDate = new Date();
  const timeDiffrentt = Math.abs(date - currentDate);
  const sale_price = product && product.product_sale_price;
  const regular_price = product && product.product_regular_price;
  const minPrice =
    variantPriceValue.length === 0 ? sale_price : variantPriceValue[0];
  const maxPrice =
    variantPriceValue.length === 0 ? regular_price : variantPriceValue[1];

  return (
    <>
      <div className="slide-img slide-img-silde-cont">
        <ul
          style={{
            transform: `translateX(-${imgIndex * 100}%)`,
          }}
        >
          {product &&
            product.product_images &&
            product.product_images.map((item, i) => (
              <li key={i} onClick={() => imgSlideFun(i)}>
                <LazyLoadImages product={item} />
              </li>
            ))}
        </ul>
        <div className="product-discount">
          {product && product.product_regular_price ? (
            <span>
              {Math.abs((((minPrice - maxPrice) / maxPrice) * 100).toFixed(1))}%
              OFF
            </span>
          ) : null}
        </div>
        <div className="product-nO">
          {Math.floor(timeDiffrentt / (1000 * 60 * 60 * 24)) < 15 ? (
            <span>new</span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
