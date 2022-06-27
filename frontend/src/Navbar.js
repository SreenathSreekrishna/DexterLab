import './build.css';
import { AiOutlineMenu } from "react-icons/ai";

const NavListItem = (props) => {
  return <div className="p-4 bg-blue-500/60 hover:bg-blue-600/60 hover:cursor-pointer rounded-full border-blue-700/50 border-4">{props.children}</div>;
}

const NavItem = (props) => {
  return <div className="group w-1/2 min-w-0">
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

const NavbarDesktop = (props) => {
  return (<div className="flex space-x-4 shadow-2xl text-center bg-blue-300/70 rounded-full box-content p-4 h-20">
      {!props.logo ? <div className="flex min-w-1/6 bg-blue-400/50 rounded-full hover:bg-blue-400 hover:cursor-pointer border-blue-700/50 border-4">
        <img src={props.thumbnail} className="m-auto h-4/5" alt="" />
      </div> : <div></div>}
      {props.children.map((child, i) => {
          return <NavItem key={i} listItems={child.props.children[1].props.children}>{child.props.children[0].props.children}</NavItem>;
      })}
  </div>);
}

const NavbarMobile = (props) => {
  return (<div>
    <input type="checkbox" className="hidden peer" id="menu" />
    <label htmlFor="menu" className="group">
      <div className="flex space-x-4 shadow-2xl bg-blue-300/70 hover:bg-blue-300/100 hover:cursor-pointer rounded-full box-content p-4 h-20">
        <AiOutlineMenu className="m-auto text-black hover:text-gray-600" size={50}/>
        <div className="hidden group-checked:block">
          hello
        </div>
      </div>
    </label>
  </div>);
}

const Navbar = (props) => {
  return <div className="nav">
    <div className="hidden md:block">
      <NavbarDesktop {...props}/>
    </div>
    <div className="block sm:hidden">
      <NavbarMobile />
    </div>
    <div className="hidden sm:block md:hidden">
      <NavbarDesktop logo={true} {...props} />
    </div>
  </div>;
}

export default Navbar;