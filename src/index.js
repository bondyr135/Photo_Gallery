import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./style.css";
import Album from "./containers/Album/Album";
import Likes from "./containers/Likes/Likes";
import Like from "./containers/Like/Like";
import Nav from "./containers/Nav/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {
      likes: [],
      photo: {
        id: "",
        title: "",
        src: "",
      },
    };
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.enlargePhoto = this.enlargePhoto.bind(this);
  }

  componentDidMount() {
    let passLikes = [];
    const keys = Object.keys(window.localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (
        keys[i] !== "editorHasEmittedBundle" &&
        keys[i] !== "editorLastConnected" &&
        keys[i] !== "firebase:host:stackblitz.firebaseio.com"
      ) {
        passLikes.push(keys[i]);
      }
    }
    this.setState({ likes: passLikes });
  }

  addLike(p) {
    window.localStorage.setItem(p.id, JSON.stringify(p));
    this.setState((state) => {
      return { likes: [...state.likes, p.id] };
    });
  }

  removeLike(id) {
    if (localStorage.getItem(id)) {
      window.localStorage.removeItem(id);
    }
    this.setState((state) => {
      return {
        likes: state.likes.filter((likedId) => {
          return likedId !== id;
        }),
      };
    });
  }

  cleanStorage = () => {
    window.localStorage.clear();
    this.setState({ likes: [] });
  };

  enlargePhoto(p) {
    this.setState({
      photo: {
        id: p.id,
        src: p.src || p.href,
        title: p.title,
      },
    });
  }

  render() {
    const p = this.state.photo;
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Album
                  doLike={(pic) => this.addLike(pic)}
                  unLike={(id) => this.removeLike(id)}
                  clear={this.cleanStorage}
                />
              )}
            />
            <Route
              exact
              path="/likes"
              render={() => (
                <Likes
                  removeLike={(id) => this.removeLike(id)}
                  likes={this.state.likes}
                  click={(photo) => this.enlargePhoto(photo)}
                />
              )}
            />
            <Route
              exact
              path={`/likes/${p.id}`}
              render={() => (
                <Like
                  src={p.src}
                  id={p.id}
                  title={p.title}
                  deleteLike={(id) => this.removeLike(id)}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
