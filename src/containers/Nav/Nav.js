import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const nav = () => {


  return (
    <nav>
      <ul className="nav-links">
        <NavLink exact to="/likes" className="Link" activeClassName="selected">
          <li>Likes</li>
        </NavLink>
        <NavLink exact to="/" className="Link" activeClassName="selected">
          <li>Home</li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default nav;