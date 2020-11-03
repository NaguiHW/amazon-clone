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
    imagesInEdit: [],
    newImages: [],
    deleteImages: [],
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
              id: doc.id,
            })),
            imagesInEdit: snapshot.docs.map(doc => ({
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

  const changeEditStatus = index => e => {
    e.preventDefault();

    const newProducts = [...state.myProducts];
    newProducts[index].edit = !newProducts[index].edit;

    const newEditedProducts = [...state.editedProducts];
    newEditedProducts[index].name = newProducts[index].name;
    newEditedProducts[index].description = newProducts[index].description;
    newEditedProducts[index].price = newProducts[index].price;
    const newImagesInEdit = [...state.imagesInEdit];
    newImagesInEdit[index].imagesRoutes = newProducts[index].imagesRoutes;

    setState({
      ...state,
      myProducts: newProducts,
      editedProducts: newEditedProducts,
      imagesInEdit: newImagesInEdit,
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

  const deleteImageFunction = (productIndex, imageIndex) => {
    setState({
      ...state,
      deleteImages: [...state.deleteImages,
        state.imagesInEdit[productIndex].imagesRoutes[imageIndex].link],
    });
    console.log(state.deleteImages);
    console.log(state.imagesInEdit[productIndex].imagesRoutes);
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      {
        state.myProducts?.map((product, i) => (
          product.edit ? (
            <EditProduct
              images={state.imagesInEdit[i].imagesRoutes}
              name={state.editedProducts[i].name}
              description={state.editedProducts[i].description}
              price={state.editedProducts[i].price}
              cancelButton={changeEditStatus(i)}
              changeHandler={updateEditedProductsState(i)}
              deleteImageFunction={deleteImageFunction}
              productIndex={i}
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
