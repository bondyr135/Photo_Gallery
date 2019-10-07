import React, { Component } from 'react';
import imgs from '../../pictures';

import './Displayed.css';
import Spinner from '../UI/Spinner/Spinner';

class Displayed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  render() {
    const picture = this.props.id == null
    ? <Spinner />
    : <img
          className="Displayed"
          title={this.props.title}
          alt={this.props.title}
          id={this.props.id}
          src={this.props.src}
          loader={<Spinner />}
        />

    return (
      <div>
        {picture}

        <a href="https://icons8.com/icon/581/heart-outline" className="Credit">Heart Outline icon by Icons8</a>
      </div>
    )
  }

}

export default Displayed;