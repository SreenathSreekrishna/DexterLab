import { NavLink as Link} from 'react-router-dom';

const NotFound = (props) => {
    return <div className="notfound">
        404 Not Found
        <hr className="my-5 w-1/2 ml-[25%]"></hr>
        <span className="text-xl">
            Click <Link to="/" className="hover:text-blue-200/70 hover:underline text-blue-200">here</Link> to return home
        </span>
    </div>;
}

export default NotFound;