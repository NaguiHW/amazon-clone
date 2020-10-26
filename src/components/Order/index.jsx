import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import Item from '../Item';
import './index.scss';

const Order = ({ order }) => (
  <div className="order">
    <h2>Order</h2>
    <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
    <p className="order-id">
      <small>{order.id}</small>
    </p>
    {
      order.data.cart?.map(({
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
    <CurrencyFormat
      renderText={value => (
        <h3 className="order-total">
          Order Total:
          {' '}
          {value}
        </h3>
      )}
      decimalScale={2}
      value={order.data.amount / 100}
      displayType="text"
      prefix="$"
      thousandSeparator
    />
  </div>
);

Order.propTypes = {
  order: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default Order;
