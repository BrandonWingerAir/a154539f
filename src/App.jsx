import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Inbox from './Inbox.jsx';
import Archive from './Archive.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='container'>
      <Router>
      <Header/>
        <div className="container-view">
          <Routes>
            <Route path="/" element={<Inbox/>} />
            <Route path="archive" element={<Archive/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
