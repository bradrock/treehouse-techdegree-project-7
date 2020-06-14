import React from 'react';
import './App.css';
import { Route } from 'react-router';
import {BrowserRouter, Switch, Link} from 'react-router-dom';
import apiKey from './config';


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


//component for the not found message when no image results are found
function NoResults() {
  return (<li className="not-found">
  <h3>No Results Found</h3>
  <p>You search did not return any results. Please try again.</p>
</li>);
}


//component for the "Loading..." message while waiting for photo request to complete
function Loading() {
  return (<li className="not-found">
  <h3>Loading...</h3>
</li>);
}


//component for the not found message when no image results are found
function NotFound() {
  return (<div className="photo-container">
  <h2>Page not found!</h2>
  </div>);
}

//component for an individual photo
function Photo(props) {
  return (<li>
  <img src={props.url} alt="" />
</li>);
}


//component for the search form and button
class Form extends React.Component {

/*
 source for setting up search form functionality: https://www.freecodecamp.org/forum/t/getting-an-input-value-when-form-is-submitted-react/161870/3
*/

  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
  
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





//component for the container of all of the photos
const PhotoContainer = props => {
  const results = props.data;

  let images = null;

  if (props.isLoading)
  {
    images = <Loading />;
  }

  else if (results.length )
  {

    images = results.map(img =>
      
        <Photo url={'https://farm' + img.farm + '.staticflickr.com/' + img.server + '/' + img.id + '_' + img.secret + '.jpg'} key={img.id} />
      
    );
  }
  
  else
  {
    images = <NoResults />;
  }

    return (
    <div className="photo-container">
    <h2>Results</h2>
    <ul>{images}</ul>
    </div>
    );
}


//highest level component
export default class App extends React.PureComponent {
  constructor(){
    super();
    this.state = { 
      guitarImages: [],
      pianoImages: [],
      trumpetImages: [],
      searchImages: [],
      guitarLoading: true,
      pianoLoading: true,
      trumpetLoading: true,
      searchLoading: true
    };
  }

  componentDidMount(){
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=guitar&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(responseData => {
      this.setState({guitarImages: responseData.photos.photo});
      this.setState({guitarLoading: false});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=piano&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
    .then(response2 => response2.json())
    .then(responseData2 => {
      this.setState({pianoImages: responseData2.photos.photo});
      this.setState({pianoLoading: false});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=trumpet&sort=relevance&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
    .then(response3 => response3.json())
    .then(responseData3 => {
      this.setState({trumpetImages: responseData3.photos.photo});
      this.setState({trumpetLoading: false});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

    
      
  }
  
  render() {
    
    return (
 
      <BrowserRouter>
        <div className="container">

          <Form />
          <Nav />
       
        <Switch>
          <Route exact path="/" />
          <Route path="/guitar" render={(props) => <PhotoContainer {...props} data={this.state.guitarImages} isLoading={this.state.guitarLoading}/>} />
          <Route path="/piano" render={(props) => <PhotoContainer {...props} data={this.state.pianoImages} isLoading={this.state.pianoLoading}/>} />
          <Route path="/trumpet" render={(props) => <PhotoContainer {...props} data={this.state.trumpetImages} isLoading={this.state.trumpetLoading}/>} />
          <Route path="/search/:term" render={(props) => 
              {
                fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + props.match.params.term +'&sort=relevance&safe_search=1&is_getty=true&per_page=24&format=json&nojsoncallback=1')
                  .then(response4 => response4.json())
                  .then(responseData4 => {
                    this.setState({searchImages: responseData4.photos.photo});
                    this.setState({searchLoading: false});
                    })
                  .catch(error => {
                    console.log('Error fetching and parsing data', error);
                    });

                return <PhotoContainer {...props} data={this.state.searchImages} isLoading={this.state.searchLoading}/>;
              }
            } 
           />

          <Route component={NotFound} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
