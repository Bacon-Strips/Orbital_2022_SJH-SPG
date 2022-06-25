import ErrorMessage from "./ErrorMessage";

function ErrorDisplay(props) {
    let messages = props.conditions;
    messages = messages.filter(checks => checks[0])
    messages = messages.map((check, index) => (<ErrorMessage key={index} message={check[1]}/>))
    return (
        <div>
            {messages}
        </div>
    )
}

export default ErrorDisplay;