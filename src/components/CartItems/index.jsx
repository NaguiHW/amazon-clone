import React from 'react';
import { useStateValue } from '../../StateProvider';
import Item from '../Item';

const CartItems = () => {
  const [{ cart }] = useStateValue();

  return (
    <div className="cart-items">
      {
        cart.map(({
          id, image, title, price, rating,
        }) => (
          <Item
            id={id}
            image={image}
            title={title}
            price={price}
            rating={rating}
            key={id}
          />
        ))
      }
    </div>
  );
};

export default CartItems;
