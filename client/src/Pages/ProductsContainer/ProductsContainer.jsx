import React from 'react';

import NavBar from '../../Components/NavBar/NavBar';
import Filter from '../../Components/Filters/Filters';
import Products from '../../Components/Products/Products';

function ProductsContainer() {
  return (
    <div>
      <h1>Henry Store!</h1>
      <NavBar />
      <Filter />
      <Products />
    </div>
  );
}

export default ProductsContainer;