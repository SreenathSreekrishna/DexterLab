import './build.css';

const NavItem = (props) => {
  return <div className={`m-auto bg-blue-400/50 rounded-full h-full w-1/2 hover:bg-blue-400 hover:cursor-pointer flex`}>
    <span className="m-auto">{props.text}</span>
  </div>;
}

const Navbar = (props) => {
  return (<div className={`flex space-x-1 text-center bg-blue-400/50 font-bold text-gray-500/50 rounded-full box-content p-4 text-4xl h-20`}>
      {props.children.map((child, i) => {
          return <NavItem key={i} text={child.props.children}/>;
      })}
  </div>);
}

export default Navbar;