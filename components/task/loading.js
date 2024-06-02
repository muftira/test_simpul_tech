import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
  <div className="d-flex w-100 h-100 flex-column justify-content-center align-items-center">
    <ReactLoading type={type} color={color} height={85.41} width={85.41} />
    <p className='font-size-12 font-weight-600 mt-3'>Loading Task List ...</p>
  </div>
);

export default Loading;