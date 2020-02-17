import  React, { useState} from 'react';

import TextField from '@material-ui/core/TextField';

const MessageBox = ({onSendmessage: pushSendMessage}) => {
    const [message, setMessage] = useState("");

    return (
        <form  noValidate autoComplete="off">
            <div>
            <TextField
                label="Message"
                placeholder="Type your message here"
                multiline
                variant="outlined"
                rows="5"
                fullWidth
                margin="normal"
                value = {message}
                onChange = { (event) => setMessage(event.target.value)}
                onKeyDown = { (event) => {
                    if (event.key === "Enter"){
                        event.preventDefault();
                        pushSendMessage(message);
                        setMessage("")
                    }
                }}
            />
            </div>
        </form>
    );
};

export default MessageBox;