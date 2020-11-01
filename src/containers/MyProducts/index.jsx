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
    editedProducts: [],
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
            editedProducts: snapshot.docs.map(doc => ({
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              imagesRoutes: doc.data().imagesRoutes,
              id: doc.id,
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
    newProducts[index].edit = !newProducts[index].edit;
    setState({
      ...state,
      myProducts: newProducts,
    });
  };

  const updateEditedProductsState = index => e => {
    const newEditedProducts = [...state.editedProducts];
    newEditedProducts[index][e.target.name] = e.target.value;

    setState({
      ...state,
      editedProducts: newEditedProducts,
    });
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      {
        state.myProducts?.map((product, i) => (
          product.edit ? (
            <EditProduct
              images={state.editedProducts[i].imagesRoutes}
              name={state.editedProducts[i].name}
              description={state.editedProducts[i].description}
              price={state.editedProducts[i].price}
              cancelButton={changeEditStatus(i)}
              changeHandler={updateEditedProductsState(i)}
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
