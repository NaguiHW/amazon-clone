/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import EditProduct from '../../components/EditProduct';
import MyProduct from '../../components/MyProduct';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const MyProducts = () => {
  const [{ user }] = useStateValue();
  const [state, setState] = useState({
    myProducts: [],
  });

  useEffect(() => {
    if (user) {
      db
        .collection('products')
        .where('productOwner', '==', user?.uid)
        .onSnapshot(snapshot => (
          setState({
            ...state,
            myProducts: snapshot.docs.map(doc => ({
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              imagesRoutes: doc.data().imagesRoutes,
              edit: false,
            })),
          })
        ));
    } else {
      setState({
        ...state,
        myProducts: [],
      });
    }
  }, [user]);

  const changeEditStatus = index => e => {
    e.preventDefault();

    const newProducts = [...state.myProducts];
    newProducts[index].edit = true;
    setState({
      ...state,
      myProducts: newProducts,
    });
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      {
        state.myProducts?.map((product, i) => (
          product.edit ? (
            <EditProduct
              images={product.imagesRoutes}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ) : (
            <MyProduct
              images={product.imagesRoutes}
              name={product.name}
              description={product.description}
              price={product.price}
              editButton={changeEditStatus(i)}
              key={i}
            />
          )
        ))
      }
    </div>
  );
};

export default MyProducts;
