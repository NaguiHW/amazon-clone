/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
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

  const { REACT_APP_IMGUR_CLIENT_ID } = process.env;

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

  const updateData = async (id, name, description, price, newImages, oldImages, index) => {
    try {
      const imagesRoutes = oldImages;
      const dateNow = firebase.firestore.FieldValue.serverTimestamp();

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Client-ID ${REACT_APP_IMGUR_CLIENT_ID}`);

      const uploadImagesToServer = await Promise.all(newImages.map(async image => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: image.formdata,
          };

          const response = await fetch('https://api.imgur.com/3/image', requestOptions);
          const result = await response.json();

          imagesRoutes.push({
            link: result.data.link,
            deletehash: result.data.deletehash,
          });
        } catch (err) {
          console.error(err);
        }
      }));

      const updateProduct = await db
        .collection('products')
        .doc(id)
        .update({
          name,
          description,
          price,
          imagesRoutes,
          updatedAt: dateNow,
        });
      changeEditStatus(index);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = index => () => {
    db
      .collection('products')
      .doc(state.myProducts[index].id)
      .delete()
      .then(() => {
        console.log('Product deleted successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      {
        state.myProducts?.map((product, i) => (
          product.edit ? (
            <EditProduct
              imagesAndData={product}
              cancelButton={changeEditStatus(i)}
              updateData={updateData}
              index={i}
            />
          ) : (
            <MyProduct
              images={product.imagesRoutes}
              name={product.name}
              description={product.description}
              price={product.price}
              editButton={changeEditStatus(i)}
              deleteButton={deleteProduct(i)}
              key={i}
            />
          )
        ))
      }
    </div>
  );
};

export default MyProducts;
