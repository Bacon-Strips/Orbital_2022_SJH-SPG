function Button(props) {
    return (
        <button onClick={props.do} className={props.Purpose}>{props.Purpose}</button>
    )
}

export default Button;