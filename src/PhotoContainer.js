import React from 'react';
import Photo from './Photo';
import Loading from './Loading';
import NoResults from './NoResults';

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

  export default PhotoContainer;