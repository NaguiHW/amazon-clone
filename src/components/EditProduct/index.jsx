/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const EditProduct = ({
  imagesAndData,
  updateData,
  cancelButton,
  index,
}) => {
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [showImages, setShowImages] = useState(imagesAndData.imagesRoutes);
  const [firebaseImages, setFirebaseImages] = useState(imagesAndData.imagesRoutes);
  const [data, setdData] = useState({
    name: imagesAndData.name,
    description: imagesAndData.description,
    price: imagesAndData.price,
    id: imagesAndData.id,
  });
  const [saveButtonStatus, setSaveButtonStatus] = useState(false);

  const changeHandler = e => {
    setdData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const addImages = e => {
    const selectedImage = e.target.files[0];
    const formdata = new FormData();
    formdata.append('image', selectedImage);

    setImagesToAdd([
      ...imagesToAdd,
      {
        link: window.URL.createObjectURL(selectedImage),
        formdata,
      },
    ]);
  };

  const deleteImages = e => {
    const imageToDelete = e.target.value;

    if (imageToDelete.startsWith('blob')) {
      setImagesToAdd(
        imagesToAdd.filter(image => image.link !== imageToDelete),
      );
    } else {
      setFirebaseImages(
        firebaseImages.filter(image => image.link !== imageToDelete),
      );
    }
  };

  const saveButton = () => {
    if (showImages.length > 0) {
      try {
        setSaveButtonStatus(true);

        updateData(data.id,
          data.name,
          data.description,
          data.price,
          imagesToAdd,
          firebaseImages,
          index);
      } catch (err) {
        setSaveButtonStatus(false);
        console.error(err);
      }
    } else {
      alert('You need to have at least 1 image.')
    }
  };

  useEffect(() => {
    const totalImages = firebaseImages.concat(imagesToAdd);

    setShowImages(totalImages);
  }, [imagesToAdd, firebaseImages]);

  return (
    <div className="edit-product">
      <div className="images-area">
        <div className="images-container">
          {
            showImages?.map((image, i) => (
              <>
                <div className="image-container">
                  <img src={image.link} alt={image.link} key={i} className="image" />
                  <button type="button" className="icon-container" onClick={deleteImages} value={image.link}>X</button>
                </div>
              </>
            ))
          }
        </div>
        <input type="file" id="image" name="image" disabled={showImages?.length === 5 && true} onChange={addImages} />
      </div>
      <div className="product-info">
        <input type="text" className="title" value={data.name} name="name" onChange={changeHandler} required autoComplete="off" />
        <textarea value={data.description} className="description" name="description" onChange={changeHandler} required />
        <input type="number" className="price" value={data.price} min="0" step="0.01" required autoComplete="off" name="price" onChange={changeHandler} />
      </div>
      <div className="product-options">
        <button type="button" className="save" onClick={saveButton} disabled={saveButtonStatus && true}>Save</button>
        <button type="button" className="cancel" onClick={cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

EditProduct.propTypes = {
  imagesAndData: PropTypes.oneOfType([PropTypes.any]).isRequired,
  updateData: PropTypes.func.isRequired,
  cancelButton: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default EditProduct;
