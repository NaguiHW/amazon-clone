import React from 'react';
import Banner from '../../components/Banner';
import HomeProducts from '../../components/HomeProducts';
import './index.scss';

const Home = () => (
  <div className="home">
    <Banner />
    <HomeProducts />
  </div>
);

export default Home;
