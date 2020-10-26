import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Item from '../Item';

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
        />
      ))
    }
  </div>
);

Order.propTypes = {
  order: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default Order;
