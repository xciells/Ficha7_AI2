// src/views/Home.jsx
import React from 'react';
import Carrossel from '../components/Carrossel';
import FilmesDestaque from '../components/FilmesDestaque';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <a name="top"></a>
      <Carrossel />
      <FilmesDestaque />
      <Footer />
    </>
  );
}

export default Home;
