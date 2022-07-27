import './build.css';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import { NavLink as Link} from 'react-router-dom';

const NavListItem = (props) => {
  var route = props.href ? props.href : '/';
  return <Link to={route}>
    <div className="text-center p-4 bg-sky-900/80 hover:bg-sky-800/80 hover:cursor-pointer rounded-3xl">
      {props.children}
    </div>
  </Link>;
}

const NavItem = (props) => {
  return <div className="group w-1/2 min-w-0">
    {props.link ? 
      <Link to={props.link}>
        <div className="m-auto bg-sky-700/70 rounded-3xl h-full hover:bg-sky-700 hover:cursor-pointer flex border-sky-900 border-[2px]">
          <span className="m-auto">{props.children}</span>
        </div>
      </Link> :
      <div className="m-auto bg-sky-700/70 rounded-3xl h-full hover:bg-sky-700 hover:cursor-pointer flex border-sky-900 border-[2px]">
        <span className="m-auto">{props.children}</span>
      </div>
    }
    {props.listItems && (
      <div className="transition-all scale-0 group-hover:scale-100 p-1 flex flex-col space-y-0.5">
        {props.listItems.length ? (props.listItems.map((child, i) => {
          return <NavListItem key={i} href={child.props.link}>{child.props.children}</NavListItem>;
        })): (
          <NavListItem href={props.listItems.props.link}>{props.listItems.props.children}</NavListItem>
        )}
      </div>)
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
    {props.link ? 
        <div className="h-20 m-auto bg-sky-900/50 rounded-3xl hover:bg-sky-900 hover:cursor-pointer flex" onClick={handleClick}>
          <Link to={props.link} className="flex m-auto">
            <span className="m-auto">{props.children}</span>
          </Link>
        </div> :
      <div className="h-20 m-auto bg-sky-900/50 rounded-3xl hover:bg-sky-900 hover:cursor-pointer flex" onClick={handleClick}>
        <span className="m-auto">{props.children}</span>
      </div>
    }
    {(props.listItems && props.open === props.index) && <div className="transition-all flex flex-col space-y-0.5">
      {props.listItems.length ? props.listItems.map((child, i) => {
        return <NavListItem key={i} href={child.props.link}>{child.props.children}</NavListItem>;
      }) : <NavListItem href={props.listItems.props.link}>{props.listItems.props.children}</NavListItem>}
    </div>}
  </div>;
}

const NavbarDesktop = (props) => {
  return (<div className="nav flex text-gray-300/80 font-medium space-x-4 shadow-2xl text-center bg-sky-700/30 rounded-3xl box-content p-4 h-20">
      {props.logo && <Link to="/" className="flex min-w-[10%] bg-sky-700/70 rounded-3xl hover:bg-sky-700 hover:cursor-pointer border-sky-900 border-[2px]">
        <div className="flex m-auto h-4/5">
          <img src={props.thumbnail} className="m-auto h-full" alt="" />
        </div>
      </Link>}
      {props.children.map((child, i) => {
          return <NavItem key={i} link={child.props.children[0].props.link} listItems={child.props.children[1].props.children}>{child.props.children[0].props.children}</NavItem>;
      })}
  </div>);
}

const NavbarMobile = (props) => {
  const [open, setOpen] = useState(false);
  const [whichOpen, setWhichOpen] = useState(null);
  const handleClick = () => {
    setOpen(!open);
  }
  return (<div className="nav text-gray-300/80">
    <div onClick={handleClick} className="flex space-x-6 shadow-2xl bg-sky-700/30 rounded-3xl box-content p-4 h-20">
      {open ? 
      <AiOutlineClose className="m-auto text-black hover:text-gray-600 hover:cursor-pointer relative" size={50} color="#bbb" /> :
      <AiOutlineMenu  className="m-auto text-black hover:text-gray-600 hover:cursor-pointer relative" size={50} color="#bbb" /> } 
    </div>
    {open && <div className="space-y-0.5 my-2">
      {props.children.map((child, i) => {
        return <MobileNavItem key={i} index={i} open={whichOpen} setOpen={setWhichOpen} link={child.props.children[0].props.link} listItems={child.props.children[1].props.children}>{child.props.children[0].props.children}</MobileNavItem>;
      })}
    </div>}
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