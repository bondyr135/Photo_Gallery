import React from 'react';

import './Heart.css';

const heart = (props) => {
  const liked = (props.liked ? "Liked" : "Unliked");
  return(
    <img
      className={props.liked ? "Liked" : "Unliked"}
      alt="heart"
      src="https://img.icons8.com/metro/52/000000/like.png" 
      onClick={props.click} />
  )
}

export default heart;