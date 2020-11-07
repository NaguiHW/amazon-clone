/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const MyProduct = ({
  images, name, description, price, deleteButton, editButton,
}) => (
  <div className="my-product">
    <div className="images-container">
      {
        images.map((image, i) => (
          <img src={image.link} alt={image.link} key={i} />
        ))
      }
    </div>
    <div className="product-info">
      <h3 className="title">{name}</h3>
      <p className="description">{description}</p>
      <h5 className="price">{price}</h5>
    </div>
    <div className="product-options">
      <button type="button" className="edit" onClick={editButton}>Edit</button>
      <button type="button" className="delete" onClick={deleteButton}>Delete</button>
    </div>
  </div>
);

MyProduct.propTypes = {
  images: PropTypes.oneOfType([PropTypes.any]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  editButton: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
};

export default MyProduct;
