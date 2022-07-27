import Form from '../../Form.js';
import { useState } from 'react';
import {server, emailRegex} from '../../vars.js';
import {Navigate} from 'react-router-dom';

const Login = (setLoggedIn) => {
    const [data, setData] = useState({});
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
        json.then((dat) => {
            setData(dat);
        });
    };
    return (!Array.isArray(data) ? 
    <Form submit="Login" onsubmit={handle} error={data.status}>
        <div name="uMail" check={emailRegex}>Email</div>
        <div name="uPwd" type="password">Password</div>
    </Form> : <Navigate to="/dashboard" />);
}

export default Login;