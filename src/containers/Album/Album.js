import React, { Component } from "react";
import axios from "axios";
import IMAGES from "../../pictures";

import Menu from "../../components/Menu/Menu";
import { url, key, nextUrl } from "../../Unsplash/Unsplash";
import Layout from "../Layout/Layout";
import "./Album.css";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedPhoto: null,
      photos: [],
      likes: [],
      currPage: 1,
    };
    this.likingHandler = this.likingHandler.bind(this);
    this.unLikingHandler = this.unLikingHandler.bind(this);
    this.onBrowsingHandler = this.onBrowsingHandler.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.showDemiPhotos = this.showDemiPhotos.bind(this);
  }

  componentDidMount() {
    this.getPhotos(this.state.currPage);
  }

  // A call to outer API, requesting photos
  getPhotos(newPage) {
    axios
      .get(`${url}${newPage}${nextUrl}`, {
        headers: {
          Authorization: `Client-ID ${key}`,
          "Accept-Version": "v1",
          scope: "public",
        },
        params: {
          per_page: "26",
        },
      })
      .then((res) => {
        this.setState({ currPage: newPage });
        this.showPhotos(res);
      })
      // Request intentionally fails
      .catch((rej) => {
        console.log("is this it?");
        console.log(rej);
        //Loading dummy-data
        this.showDemiPhotos(IMAGES);
      });
  }

  //Showing dummy-data photos
  showDemiPhotos(images) {
    const parsedPhotos = images.map((img, index) => {
      let field = `picture${index + 1}`;

      // extracting data from photos
      let imgSRC = img.src[field];

      let imgDetails = imgSRC.substring(14).split("-");
      imgDetails.pop();

      let imgKey = imgDetails.pop();
      let imgTitle = imgDetails.join(" ");

      // Returning for .map function
      return {
        key: imgSRC,
        title: imgTitle,
        alt: imgTitle,
        id: imgKey,
        src: imgSRC,
      };
    });

    // Extracting the center photo, and setting state
    const centerPhoto = Object.assign({}, parsedPhotos[0]);
    this.setState({
      displayedPhoto: centerPhoto,
      photos: parsedPhotos,
    });
  }

  // A function relevant when using real retrieved data from API
  showPhotos(res) {
    const parsedPhotos = res.data.map((photo) => {
      return {
        key: photo.id,
        alt: photo.alt_description || photo.title,
        title: photo.alt_description || photo.title,
        id: photo.id,
        href: photo.urls ? photo.urls.regular : photo.href,
      };
    });
    const centerPhoto = Object.assign({}, parsedPhotos[0]);
    this.setState({
      displayedPhoto: centerPhoto,
      photos: parsedPhotos,
    });
  }

  // For browsing the held photos in state
  onBrowsingHandler(direction) {
    switch (direction) {
      case "prev":
        if (this.state.currPage === 1) {
          return;
        } else {
          this.getPhotos(this.state.currPage - 1);
        }
        break;
      case "next":
        this.getPhotos(this.state.currPage + 1);
        break;
      default:
        return this.state;
    }
  }

  // No idea what this is frankly...
  onNavigation(direction) {
    var newPhotosAfter, newPhotosBefore, newPhotos;
    switch (direction) {
      case "right":
        newPhotosBefore = this.state.photosBefore.concat([
          ...this.state.shownPhotos,
        ]);
        newPhotosAfter = [...this.state.photosAfter];
        newPhotos = newPhotosAfter.splice(0, 5);
        this.setState({
          photosBefore: newPhotosBefore,
          shownPhotos: newPhotos,
          photosAfter: newPhotosAfter,
        });
        break;
      case "left":
        newPhotosAfter = [...this.state.shownPhotos].concat([
          ...this.state.photosAfter,
        ]);
        newPhotosBefore = [...this.state.photosBefore];
        newPhotos = newPhotosBefore.splice(newPhotosBefore.length - 5);
        this.setState({
          photosBefore: newPhotosBefore,
          shownPhotos: newPhotos,
          photosAfter: newPhotosAfter,
        });
        break;
      default:
        return this.state;
    }
  }

  likingHandler = () => this.props.doLike(this.state.displayedPhoto);

  unLikingHandler() {
    this.props.unLike(this.state.displayedPhoto.id);
  }

  displayingHandler(photo) {
    this.setState({ displayedPhoto: photo });
  }

  render() {
    return (
      <div className="Album">
        <Layout
          photo={this.state.displayedPhoto}
          onLiking={this.likingHandler}
          onUnLiking={this.unLikingHandler}
          clear={this.props.clear}
        />

        <Menu
          photos={this.state.photos}
          displayedData={this.state.displayedPhoto}
          show={(chosenPhoto) => this.displayingHandler(chosenPhoto)}
          browse={(direction) => this.onBrowsingHandler(direction)}
          clicked={(chosenId) => this.onChoosingHandler(chosenId)}
          isLeftest={this.state.currPage === 1}
        />
      </div>
    );
  }
}

export default Album;
