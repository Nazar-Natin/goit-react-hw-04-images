import React from 'react';
import { Puff as Loader } from 'react-loader-spinner';

const CustomLoader = () => {
  return (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default CustomLoader;
