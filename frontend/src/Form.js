import { useState } from "react";

const StyledInput = (props) => {
    const setIdx = (newItem) => {
        props.set([
            ...props.get.slice(0,props.idx),
            newItem,
            ...props.get.slice(props.idx+1)
        ])
    }
    const handle = (e) => {
        if (e.nativeEvent.inputType == 'deleteContentBackward') {
            setIdx(props.get[props.idx].slice(0,-1))
            return;
        }
        if (e.nativeEvent.data) {
            setIdx(props.get[props.idx]+e.nativeEvent.data);
        }
    }
    return <div className="styledInput">
        <input type="text" placeholder={props.children} value={props.get[props.idx]} onChange={handle} />
    </div>;
}

const SubmitButton = (props) => {
    return <div className="styledSubmit">
        <button type="submit">{props.value ? props.value : 'Submit'}</button>
    </div>;
}

const Form = (props) => {
    const [val, setVal] = useState(Array(props.children.length).fill(''));
    return <div className="styledForm">
        {props.children.map((child,i) => <StyledInput key={i} idx={i} get={val} set={setVal} >{child.props.children}</StyledInput>)}
        <SubmitButton value={props.submit}/>
    </div>;
}

export default Form;