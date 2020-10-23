import React from 'react';
import CartItems from '../../components/CartItems';
import Subtotal from '../../components/Subtotal';
import './index.scss';

const Cart = () => (
  <div className="cart">
    <div className="left-side">
      <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="banner" />
      <div className="info-container">
        <h2 className="info-title">Your Shopping Cart</h2>
        <CartItems />
      </div>
    </div>
    <div className="right-side">
      <Subtotal />
    </div>
  </div>
);

export default Cart;
