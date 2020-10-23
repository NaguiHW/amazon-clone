import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { getCartTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const Subtotal = () => {
  const [{ cart, user }] = useStateValue();

  return (
    <div className="subtotal">
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
            <small className="subtotal-gift">
              <label htmlFor="check-gift">
                <input type="checkbox" name="check-gift" id="check-gift" />
                <p>This order contains a gift</p>
              </label>
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType="text"
        prefix="$"
        thousandSeparator={true}
      />
      {
        user
          ? <button type="button">Proceed to Checkout</button>
          : <Link to="/login"><button type="button">Sign In</button></Link>
      }
    </div>
  );
};

export default Subtotal;
