const StyledInput = (props) => {
    return <input type="text" value={props.children} />;
}

const SubmitButton = (props) => {
    return <input type="submit" value={props.value ? props.value : 'Submit'}/>;
}

const Form = (props) => {
    return <div>
        {props.children.map(child => <StyledInput>{child.children}</StyledInput>)}
        <SubmitButton value={props.submit}/>
    </div>;
}

export default Form;