import React from 'react';

//component for an individual photo
function Photo(props) {
    return (<li>
    <img src={props.url} alt="" />
  </li>);
  }

export default Photo;