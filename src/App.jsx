import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Data from './Data.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <div className='archive-calls'>
          <div className='call-type'>
            <FontAwesomeIcon icon={faInbox}/><span>Archive all calls</span>
          </div>
        </div>
        <div>
          <Data/>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
