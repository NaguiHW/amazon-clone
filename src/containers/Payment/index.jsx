import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import Item from '../../components/Item';
import { db } from '../../firebase';
import { getCartTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [state, setState] = useState({
    error: null,
    disabled: true,
    succeeded: false,
    processing: '',
    clientSecret: true,
  });

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });

      setState({
        ...state,
        clientSecret: response.data.clientSecret,
      });
    };

    getClientSecret();
  }, [cart]);

  const handleSubmit = async e => {
    e.preventDefault();
    setState({
      ...state,
      processing: true,
    });

    const payload = await stripe.confirmCardPayment(state.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    }).then(({ paymentIntent }) => {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setState({
        ...state,
        succeeded: true,
        error: null,
        processing: false,
      });

      dispatch({
        type: 'EMPTY_CART',
      });

      history.replace('/orders');
    });
  };

  const handleChange = e => {
    setState({
      ...state,
      disabled: e.empty,
      error: e.error ? e.error.message : '',
    });
  };

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
        <div className="payment-items">
          {
            cart?.map(({
              id, image, title, price, rating,
            }, i) => (
              <Item
                id={id}
                image={image}
                title={title}
                price={price}
                rating={rating}
                key={i}
                hideButton
              />
            ))
          }
        </div>
      </div>
      <div className="payment-section">
        <div className="payment-title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment-details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment-price-container">
              <CurrencyFormat
                renderText={value => (
                  <>
                    <p>
                      Subtotal (
                      {cart.length}
                      {' '}
                      items
                      ):
                      {' '}
                      <strong>{value}</strong>
                    </p>
                  </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType="text"
                prefix="$"
                thousandSeparator
              />
              <button type="submit" disabled={state.processing || state.disabled || state.succeeded}>{state.processing ? <p>Processing</p> : 'Buy Now'}</button>
            </div>
            {state.error && <div>{state.error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
