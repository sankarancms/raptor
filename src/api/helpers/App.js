import React from 'react';
import Routes from './Routes';
import { renderRoutes } from 'react-router-config';

class App extends React.Component {
  render() {
    return (
      <div>{renderRoutes(Routes)}</div>
    );
  }
}

export default App;
