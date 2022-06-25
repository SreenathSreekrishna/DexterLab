import Navbar from "./Navbar.js";
import thumb from './logo_thumb.png';

const App = (props) => {
  return <Navbar thumbnail={thumb}>
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
}

export default App;