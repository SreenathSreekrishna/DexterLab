import { useState,useEffect } from "react";
import {useLocation} from "react-router-dom";
import {server} from '../../vars.js';

const Verify = (props) => {
    const search =  new URLSearchParams(useLocation().search);
    const [data, setData] = useState({});
    const json =  (async () => {
        return await (await fetch(`${server}/api/verify/${search.get('code')}`)).json();
    })();
    useEffect(() => {
        json.then((dat) => {
            setData(dat);
        });
    }, []);
    return <div className="verifyWrapper">{data.status==='error' ? 
    <div className="afterVerify">Error! <div className="reason">Reason: {data.msg}</div></div> : 
    <div className="afterVerify">Verified!</div>}</div>;
}

export default Verify;