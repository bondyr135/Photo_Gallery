import React from 'react';

import './Right.css';

const right = (props) => {


  return (
    <div className="navRight">
      <button className="rightNav" onClick={props.navRight} disabled={props.noRight}>
        <b>Go Right</b>
      </button>
      <br />

      <button className="rightNav" onClick={props.nxtPage} disabled={props.disabled}>New Page</button>
    </div>
  )
}

export default right;