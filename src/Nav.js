import React from 'react';
import {Link} from 'react-router-dom';

//component for the navigation bar
function Nav() {
    return (<nav className="main-nav">
    <ul>
      <li><Link to='/guitar'>Guitar</Link></li>
      <li><Link to='/piano'>Piano</Link></li>
      <li><Link to='/trumpet'>Trumpet</Link></li>
    </ul>
  </nav>);
  }

  export default Nav;