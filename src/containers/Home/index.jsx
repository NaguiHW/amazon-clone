import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import HomeProducts from '../../components/HomeProducts';
import { db } from '../../firebase';
import './index.scss';

const Home = () => {
  const [state, setState] = useState({
    products: [],
  });

  useEffect(() => {
    db
      .collection('products')
      .limit(9)
      .onSnapshot(querySnapshot => (
        setState({
          ...state,
          products: querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            imagesRoutes: doc.data().imagesRoutes,
            id: doc.id,
          })),
        })
      ));
  }, []);

  return (
    <div className="home">
      <Banner />
      <HomeProducts products={state.products} />
    </div>
  );
};

export default Home;
