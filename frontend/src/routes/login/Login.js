import Form from '../../Form.js';
import { useState } from 'react';
import {server, emailRegex} from '../../vars.js';
import {Navigate} from 'react-router-dom';

const Login = (props) => {
    const [data, setData] = useState({});
    if (props.loggedIn) {
        return <Navigate to="/dashboard" />;
    }
    const handle = (data) => {
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }
        const json =  (async () => {
            return await (await fetch(`${server}/api/login`, {
                method: "POST",
                body: fd,
                credentials: 'include'
            })).json();
        })();
        json.then(dat => {
            setData(dat);
            if (dat.status!=='error') {
                props.setUser(dat);
                props.setLoggedIn(true);
            }
        });
    };
    return (!props.loggedIn ? 
    <Form submit="Login" onsubmit={handle} error={data.msg}>
        <div name="uMail" check={emailRegex}>Email</div>
        <div name="uPwd" type="password">Password</div>
    </Form> : <Navigate to="/dashboard" />);
}

export default Login;