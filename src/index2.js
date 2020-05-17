import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import Photo from 'photo';
//import Form from 'form';
//import PhotoContainer from 'photo_container';
//import NotFound from 'not_found';
//import Nav from './App';
import apiKey from 'config.js';




ReactDOM.render(
  (<div>
    <Form />
    <Nav />
    <PhotoContainer />
  </div>),
  
  
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

