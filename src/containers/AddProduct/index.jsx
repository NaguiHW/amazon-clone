/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './index.scss';

const AddProduct = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const imagesRoutes = [];
  const { REACT_APP_IMGUR_CLIENT_ID } = process.env;

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const addImageToState = e => {
    const selectedImage = e.target.files[0];
    const formdata = new FormData();
    formdata.append('image', selectedImage);

    setState({
      ...state,
      images: [...state.images, {
        local: window.URL.createObjectURL(selectedImage),
        formdata,
      }],
    });
    // try {
    //   const myHeaders = new Headers();
    //   myHeaders.append('Authorization', 'Client-ID 8adc96648c0a8f2');

    //   const formdata = new FormData();
    //   formdata.append('image', e.target.files[0]);

    //   const requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: formdata,
    //   };

    //   const response = await fetch('https://api.imgur.com/3/image', requestOptions);
    //   const result = await response.json();
    //   setState({
    //     ...state,
    //     imagesRoutes: [...state.imagesRoutes, {
    //       link: result.data.link,
    //       deletehash: result.data.deletehash,
    //     }],
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const deleteImage = e => {
    setState({
      ...state,
      images: state.images.filter(image => image.local !== e.target.value),
    });
  };

  const submitForm = async e => {
    e.preventDefault();

    try {
      const dateNow = firebase.firestore.FieldValue.serverTimestamp();

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Client-ID ${REACT_APP_IMGUR_CLIENT_ID}`);

      const uploadImagesToServer = await Promise.all(state.images.map(async image => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: image.formdata,
          };

          const response = await fetch('https://api.imgur.com/3/image', requestOptions);
          const result = await response.json();
          console.log(result.data.link);

          imagesRoutes.push({
            link: result.data.link,
            deletehash: result.data.deletehash,
          });
        } catch (err) {
          console.error(err);
        }
      }));

      const product = await db
        .collection('products')
        .add({
          name: state.name,
          description: state.description,
          price: state.price,
          imagesRoutes,
          productOwner: user.uid,
          createdAt: dateNow,
        });

      history.replace('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="your-products">
      <h2>Add a new product</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          <span>Name:</span>
          <input type="text" name="name" id="name" onChange={handleChange} required autoComplete="off" />
        </label>
        <label htmlFor="description">
          <span>Description:</span>
          <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} required />
        </label>
        <p>You can upload up to 5 images</p>
        <div className="uploaded-images">
          {
            state.images.map(image => (
              <>
                <div className="image-container">
                  <img src={image.local} alt="uploaded" className="image" />
                </div>
                <button type="button" className="icon-container" onClick={deleteImage} value={image.local}>X</button>
              </>
            ))
          }
        </div>
        <label htmlFor="image">
          <span>Upload Images: </span>
          <input type="file" id="image" name="image" onChange={addImageToState} disabled={state.images.length === 5 && true} />
        </label>
        <label htmlFor="price">
          <span>Item price: </span>
          <input type="number" name="price" id="price" placeholder="9.99" onChange={handleChange} min="0" step="0.01" required autoComplete="off" />
        </label>
        <button type="submit" disabled={state.images.length < 1 && true}>Add</button>
      </form>
      <button type="button">Cancel</button>
      <div className="all-products" />
    </div>
  );
};

export default AddProduct;
