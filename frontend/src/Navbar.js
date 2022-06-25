import './build.css';

const NavListItem = (props) => {
  return <div className="p-4 bg-blue-500/60 hover:bg-blue-600/60 hover:cursor-pointer rounded-full border-blue-700/50 border-4">{props.children}</div>;
}

const NavItem = (props) => {
  return <div className="group w-1/2">
    <div className="m-auto bg-blue-400/50 rounded-full h-full hover:bg-blue-400 hover:cursor-pointer flex border-blue-700/50 border-4">
      <span className="m-auto">{props.children}</span>
    </div>
    {props.listItems ? (
      <div className="transition-all scale-0 group-hover:scale-100 p-1 flex flex-col space-y-0.5">
        {props.listItems.length ? (props.listItems.map((child, i) => {
          return <NavListItem key={i}>{child.props.children}</NavListItem>;
        })): (
          <NavListItem>{props.listItems.props.children}</NavListItem>
        )}
      </div>) : <div></div>
    }
  </div>;
}

const Navbar = (props) => {
  return (<div className="flex space-x-4 shadow-2xl text-center bg-blue-300/70 font-bold text-gray-100/70 rounded-full box-content p-4 text-4xl h-20">
      <div className="flex w-1/6 bg-blue-400/50 rounded-full hover:bg-blue-400 hover:cursor-pointer border-blue-700/50 border-4">
        <img src={props.thumbnail} className="m-auto h-5/6"/>
      </div>
      {props.children.map((child, i) => {
          return <NavItem key={i} listItems={child.props.children[1].props.children}>{child.props.children[0].props.children}</NavItem>;
      })}
  </div>);
}

export default Navbar;