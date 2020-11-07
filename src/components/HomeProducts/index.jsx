import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import './index.scss';

const HomeProducts = ({ products }) => (
  <div className="home-products">
    {
      products?.map(product => (
        <Product
          title={product.name}
          image={product.imagesRoutes[0].link}
          price={product.price}
          rating={4}
          key={product.id}
          id={product.id}
        />
      ))
    }
  </div>
);

HomeProducts.propTypes = {
  products: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default HomeProducts;
