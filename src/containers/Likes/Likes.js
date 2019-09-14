import React from 'react';
import { NavLink } from 'react-router-dom';

import './Likes.css';

const likes = (props) => {
  let show = [];


  if (props.likes.length > 0) {
    show = props.likes.map((id, i) => {
      let item = JSON.parse(window.localStorage.getItem(id));
      return (
        <NavLink exact to={`/likes/${item.id}`} key={item.id}>
          <img
            id={item.id}
            className="like"
            src={item.href}
            href={item.href}
            alt={item.alt}
            title={item.title ? item.title : null}
            onClick={() => props.click(item)}
          />
        </NavLink>
      )
    });
  } else {
    show = <p className="no_likes">Time to start liking some photos, right?</p>
  }

  return (
    <div className="Likes">
      {show}
    </div>
  )
}

export default likes;