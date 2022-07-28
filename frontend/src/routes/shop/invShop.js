import { useState, useEffect } from 'react';
import { Search } from './partShop.js';
import { server } from '../../vars.js';

const isin = (v, s) => {
    for (var k of ['iName', 'iCreator']) {
        if (String(v[k]).toLowerCase().includes(s.toLowerCase())) {
            return true;
        }
    }
    return false;
}

const Invention = (props) => {
    const [added, setAdded] = useState(false);
    const handler = () => {
        const fd = new FormData;
        fd.append('type', 'iID');
        fd.append('id', props.iID);
        fetch('/api/addToCart', {
            method: "POST",
            body: fd
        }).then(res => {
            res.json().then(data => {
                if (data.status === 'done') {
                    setAdded(true);
                }
            });
        });
    }
    var isthere = false;
    if (props.loggedIn) {
        for (var v of props.added) {
            if (props.iID === v[2] && v[3]===1) {
                isthere = true;
                break;
            }
        }
    }
    return <div className='invention'>
        <div className='invImgDiv'>
            <img src={`${server}/api/inventionImg?id=${props.iID}`} alt={props.iName} className='partImg' />
        </div>
        <div className='invR'>
            <div className='invName'>{props.iName}</div>
            <div className='invCost'>{`$${props.iCost}`}</div>
            <div className='invDesc'>{props.iDesc.split('\n').map((v,i) => {
                return <div className='invDescLine' key={i}>{v}</div>;
            })}</div>
            <div className='invCreator'>{`Created by ${props.iCreator}`}</div>
            {props.loggedIn && <div className='addToCart'>
                <button onClick={handler} disabled={added}>{added||isthere ? "Added!" : "Add To Cart"}</button>
            </div>}
        </div>
    </div>
}

const InvList = (props) => {
    const json =  (async () => {
        return await (await fetch(`${server}/api/getInventions`)).json();
    })();
    var [data, setData] = useState([]);
    useEffect(() => {
        json.then((dat) => {
            setData(dat);
        });
    }, []);
    const jso =  (async () => {
        return await (await fetch(`${server}/api/getCart`, {method: 'POST'})).json();
    })();
    const [dat, setDat] = useState([]);
    useEffect(() => {
        jso.then((daat) => {
            setDat(daat);
        });
    }, []);
    return <div className='invList'>
        {data.map((v,i) => {
            return isin(v, props.search) ? <Invention key={i} added={dat} {...v} {...props} /> : <></>;
        })}
    </div>
}

const InvShop = (props) => {
    const [search, setSearch] = useState('');
    return <div>
        <Search val={search} setVal={setSearch} {...props} />
        <InvList search={search} {...props} />
    </div>;
}

export default InvShop;