/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { SentimentSatisfied } from '@material-ui/icons';

const EditProduct = ({
  images,
  name,
  description,
  price,
  saveButton,
  cancelButton,
  deleteImageFunction,
  changeHandler,
  productIndex,
}) => {
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [showImages, setShowImages] = useState(
    images.map(image => image.link),
  );

  const addImages = e => {
    const selectedImage = e.target.files[0];
    const formdata = new FormData();
    formdata.append('image', selectedImage);

    setImagesToAdd([
      ...imagesToAdd,
      {
        src: window.URL.createObjectURL(selectedImage),
        formdata,
      },
    ]);
  };

  const deleteImages = e => {
    const imageToDelete = e.target.value;

    if (imageToDelete.startsWith('blob')) {
      setImagesToAdd(
        imagesToAdd.filter(image => image.src !== imageToDelete),
      );
    }

    setShowImages(
      showImages.filter(image => image !== imageToDelete),
    );
  };

  useEffect(() => {
    const newImages = [];

    imagesToAdd.map(image => (
      newImages.push(image.src)
    ));

    const totalImages = [...new Set(showImages.concat(newImages))];

    setShowImages(totalImages);
  }, [imagesToAdd]);

  return (
    <div className="edit-product">
      <div className="images-area">
        <div className="images-container">
          {
            showImages?.map((image, i) => (
              <>
                <div className="image-container">
                  <img src={image} alt={image} key={i} className="image" />
                  <button type="button" className="icon-container" onClick={deleteImages} value={image}>X</button>
                </div>
              </>
            ))
          }
        </div>
        <input type="file" id="image" name="image" disabled={showImages?.length === 5 && true} onChange={addImages} />
      </div>
      <div className="product-info">
        <input type="text" className="title" value={name} name="name" onChange={changeHandler} required autoComplete="off" />
        <textarea value={description} className="description" name="description" onChange={changeHandler} required />
        <input type="number" className="price" value={price} min="0" step="0.01" required autoComplete="off" name="price" onChange={changeHandler} />
      </div>
      <div className="product-options">
        <button type="button" className="edit" onClick={saveButton}>Save</button>
        <button type="button" className="delete" onClick={cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

EditProduct.propTypes = {
  images: PropTypes.oneOfType([PropTypes.any]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  saveButton: PropTypes.func.isRequired,
  cancelButton: PropTypes.func.isRequired,
  deleteImageFunction: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
};

export default EditProduct;
