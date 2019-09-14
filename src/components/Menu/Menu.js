import React, { Component } from 'react';

import './Menu.css';
import Photos from '../Photos/Photos';
import Right from '../../containers/Right/Right';
import Left from '../../containers/Left/Left';


class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: this.props.photos.slice(0, 1),
      shownPhotos: this.props.photos.slice(1, 6),
      photosAfter: this.props.photos.slice(6),
      photosBefore: []

    }
    this.onNavigation = this.onNavigation.bind(this);
    this.onChoosingHandler = this.onChoosingHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.photos !== this.props.photos) {
      this.setState({
        display: Object.assign({}, ...this.props.photos.slice(0, 1)),
        shownPhotos: this.props.photos.slice(1, 6),
        photosAfter: this.props.photos.slice(6),
        photosBefore: []
      });
    } else {
      return;
    }
  }

  onNavigation(direction) {
    var newPhotosBefore, newPhotosAfter, newPhotos;
    switch (direction) {
      case "right":
        newPhotosBefore = this.state.photosBefore.concat([...this.state.shownPhotos]);
        newPhotosAfter = [...this.state.photosAfter];
        newPhotos = newPhotosAfter.splice(0, 5);
        this.setState({
          photosBefore: newPhotosBefore,
          shownPhotos: newPhotos,
          photosAfter: newPhotosAfter
        });
        break;
      case "left":
        newPhotosAfter = [...this.state.shownPhotos].concat([...this.state.photosAfter]);
        newPhotosBefore = [...this.state.photosBefore];
        newPhotos = newPhotosBefore.splice((newPhotosBefore.length - 5));
        this.setState({
          photosBefore: newPhotosBefore,
          shownPhotos: newPhotos,
          photosAfter: newPhotosAfter
        });
        break;
      default:
        return this.state;
    }
  }

  onChoosingHandler(chosenPhotoProps) {
    let copiedPhotos = [...this.state.shownPhotos];
    const clickedPhotoIndex = copiedPhotos.findIndex((photo, i) => {
      return (photo.id === chosenPhotoProps.id);
    });
    const clickedPhoto = Object.assign({}, chosenPhotoProps);
    copiedPhotos[clickedPhotoIndex] = Object.assign({}, this.state.display);
    this.setState({
      display: clickedPhoto,
      shownPhotos: copiedPhotos
    });
    this.props.show(clickedPhoto);
  }


  render() {
    return (
      <div className="Menu">
        <Photos
          photos={this.state.shownPhotos}
          clicked={(chosenPhotoProps) => this.onChoosingHandler(chosenPhotoProps)}
        />

        <Left
          navLeft={() => this.onNavigation('left')}
          noLeft={this.state.photosBefore.length === 0}

          prevPage={() => this.props.browse('prev')}
          disabled={this.state.photosBefore.length !== 0} />

        <Right
          navRight={() => this.onNavigation('right')}
          noRight={this.state.photosAfter.length === 0}

          nxtPage={() => this.props.browse('next')}
          disabled={!(this.state.photosAfter.length === 0)} />
      </div>
    )
  }
};

export default Menu;