function Button(props) {
    return (
        <button onClick={props.do}>{props.Purpose}</button>
    )
}

export default Button;