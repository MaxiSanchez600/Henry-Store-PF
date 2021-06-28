import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../Components/NavBar/NavBar';
import SliderCarrousel from '../../Components/SliderCarrousel/SliderCarrousel';
import Footer from '../../Components/Footer/Footer';

function Landing() {
  return (
    <div>
      <NavBar />
      <SliderCarrousel isBanner={true} />
      <Link to="/home">Ver el catalogo!</Link>
      <Footer />
    </div>
  );
}

export default (Landing);