import { useState, useEffect } from 'react';
import { Search } from './partShop.js';
import server from '../../vars.js';

const isin = (v, s) => {
    for (var k of ['iName', 'iCreator']) {
        if (String(v[k]).toLowerCase().includes(s.toLowerCase())) {
            return true;
        }
    }
    return false;
}

const Invention = (props) => {
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
    return <div className='invList'>
        {data.map((v,i) => {
            return isin(v, props.search) ? <Invention key={i} {...v} /> : <></>;
        })}
    </div>
}

const InvShop = () => {
    const [search, setSearch] = useState('');
    return <div>
        <Search val={search} setVal={setSearch} />
        <InvList search={search} />
    </div>;
}

export default InvShop;