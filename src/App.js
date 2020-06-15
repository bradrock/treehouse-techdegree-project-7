import React from 'react';
import './App.css';
import { Route } from 'react-router';
import {BrowserRouter, Switch} from 'react-router-dom';
import apiKey from './config';
import Nav from './Nav';
import NotFound from './NotFound';
import Form from './Form';
import PhotoContainer from './PhotoContainer';




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
