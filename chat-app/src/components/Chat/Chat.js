import  React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import MessageBox  from "./MessageBox";
import Messages from './Messages';
import Message from './Messages/Message';
import useChat from './_useChat';
import NickName from './NickName';

var sessionNickName = ''
var chatHistory = '';
var nicknames = [
    'Lucas',
    'Lucas1'
]

const Chat = () => {
    const {messages, sendMessage, userConnected, userDisconnected} = useChat();
    return (
        <div>
        <NickName onSetNickname = {(nickname) => {sessionNickName = nickname}}
                  existingNicknames = {nicknames}/>
        <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="primary" gutterBottom>Super Cool Chat App</Typography>
            <Typography component="div" style={{ height: '70vh',margin:'2vh 0 1vh 0' }}>
                <Messages messages = {messages}/>
            </Typography>
            <MessageBox onSendmessage = {(message) => sendMessage(prepareMessageToSend(message))}/>
        </Container>
        {/* <Button onClick={userDisconnected(sessionNickName)} color="primary">
            Log out
        </Button> */}
        </div>
    );
};

function prepareMessageToSend(message) {
    var message = new Message(message,sessionNickName,true);
    return message;
}


export default Chat;
