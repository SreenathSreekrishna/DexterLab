import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { server } from './vars.js';
import Navbar from "./Navbar.js";
import thumb from './logo_thumb.png';
import Home from './routes/Home.js';
import Login from './routes/login/Login.js';
import Register from './routes/login/Register.js';
import PartShop from './routes/shop/partShop.js';
import InvShop from './routes/shop/invShop.js';
import NotFound from './routes/404.js';
import Verify from './routes/login/Verify.js';
import Dashboard from './routes/Dashboard.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(document.cookie!=='');
  const [user, setUser] = useState({});
  useEffect(() => {
    const json =  (async () => {
      return await (await fetch(`${server}/api/login`, {
          method: "POST",
          credentials: 'include'
      })).json();
    })();
    json.then(dat => {
        if (dat.status!=='error') {
            setUser(dat);
            setLoggedIn(true);
        }
    });
  }, []);
  const rprops = {
    loggedIn:loggedIn,
    setLoggedIn:setLoggedIn,
    user:user,
    setUser:setUser
  };
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
          {!loggedIn ? <span link="/login">Login</span> : <></>}
          {!loggedIn ? <span link="/register">Register</span> : <></>}
          {loggedIn ? <span link="/dashboard">Dashboard</span> : <></>}
          {loggedIn ? <span link="/cart">Cart</span> : <></>}
        </div>
      </div>
    </Navbar>
    <Routes>
      <Route exact path='/' element={<Home {...rprops} />} />
      <Route path='/login' element={<Login {...rprops} />} />
      <Route path='/register' element={<Register {...rprops} />} />
      <Route path='/invShop' element={<InvShop {...rprops} />} />
      <Route path='/partShop' element={<PartShop {...rprops} />} />
      <Route path='/verify' element={<Verify {...rprops} />} />
      <Route path='/dashboard' element={<Dashboard {...rprops} />} />
      <Route path="*" element={<NotFound {...rprops} />} />
    </Routes>
  </Router>
}

export default App;