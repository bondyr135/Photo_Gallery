import React from 'react';

import Photo from '../Photo/Photo';
import Spinner from '../UI/Spinner/Spinner';
import './Photos.css';

const photos = (props) => {
  var parsedPhotos;
  
  if (props.photos && props.photos.length > 0) {
    parsedPhotos = props.photos.map((photo) => {
      
      return (
        <Photo
          key={photo.id}
          src={photo.src}
          href={photo.href}
          title={photo.alt_description}
          id={photo.id}
          clicked={(chosenPhotoProps) => props.clicked(chosenPhotoProps)}
        />
      )
    })
  } else {
    parsedPhotos =  <Spinner />;
  }

  return (
    <div className="Photos" key="Photos">
      {parsedPhotos}
    </div>
  )
}

export default photos;