import  React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MessageBox  from "./MessageBox";
import Messages from './Messages';
import Message from './Messages/Message';
import useChat from './_useChat';
import NickName from './NickName';

var sessionNickName = ''

const Chat = () => {
    const {messages, sendMessage} = useChat();
    return (
        <div>
        <NickName onSetNickname = {(nickname) => {sessionNickName = nickname}}/>
        <Container maxWidth="sm">
            <h1>Super Cool Chat App</h1>
            <Typography component="div" style={{ height: '70vh',margin:'2vh 0 1vh 0' }}>
                <Messages messages = {messages}/>
            </Typography>
            <MessageBox onSendmessage = {(message) => sendMessage(prepareMessageToSend(message))}/>
        </Container>
        </div>
    );
};

function prepareMessageToSend(message) {
    var message = new Message(message,sessionNickName);
    return message;
}

export default Chat;
