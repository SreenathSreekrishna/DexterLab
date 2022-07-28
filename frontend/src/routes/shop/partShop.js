import { server } from '../../vars';
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
    const [added, setAdded] = useState(false);
    const handler = () => {
        const fd = new FormData;
        fd.append('type', 'pID');
        fd.append('id', props.data.pID);
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
    for (var v of props.added) {
        if (props.data.pID === v[2] && v[3]===0) {
            isthere = true;
            break;
        }
    }
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
            {props.loggedIn && <div className='addToCart'>
                <button onClick={handler} disabled={added}>{added||isthere ? "Added!" : "Add To Cart"}</button>
            </div>}
        </div>
    </div> : <></>}</>
}

const PartList = (props) => {
    const json =  (async () => {
        return await (await fetch(`${server}/api/getParts`)).json();
    })();
    const [data, setData] = useState([]);
    useEffect(() => {
        json.then((dast) => {
            setData(dast);
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
    return <div className='partList'>
        {data.map((v,i) => {
            return <Part data={v} key={i} render={isin(props.val.toLowerCase(), v)} added={dat} {...props} />;
        })}
    </div>;
}

const PartShop = (props) => {
    const [val, setVal] = useState('');
    return <div>
        <Search val={val} setVal={setVal} {...props} />
        <PartList val={val} {...props} />
    </div>;
}

export {Search};
export default PartShop;