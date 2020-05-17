import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Photo from 'photo';
//import Form from 'form';
//import PhotoContainer from 'photo_container';
//import NotFound from 'not_found';
//import Nav from 'nav';
import ReactDOM from 'react-dom';


/*import { Route, Switch } from "react-router";

let routes = (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/:user">
      <User />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </Switch>
);
*/

function Nav() {
  return (<nav className="main-nav">
  <ul>
    <li><a href='#'>Baseball</a></li>
    <li><a href='#'>Volleyball</a></li>
    <li><a href='#'>Roller Coasters</a></li>
  </ul>
</nav>);
}


function NotFound() {
  return (<li className="not-found">
  <h3>No Results Found</h3>
  <p>You search did not return any results. Please try again.</p>
</li>);
}

function Photo(props) {
  return (<li>
  <img src={props.img_src} alt="" />
</li>);
}


class Form extends React.Component {
  constructor() {
    super();
    //this.state = {color: "red"};
  }
  render() {
    return (<form className="search-form">
    <input type="search" name="search" placeholder="Search" required/>
    <button type="submit" className="search-button">
      <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  </form>);
  }
}


class PhotoContainer extends React.Component {
  constructor() {
    super();
    //this.state = {color: "red"};
  }
  render() {
    return (<div class="photo-container">
    <h2>Results</h2>
    <ul><NotFound /></ul>
    </div>);
  }
}
//export default Nav;


export default class App extends React.Component {
  constructor(){
    super();
    this.state = { images: [] };

  }

  componentDidMount(){
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=64c159490b6d7f4b750802422b4ae401&tags=baseball&per_page=&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(responseData => {
      this.setState({images: responseData.photos});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
      
  }
  
  render() {
    console.log(this.state.images);
    return (
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>*/

      <div>
        <Form />
        <Nav />
        <PhotoContainer />
      </div>
    );
  }
}




//export default App;



//export default App;
