import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { useStateValue } from '../../StateProvider';

const Product = ({
  id, title, image, price, rating,
}) => {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id, title, price, rating, image,
      },
    });
  };

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating).fill().map((_, i) => (
            <span role="img" aria-label="star" key={i}>⭐</span>
          ))}
        </div>
      </div>
      <div className="img-container">
        <img src={image} alt="product" />
      </div>
      <button type="button" onClick={addToCart}>Add to cart</button>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Product;
