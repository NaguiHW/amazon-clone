import React from 'react';
import './index.scss';

const Product = () => (
  <div className="product">
    <div className="product-info">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ducimus.</p>
      <p className="product-price">
        <small>$</small>
        <strong>11.99</strong>
      </p>
    </div>
    <div className="product-rating">
      <span role="img" aria-label="star">⭐</span>
      <span role="img" aria-label="star">⭐</span>
      <span role="img" aria-label="star">⭐</span>
    </div>
    <img src="https://images-na.ssl-images-amazon.com/images/I/61jisDA2N5L._AC_SX679_.jpg" alt="product" />
    <button type="button">Add to cart</button>
  </div>
);

export default Product;
