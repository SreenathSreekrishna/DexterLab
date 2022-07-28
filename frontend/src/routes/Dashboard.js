import { Navigate } from "react-router-dom";

const Main = (props) => {
    const addCash = () => {
        const fd = new FormData();
        fd.append('amount', 10000);
        fetch('/api/addCash', {method: 'POST', body:fd}).then(data => {
            data.json().then(json => {
                props.setUser([props.user[0], props.user[1], json.newAmount]);
            })
        })
    }
    return <div className="dashboard">
        <div className="uInfo">
            <div className="uName">
                Hi, {props.user[1]}
            </div>
            <div className="uBalance" onClick={addCash}>
                Balance: ${props.user[2]}
            </div>
        </div>
    </div>;
}

const Dashboard = (props) => {
    return props.loggedIn ? <Main {...props} /> : <Navigate to="/login" />;
}

export default Dashboard;