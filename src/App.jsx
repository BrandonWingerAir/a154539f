import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Data from './Data.jsx';
import Archive from './Archive.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='container'>
      <Router>
      <Header/>
        <div className="container-view">
          <div className='archive-calls'>
            <div className='call-type'>
              <FontAwesomeIcon icon={faInbox}/><span>Archive all calls</span>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Data/>} />
            <Route path="archive" element={<Archive/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
