import server from '../../vars';
import { useState, useEffect } from 'react';

const isin = (search, v) => {
    for (var k of ['pName', 'pNumber']) {
        if (v[k].toLowerCase().includes(search)) {
            return true;
        }
    }
    return false;
}

const Search = (props) => {
    const updateInp = (e) => {
        var back = e.nativeEvent.inputType === "deleteContentBackward";
        var key = e.nativeEvent.data;
        if (back) {
            props.setVal(props.val.slice(0,-1));
            return;
        }
        if (key) {
            props.setVal(props.val+key);
        }
    }
    return <div className='partSearch'>
        <input value={props.val} onChange={updateInp} placeholder="Search..."/>
    </div>;
}

const Part = (props) => {
    return <>{props.render ? <div className='part'>
        <div className='partImgDiv'>
            <img src={`${server}/api/partImg?id=${props.data.pID}`} alt={props.data.pName} className='partImg' />
        </div>
        <div className='partR'>
            <div className='partName'>{props.data.pName}</div>
            <div className='partCost'>{`$${props.data.pCost}`}</div>
            <div className='partDesc'>{props.data.pDesc.split('\n').map((v,i) => {
                return <div className='partDescLine' key={i}>{v}</div>;
            })}</div>
        </div>
    </div> : <></>}</>
}

const PartList = (props) => {
    const json =  (async () => {
        return await (await fetch(`${server}/api/getParts`)).json();
    })();
    var [data, setData] = useState([]);
    useEffect(() => {
        json.then((dat) => {
            setData(dat);
        });
    }, []);
    return <div className='partList'>
        {data.map((v,i) => {
            return <Part data={v} key={i} render={isin(props.val.toLowerCase(), v)} />;
        })}
    </div>;
}

const PartShop = () => {
    const [val, setVal] = useState('');
    return <div>
        <Search val={val} setVal={setVal} />
        <PartList val={val} />
    </div>;
}

export default PartShop;