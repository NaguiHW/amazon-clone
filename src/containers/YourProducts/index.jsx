import React, { useState } from 'react';
import './index.scss';

const YourProducts = () => {
  const [state, setState] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    imagesRoute: [],
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
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
        <label htmlFor="image">
          <span>Upload Images: </span>
          <input type="file" id="image" name="image" onChange={handleChange} />
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
