import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './index.scss';

const Subtotal = () => (
  <div className="subtotal">
    <CurrencyFormat
      renderText={value => (
        <>
          <p>
            Subtotal (0 items):
            {' '}
            <strong>0</strong>
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
      value={0}
      displayType="text"
      prefix="$"
    />
    <button type="button">Proceed to Checkout</button>
  </div>
);

export default Subtotal;
