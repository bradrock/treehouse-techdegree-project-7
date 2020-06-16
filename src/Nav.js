import React from 'react';
import {NavLink} from 'react-router-dom';

//component for the navigation bar
function Nav() {
    return (<nav className="main-nav">
    <ul>
      <li><NavLink to='/guitar'>Guitar</NavLink></li>
      <li><NavLink to='/piano'>Piano</NavLink></li>
      <li><NavLink to='/trumpet'>Trumpet</NavLink></li>
    </ul>
  </nav>);
  }

  export default Nav;