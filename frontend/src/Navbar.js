import './build.css';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';

const NavListItem = (props) => {
  return <div className="text-center p-4 bg-blue-500/60 hover:bg-blue-600/60 hover:cursor-pointer rounded-full border-blue-700/50 border-4">{props.children}</div>;
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

const MobileNavItem = (props) => {
  const handleClick = () => {
    if (props.index === props.open) {
      props.setOpen(null);
      return;
    }
    props.setOpen(props.index);
  }
  return <div>
    <div className="h-20 m-auto bg-blue-300/50 rounded-full hover:bg-blue-400 hover:cursor-pointer flex border-blue-700/50 border-4" onClick={handleClick}>
      <span className="m-auto">{props.children}</span>
    </div>
    {(props.listItems && props.open === props.index) ? <div className="transition-all flex flex-col space-y-0.5">
      {props.listItems.length ? props.listItems.map((child, i) => {
        return <NavListItem key={i}>{child.props.children}</NavListItem>;
      }) : <NavListItem>{props.listItems.props.children}</NavListItem>}
    </div> : <div></div>}
  </div>;
}

const NavbarDesktop = (props) => {
  return (<div className="flex space-x-4 shadow-2xl text-center bg-blue-300/70 rounded-full box-content p-4 h-20">
      {props.logo ? <div className="flex min-w-1/8 bg-blue-400/50 rounded-full hover:bg-blue-400 hover:cursor-pointer border-blue-700/50 border-4">
        <img src={props.thumbnail} className="m-auto h-4/5" alt="" />
      </div> : <div></div>}
      {props.children.map((child, i) => {
          return <NavItem key={i} listItems={child.props.children[1].props.children}>{child.props.children[0].props.children}</NavItem>;
      })}
  </div>);
}

const NavbarMobile = (props) => {
  const [open, setOpen] = useState(false);
  const [whichOpen, setWhichOpen] = useState(null);
  const handleClick = () => {
    setOpen(!open);
  }
  return (<div>
    <div onClick={handleClick} className="flex space-x-4 shadow-2xl bg-blue-300/70 rounded-full box-content p-4 h-20">
      {open ? 
      <AiOutlineClose className="m-auto text-black hover:text-gray-600 hover:cursor-pointer relative" size={50} /> :
      <AiOutlineMenu  className="m-auto text-black hover:text-gray-600 hover:cursor-pointer relative" size={50} /> } 
    </div>
    {open ? <div className="space-y-0.5">
      {props.children.map((child, i) => {
        return <MobileNavItem key={i} index={i} open={whichOpen} setOpen={setWhichOpen} listItems={child.props.children[1].props.children}>{child.props.children[0].props.children}</MobileNavItem>;
      })}
    </div> : <div></div>}
    </div>);
}

const Navbar = (props) => {
  return <div className="nav">
    <div className="hidden sm:block">
      <NavbarDesktop logo={true} {...props}/>
    </div>
    <div className="block sm:hidden">
      <NavbarMobile {...props}/>
    </div>
  </div>;
}

export default Navbar;