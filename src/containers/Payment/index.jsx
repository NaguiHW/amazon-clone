import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../../components/CartItems';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div className="payment">
      <h1>
        Checkout
        {' '}
        (
        <Link to="/cart">{cart?.length}</Link>
        )
      </h1>
      <div className="payment-section">
        <div className="payment-title">
          <h3>Delivery Address</h3>
        </div>
        <div className="payment-address">
          <p>{user?.email}</p>
          <p>123 React Lane</p>
          <p>Panama, Panama</p>
        </div>
      </div>
      <div className="payment-section">
        <div className="payment-title">
          <h3>Review items and delivery</h3>
        </div>
        <CartItems />
      </div>
      <div className="payment-section">
        <div className="payment-title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment-details" />
      </div>
    </div>
  );
};

export default Payment;
