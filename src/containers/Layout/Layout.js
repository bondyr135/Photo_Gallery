import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import Displayed from "../../components/Displayed/Displayed";

import "./Layout.css";

const styles = {
  clear: {
    alignSelf: "flex-end",
    position: "absolute",
    left: "80%",
    top: "55%",
    padding: 5,
    zIndex: 15,
    border: "1px solid black",
    borderRadius: 5,
    fontWeight: "bold",
    backgroundColor: "white",
  },
};

class Layout extends Component {
  constructor(props) {
    super(props);

    this.isLiked = this.isLiked.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.doLike = this.doLike.bind(this);

    this.state = {
      currId: "",
      like: false,
    };
  }

  componentDidMount() {
    if (this.props.photo !== null && this.props.photo.id !== "") {
      this.setState((state) => {
        return {
          currId: this.props.photo.id,
        };
      });
    }
  }

  // Setting a new photo in the cenrter
  componentDidUpdate(prevProps) {
    if (prevProps.photo !== this.props.photo) {
      this.setState({ currId: this.props.photo.id });
    }
  }

  // Auxiliary function
  isLiked() {
    return window.localStorage.getItem(this.props.photo.id) !== null;
  }

  // Toggeling the "Like" property of a photo
  toggleLike() {
    !this.isLiked() ? this.props.onLiking() : this.props.onUnLiking();
  }

  // unused function XXX
  doLike() {
    window.localStorage.setItem(
      this.props.photo.id,
      JSON.stringify({
        id: this.props.photo.id,
        src: this.props.src,
        title: this.props.photo.title,
      })
    );
    this.props.onLiking();
  }

  // unused function XXX
  unlike() {
    window.localStorage.removeItem(this.props.photo.id);
    this.props.onUnLiking();
  }

  // Unliking all liked photos
  clickHandler() {
    window.localStorage.clear();
    this.props.clear();
  }

  render() {
    return (
      <div className="Layout">
        <Displayed {...this.props.photo} />

        <Button
          color="primary"
          style={styles.clear}
          onClick={this.clickHandler}
        >
          Unlike All
        </Button>

        {this.state.currId ? (
          this.isLiked() ? (
            <Favorite
              className="liked"
              onClick={this.toggleLike}
              style={{ fontSize: "55px" }}
            />
          ) : (
            <FavoriteBorder
              className="unLiked"
              onClick={this.toggleLike}
              style={{ fontSize: "55px" }}
            />
          )
        ) : null}
      </div>
    );
  }
}

export default Layout;
