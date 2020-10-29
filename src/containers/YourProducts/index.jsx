import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import './index.scss';

const YourProducts = () => {
  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    imagesRoutes: ['https://i.imgur.com/tbdTkdl.png', 'https://i.imgur.com/ZGYDb62.png'],
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
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
        imagesRoutes: [...state.imagesRoutes, result.data.link],
      });
      console.log(result.data.link);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="your-products">
      <h2>Add a new product</h2>
      <form>
        <label htmlFor="name">
          <span>Name:</span>
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          <span>Description:</span>
          <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} />
        </label>
        <p>You can upload up to 5 images</p>
        <div className="uploaded-images">
          {
            state.imagesRoutes.map((image, i) => (
              <>
                <div className="image-container" key={i}>
                  <img src={image} alt={`upload ${i}`} key={i} className="image" />
                </div>
                <div className="icon-container">
                  <DeleteIcon />
                </div>
              </>
            ))
          }
        </div>
        <label htmlFor="image">
          <span>Upload Images: </span>
          <input type="file" id="image" name="image" onChange={uploadImage} />
        </label>
        <label htmlFor="price">
          <span>Item price: </span>
          <input type="text" name="price" id="price" placeholder="9.99" onChange={handleChange} />
        </label>
        <button type="submit">Add</button>
      </form>
      <button type="button">Cancel</button>
      <div className="all-products" />
    </div>
  );
};

export default YourProducts;
