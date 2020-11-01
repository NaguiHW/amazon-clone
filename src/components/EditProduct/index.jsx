/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const EditProduct = ({
  images, name, description, price, saveButton, cancelButton, deleteImage, changeHandler,
}) => (
  <div className="edit-product">
    <div className="images-area">
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
      <input type="file" id="image" name="image" disabled={images.length === 5 && true} />
    </div>
    <div className="product-info">
      <input type="text" className="title" value={name} name="name" onChange={changeHandler} />
      <textarea value={description} className="description" name="description" onChange={changeHandler} />
      <input type="number" className="price" value={price} min="0" step="0.01" required autoComplete="off" name="price" onChange={changeHandler} />
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
  changeHandler: PropTypes.func.isRequired,
};

export default EditProduct;
