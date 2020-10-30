/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './index.scss';

const YourProducts = () => {
  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    imagesRoutes: [],
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async e => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Client-ID 8adc96648c0a8f2');

      const formdata = new FormData();
      formdata.append('image', e.target.files[0]);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
      };

      const response = await fetch('https://api.imgur.com/3/image', requestOptions);
      const result = await response.json();
      setState({
        ...state,
        imagesRoutes: [...state.imagesRoutes, {
          link: result.data.link,
          deletehash: result.data.deletehash,
        }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async e => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Client-ID 8adc96648c0a8f2');

      const formdata = new FormData();

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
      };

      const response = await fetch(`https://api.imgur.com/3/image/${e.target.value}`, requestOptions);
      const result = await response.json();
      if (result.status === 200) {
        setState({
          ...state,
          imagesRoutes: state.imagesRoutes.filter(image => image.deletehash !== e.target.value),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitForm = () => {
    console.log(state);
  };

  return (
    <div className="your-products">
      <h2>Add a new product</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          <span>Name:</span>
          <input type="text" name="name" id="name" onChange={handleChange} required />
        </label>
        <label htmlFor="description">
          <span>Description:</span>
          <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} required />
        </label>
        <p>You can upload up to 5 images</p>
        <div className="uploaded-images">
          {
            state.imagesRoutes.map(image => (
              <>
                <div className="image-container">
                  <img src={image.link} alt="uploaded" className="image" />
                </div>
                <button type="button" className="icon-container" onClick={deleteImage} value={image.deletehash}>X</button>
              </>
            ))
          }
        </div>
        <label htmlFor="image">
          <span>Upload Images: </span>
          <input type="file" id="image" name="image" onChange={uploadImage} disabled={state.imagesRoutes.length === 5 && true} />
        </label>
        <label htmlFor="price">
          <span>Item price: </span>
          <input type="text" name="price" id="price" placeholder="9.99" onChange={handleChange} required />
        </label>
        <button type="submit" disabled={state.imagesRoutes.length < 1 && true}>Add</button>
      </form>
      <button type="button">Cancel</button>
      <div className="all-products" />
    </div>
  );
};

export default YourProducts;
