import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./Navbar.js";
import thumb from './logo_thumb.png';
import Home from './routes/Home.js';
import Login from './routes/login/Login.js';
import Register from './routes/login/Register.js';
import PartShop from './routes/shop/partShop.js';
import InvShop from './routes/shop/invShop.js';
import NotFound from './routes/404.js';

const App = (props) => {
  return <Router>
    <Navbar thumbnail={thumb}>
      <div>
        <span>Shop</span>
        <div>
          <span link="/invShop">Off the shelf inventions</span>
          <span link="/partShop">Shop for parts</span>
        </div>
      </div>
      <div>
        <span>Account</span>
        <div>
          <span link="/login">Login</span>
          <span link="/register">Register</span>
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
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/invShop' element={<InvShop />} />
      <Route path='/partShop' element={<PartShop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
}

export default App;