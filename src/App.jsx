import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import Inbox from './Inbox.jsx';
import Archive from './Archive.jsx';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Detail from './Detail.jsx';

const App = () => {
  return (
    <div className='container'>
      <HashRouter>
        <Header/>
        <div className="container-view">
          <Routes>
            <Route 
              path="/" 
              element={<Inbox/>}
            />
            <Route 
              path="archive" 
              element={<Archive/>}
            />
            <Route 
              path="call/*" 
              element={<Detail/>}
            />
          </Routes>
        </div>
        <Footer/>
      </HashRouter>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
