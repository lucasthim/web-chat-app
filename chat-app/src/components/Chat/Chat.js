import  React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MessageBox  from "./MessageBox";
import Messages from './Messages';
import Message from './Messages/Message';

const Chat = () => {
    return (
        <div>
        <Container maxWidth="sm">
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '80vh',margin:'2vh 0 1vh 0' }} /> */}
            <Messages messages = { mockMessages}/>
            <MessageBox onSendmessage = {(message) =>onSendMessageEvent(message)}/>
        </Container>
        </div>
        )};

function onSendMessageEvent (message) {
    alert("Message sent: " + message)

    mockMessages.push(new Message(message,'Lucas Thimoteo'))
}

var mockMessages = [
    new Message('That is awesome!'),
    new Message('That is great!'),
    new Message('That is awesome!'),
    new Message('That is great!'),
    new Message('That is awesome!'),
    new Message('That is great!')
];

function getMessagesFromSession () {
 return mockMessages;
}


export default Chat;
