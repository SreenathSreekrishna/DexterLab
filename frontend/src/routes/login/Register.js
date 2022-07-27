import Form from '../../Form.js';
import { useEffect, useState } from 'react';
import { server,emailRegex } from '../../vars.js';

const Register = () => {
    const [data, setData] = useState({});
    const handler = (data) => {
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }
        const json =  (async () => {
            return await (await fetch(`${server}/api/register`, {
                method: "POST",
                credentials: 'same-origin',
                body: fd
            })).json();
        })();
        json.then((dat) => {
            setData(dat);
        });
    }
    return <Form submit="Register" onsubmit={handler}>
        <div name="uName" check={/^[A-Z].* [A-Z].*$/}>Name</div>
        <div name="uMail" check={emailRegex}>Email</div>
        <div name="uPwd" type="password">Password</div>
    </Form>;
}

export default Register;