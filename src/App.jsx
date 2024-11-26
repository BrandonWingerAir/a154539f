import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';

import Data from './Data.jsx'; 

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <div>Archive all calls</div>
        <div>
          <Data/>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
