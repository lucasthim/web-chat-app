import  React,{Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import MessageBox  from "./MessageBox/MessageBox";
// import Messages from './Messages';
import Message from './Messages/Message';

import authenticationService from '../../resources/AuthenticationService';
import LoginService  from "../../resources/LoginService";
import Socket  from "../../resources/Socket";

class Chat extends Component {
    constructor() {
        super();
        this.loginService = new LoginService();
        this.socket = new Socket();

        this.state = {
            sessionNickname: authenticationService.authUser
        }

        this.messages = [];
    }

    componentDidMount() {
        this.socket.emitEvent('userConnected',
        {
            user:this.state.sessionNickname,
            body: `${this.state.sessionNickname} has joined the room.`,
            datetime: Date.now(),
            isSystemMessage:true,
            isUserMessage:false,
        });

        this.socket.emitEvent('loadMessages');

        this.socket.listenOn('loadMessages',this.loadMessages);
        this.socket.listenOn('newMessage',this.loadNewMessage);

    }

    loadMessages = (messages) => {
        console.log(messages)
        this.messages = messages;
    }

    loadNewMessage = (message) => {
        console.log(message)
        this.messages.append(message);
    }

    sendMessage = (message) => {
        this.socket.emitEvent('sendMessage',new Message(message,this.state.sessionNickname,true));
    }

    logout = () => {

        const logoutMessage = {
            user:this.state.sessionNickname,
            body: `${this.state.sessionNickname} has left the room.`,
            datetime: Date.now(),
            isSystemMessage:true,
            isUserMessage:false,
        };

        this.loginService.userLogout(logoutMessage,
            (response) => {
                authenticationService.logout(
                    () => this.props.history.push('/')
                )}
            ,(error) => { console.log("Error trying to leave the chat room.",error)}
        );
    }

    componentWillUnmount() {
        this.socket.emitEvent('sendMessage',
        {
            user:this.state.sessionNickname,
            body: `${this.state.sessionNickname} has left the room.`,
            datetime: Date.now(),
            isSystemMessage:true,
            isUserMessage:false,
        });
        // this.socket.removeListener('loadMessages');
        // this.socket.removeListener('newMessage');

    }
    
    render() {
        return (
            <div>
            <Container maxWidth="sm" >
                <Typography variant="h4" align="center" color="primary" gutterBottom>Super Cool Chat App</Typography>
                <Typography component="div" style={{ height: '60vh',margin:'2vh 0 1vh 0' }}>
                    {/* <Messages messages = {this.messages}/> */}
                </Typography>
                <MessageBox emitLogout = {this.logout}
                            emitSendMessage = {this.sendMessage}/>
                <Grid container 
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justify="space-between">
                    <Button onClick={this.logout} size="medium" variant="contained">
                        Log out
                    </Button>
                    <Button onClick={this.logout} color="primary" size="medium" variant="contained">
                        Send
                    </Button>
                </Grid>
            </Container>
            </div>
        );
    }

};

export default Chat;
