import React from 'react';
import {render} from 'react-dom';

import Invoices from './Invoices.jsx';
import Products from './Products.jsx';

// TODO routing

class App extends React.Component {
  render () {
    return (
      <main className="layout-main row">
        <Invoices />
        <footer className="col-xs-12 text-muted text-center">
          <hr />
          <h4>powered by coffee.</h4>
        </footer>
      </main>
    );
  }
}

render(<App/>, document.getElementById('app'));