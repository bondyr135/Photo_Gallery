import React from "react";

import Photo from "../Photo/Photo";
import Spinner from "../UI/Spinner/Spinner";
import "./Photos.css";

const photos = (props) => {
  var parsedPhotos;

  // If there are actually photos received as props
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
      );
    });
  } else {
    // No photos received as props, returning spinner for loading
    parsedPhotos = <Spinner />;
  }

  return (
    <div className="Photos" key="Photos">
      {parsedPhotos}
    </div>
  );
};

export default photos;
