import { useEffect, useRef, useState} from 'react';

import socketIOClient from 'socket.io-client';

const server_port = 8001;
const server_url = `http://localhost:${server_port}/`;

const useChat = () => {
    const [messages, setMessages] = useState([])
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(server_url);

        socketRef.current.on('newChatMessage',(message) => {
            setMessages((messages) => [...messages,message]);
        });

        socketRef.current.on('loadChatHistory',(loadedMessages) => {
            // setMessages((messages) => [...messages,loadedMessages]);
            console.log(loadedMessages)
        });

        
        // socketRef.current.on('disconnect', () => {
        // TODO: Notify that user left the room 
        // });

        return () => {
            socketRef.current.disconnect();
        };

            
    },[]);

    const sendMessage = (message) => { socketRef.current.emit('newChatMessage',message) }

    const userConnected = (nickname) => { socketRef.current.emit('loadMessages'); }

    const userDisconnected = (nickname) => { socketRef.current.emit('loadMessages'); console.log('User disconnected') }
    
    return {messages, sendMessage, userConnected, userDisconnected};
}



export default useChat;