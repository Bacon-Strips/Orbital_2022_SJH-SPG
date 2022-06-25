function ErrorDisplay(props) {
    let messages = props.conditions;
    messages = messages.filter(checks => checks[0])
    messages.map(checks => {
        {<p>checks[1]</p>}
    })
    return (
        <div>
            {messages}
        </div>
    )
}

export default ErrorDisplay;