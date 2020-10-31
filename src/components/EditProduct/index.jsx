/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const EditProduct = ({
  images, name, description, price, saveButton, cancelButton, deleteImage
}) => (
  <div className="edit-product">
    <div className="images-container">
      {
        images.map((image, i) => (
          <>
            <div className="image-container">
              <img src={image.link} alt={image.link} key={i} className="image" />
              <button type="button" className="icon-container" onClick={deleteImage} value={image.deletehash}>X</button>
            </div>
          </>
        ))
      }
    </div>
    <div className="product-info">
      <input type="text" className="title" value={name} />
      <textarea value={description} className="description" />
      <input type="number" className="price" value={price} min="0" step="0.01" required autoComplete="off" />
    </div>
    <div className="product-options">
      <button type="button" className="edit" onClick={saveButton}>Save</button>
      <button type="button" className="delete" onClick={cancelButton}>Cancel</button>
    </div>
  </div>
);

EditProduct.propTypes = {
  images: PropTypes.oneOfType([PropTypes.any]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  saveButton: PropTypes.func.isRequired,
  cancelButton: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

export default EditProduct;
