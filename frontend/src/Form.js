import { useState } from "react";

const StyledInput = (props) => {
    const setIdx = (get, set, newItem) => {
        return set([
            ...get.slice(0,props.idx),
            newItem,
            ...get.slice(props.idx+1)
        ]);
    }
    const handle = (e) => {
        setIdx(props.get, props.set, e.target.value);
    }
    return <div className={props.get[props.idx].match(props.divprops.check) ? "styledInput" : "invalidInput"}>
        <input type={props.type=="password" ? "password" : "text"} placeholder={props.children} value={props.get[props.idx]} onChange={handle} spellCheck={false} />
    </div>;
}

const SubmitButton = (props) => {
    return <div className="styledSubmit">
        <button type="submit" onClick={() => props.handler(props.values)}>{props.value ? props.value : 'Submit'}</button>
    </div>;
}

const Form = (props) => {
    const [val, setVal] = useState(Array(props.children.length).fill(''));
    var keys = [];
    for (var child of props.children) {
        keys.push(child.props.name);
    }
    return <div className="styledForm">
        {props.children.map((child,i) => <StyledInput key={i} idx={i} get={val} set={setVal} divprops={child.props} type={child.props.type}>{child.props.children}</StyledInput>)}
        <SubmitButton value={props.submit} values={Object.assign(...keys.map((k, i) => ({[k]: val[i]})))} handler={props.onsubmit} />
    </div>;
}

export default Form;