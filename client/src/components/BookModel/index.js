import React from 'react';

const Model = (props) => {
  let modelStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.8)',
  };

  return (
    <div className='modal show fade' style={modelStyle}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{props.title}</h5>
            <button type='button' className='btn-close' onClick={props.hide}></button>
          </div>
          <div className='modal-body'>
            <div className='clearfix'>
              <img src={props.img} alt='' className='col-md-3 ms-md-3 mb-3 float-md-end' />
              <p>{props.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
