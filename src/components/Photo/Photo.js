import React from 'react';

import './Photo.css';

const photo = (props) => {
  
    return (
    <img 
      src={props.src}
      className="Photo"
      alt={props.title}
      title={props.title}
      id={props.id}
      url={props.href}
      onClick={() => props.clicked(props)}
    />  
  )
};

export default photo;