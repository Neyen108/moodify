import React from 'react';

const AddDisplayWhite = ({ label, percent }) => {
  return (
    <React.Fragment>
      <h4 className='bold floating-two greenish'>{percent}</h4>
      <h4 className='bold greenish mt-3 mb-5'>{label}</h4>
    </React.Fragment>
  );
};

export default AddDisplayWhite;
