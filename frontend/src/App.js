import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./Navbar.js";
import thumb from './logo_thumb.png';
import Home from './routes/Home.js';
import About from './routes/About.js';
import Contact from './routes/Contact.js';
import Login from './routes/Login.js';
import Register from './routes/Register.js';

const App = (props) => {
  return <Router>
    <Navbar thumbnail={thumb}>
      <div>
        <span>hello</span>
        <div>
          <span>amma</span>
          <span>sreenath</span>
          <span>sree</span>
        </div>
      </div>
      <div>
        <span>hello</span>
        <div>
          <span>third</span>
          <span>third</span>
        </div>
      </div>
      <div>
        <span>third</span>
        <div>
          <span>world</span>
          <span>world</span>
        </div>
      </div>
      <div>
        <span>fourt</span>
        <div>
          <span>hello</span>
          <span>hello</span>
        </div>
      </div>
    </Navbar>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/blogs' element={<Login />} />
      <Route path='/sign-up' element={<Register />} />
    </Routes>
  </Router>
}

export default App;