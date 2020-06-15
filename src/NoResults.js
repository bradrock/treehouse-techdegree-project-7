import React from 'react';

//component for the not found message when no image results are found
function NoResults() {
  return (<li className="not-found">
  <h3>No Results Found</h3>
  <p>You search did not return any results. Please try again.</p>
</li>);
}

export default NoResults;