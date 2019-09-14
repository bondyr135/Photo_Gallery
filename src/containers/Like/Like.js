import React from 'react';
import { NavLink } from 'react-router-dom';

import './Like.css';

const like = (props) => {
  return (
    <div>
      <NavLink exact to="/likes" className="bigLikeBackground" >
        <img className="bigLike"
          src={props.src || props.href}
          id={props.id}
          title={props.title}
          alt={props.title}
        />
      </NavLink>
      <NavLink className="delete" exact to="/likes" onClick={() => props.deleteLike(props.id)}>
        Remove from likes
      </NavLink>
    </div>
  )
}

export default like;