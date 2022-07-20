import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./Navbar.js";
import thumb from './logo_thumb.png';
import Home from './routes/Home.js';
import About from './routes/About.js';
import Contact from './routes/Contact.js';
import Login from './routes/Login.js';
import Register from './routes/Register.js';
import NotFound from './routes/404.js';

const App = (props) => {
  return <Router>
    <Navbar thumbnail={thumb}>
      <div>
        <span link="/shop">Shop</span>
        <div>
          <span>Off the shelf inventions</span>
          <span>Build your own custom invention</span>
          <span>Shop for parts</span>
        </div>
      </div>
      <div>
        <span>11</span>
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
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
}

export default App;