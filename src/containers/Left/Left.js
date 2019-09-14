import React from 'react';

import './Left.css';

const left = (props) => {



  return (
    <div className="navLeft">
      <button className="leftNav" onClick={props.navLeft} disabled={props.noLeft}>
      <b>Go Left</b>
      </button>
      <br />

      <button className="leftNav" onClick={props.prevPage} disabled={props.disabled} >Page Back</button>
    </div>
  )
}

export default left;