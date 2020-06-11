import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Photo from 'photo';
//import Form from 'form';
//import PhotoContainer from 'photo_container';
//import NotFound from 'not_found';
//import Nav from 'nav';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {BrowserRouter, Switch} from 'react-router-dom';
import apiKey from './config';




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
    <li><a href='/guitar'>Guitar</a></li>
    <li><a href='/piano'>Piano</a></li>
    <li><a href='/trumpet'>Trumpet</a></li>
  </ul>
</nav>);
}

/*
const ImageList = props => {

  return 


}*/


function NotFound() {
  return (<li className="not-found">
  <h3>No Results Found</h3>
  <p>You search did not return any results. Please try again.</p>
</li>);
}

function Photo(props) {
  return (<li>
  <img src={props.url} alt="" />
</li>);
}


class Form extends React.Component {

/*
 source for setting up search form functionality: https://www.freecodecamp.org/forum/t/getting-an-input-value-when-form-is-submitted-react/161870/3
*/

  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.aRef = React.createRef();
    this.updateInputValue = React.createRef();
    this.state = {inputValue: ''};
  
    
    //this.state = {color: "red"};
  }

 

/*
  updateInputValue => (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
  }
*/

  
  
  componentDidMount(){
    //this.aRef.href= '/search/' +  this.state.inputValue;


  }
  

  handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    
  onSubmit = (e) => {
       e.preventDefault();
       window.location.href = "/search/" + this.state.inputValue;
    }


  render() {
    return (<form className="search-form">
    <input value={this.state.inputValue} onChange={e => this.handleChange(e)} type="search" name="search" placeholder="Search" required/>
    <button onClick={(e) => this.onSubmit(e)} type="submit" className="search-button">
      <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  </form>);
  }

  
}

/*
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
*/


class Button extends React.Component {

  constructor(props) {
    super(props);
    //this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }

}


/*class PhotoContainer extends React.Component {
  constructor(props) {
    super();
    //this.state = {color: "red"};
    const results = props.data;
    let imgs = results.map(img =>
      {
        <Photo url={'https://www.flickr.com/photos/' + img.owner + '/' + img.id + '/'} />
      }
    );
  }
  render() {
    return (<div class="photo-container">
    <h2>Results</h2>
    {images}
    <ul><NotFound /></ul>
    </div>);
  }
}*/
//export default Nav;


const PhotoContainer = props => {
  const results = props.data;
    let images = results.map(img =>
      
        <Photo url={'https://farm' + img.farm + '.staticflickr.com/' + img.server + '/' + img.id + '_' + img.secret + '.jpg'} key={img.id} />
      
    );

    return (
    <div className="photo-container">
    <h2>Results</h2>
    <ul>{images}<NotFound /></ul>
    </div>
    );
}

/*
function GuitarPhotoContainer()
{
  return (<PhotoContainer data={this.state.guitarImages} />);
}
*/

export default class App extends React.Component {
  constructor(){
    super();
    this.state = { guitarImages: [], pianoImages: [], trumpetImages: [], searchImages: [] };

  }

  componentDidMount(){
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=guitar&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(responseData => {
      this.setState({guitarImages: responseData.photos.photo});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=piano&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
    .then(response2 => response2.json())
    .then(responseData2 => {
      this.setState({pianoImages: responseData2.photos.photo});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=trumpet&sort=relevance&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
    .then(response3 => response3.json())
    .then(responseData3 => {
      this.setState({trumpetImages: responseData3.photos.photo});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    
      
  }
  
  render() {
    //console.log(this.state.pianoImages);
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

      
      

        
      <BrowserRouter>
        <div className="container">


          <Form />
          <Nav />
       
        <Switch>
          <Route path="/guitar" render={(props) => <PhotoContainer {...props} data={this.state.guitarImages} />} />
          <Route path="/piano" render={(props) => <PhotoContainer {...props} data={this.state.pianoImages} />} />
          <Route path="/trumpet" render={(props) => <PhotoContainer {...props} data={this.state.trumpetImages} />} />
          <Route path="/search/:term" render={(props) => 
              {
                fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + props.match.params.term +'&sort=relevance&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
                  .then(response4 => response4.json())
                  .then(responseData4 => {
                    this.setState({searchImages: responseData4.photos.photo});
                    })
                  .catch(error => {
                    console.log('Error fetching and parsing data', error);
                    });

                return <PhotoContainer {...props} data={this.state.searchImages} />;
              }
            } 
           />
          
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


/*

<PhotoContainer data={this.state.guitarImages} />

<BroswerRouter>
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
</BroswerRouter>
*/


//export default App;



//export default App;
