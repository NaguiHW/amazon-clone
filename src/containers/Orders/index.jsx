import React, { useEffect, useState } from 'react';
import Order from '../../components/Order';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';

const Orders = () => {
  const [{ user }] = useStateValue();
  const [state, setState] = useState({
    orders: [],
  });

  useEffect(() => {
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
          setState({
            ...state,
            orders: snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            })),
          })
        ));
    } else {
      setState({
        ...state,
        orders: [],
      });
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {
          state.orders?.map((order, i) => (
            <Order order={order} key={i} />
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
