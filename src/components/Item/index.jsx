import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { useStateValue } from '../../StateProvider';

const Item = ({
  id, image, title, price, rating, hideButton,
}) => {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    });
  };

  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <div className="item-info">
        <p className="item-title">{title}</p>
        <p className="item-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating).fill().map((_, i) => (
            <span role="img" aria-label="star" key={i}>⭐</span>
          ))}
        </div>
        {
          !hideButton && (
            <button type="button" onClick={removeFromCart}>Remove from cart</button>
          )
        }
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  hideButton: PropTypes.bool.isRequired,
};

export default Item;
