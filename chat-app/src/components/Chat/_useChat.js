import { useEffect, useRef, useState} from 'react';

import socketIOClient from 'socket.io-client';

const server_port = 8001;
const server_url = `http://localhost:${server_port}/`;

const useChat = () => {
    const [messages, setMessages] = useState([])
    const sockerRef = useRef();

    useEffect(() => {
        sockerRef.current = socketIOClient(server_url);

        sockerRef.current.on('newChatMessage',(message) => {
            setMessages((messages) => [...messages,message]);
        });
        
        // sockerRef.current.on('disconnect', () => {
        // TODO: Notify that user left the room 
        // });

        return () => {
            sockerRef.current.disconnect();
        };

            
    },[]);

    const sendMessage = (message) => {
        sockerRef.current.emit('newChatMessage',message)
    }

    return {messages, sendMessage};
}

export default useChat;