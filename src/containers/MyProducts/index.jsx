import React, { useEffect, useState } from 'react';
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

  return (
    <div className="my-products">
      <h2>My Products</h2>
      {
        state.myProducts?.map((product, i) => (
          <div className="product-container" key={i}>
            <div className="images-container">
              {
                product.imagesRoutes.map((image, j) => (
                  <img src={image.link} alt={image.link} key={j} />
                ))
              }
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h5>{product.price}</h5>
            </div>
            <div className="product-options">
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default MyProducts;
