import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import { getCartTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const Subtotal = () => {
  const [{ cart, user }] = useStateValue();
  const history = useHistory();

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
          ? <button type="button" onClick={() => history.push('/payment')}>Proceed to Checkout</button>
          : <button type="button" onClick={() => history.push('/login')}>Sign In</button>
      }
    </div>
  );
};

export default Subtotal;
