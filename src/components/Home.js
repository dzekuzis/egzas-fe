import React from 'react';
import logo from '../assets/logo.png'

const Home = () => {
    return (
        <div className='text-center'>
        <h1 className='margin'>Ugdymo istaigu Ieskiklis</h1>
        <div>
          <img className='' src={logo} alt="Logo" />
        </div>
        <h5 className='mt-3, marginas'>Kad pamatyt visas Ugdymo istaigas jus turite prisijungti</h5>
      </div>
    );
};

export default Home;