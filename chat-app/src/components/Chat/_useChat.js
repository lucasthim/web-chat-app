import { useEffect, useRef, useState} from 'react';

import socketIOClient from 'socket.io-client';

const server_port = 8001;
const server_url = `http://localhost:${server_port}/`;

const useChat = () => {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(server_url);

        socketRef.current.on('newChatMessage',(message) => {
            setMessages((messages) => [...messages,message]);
        });

        socketRef.current.on('loadChatHistory',(loadedMessages) => {
            setMessages((messages) => [...messages,loadedMessages]);
            console.log(loadedMessages)
        });

        socketRef.current.on('loadUsers',(loadedUsers,) => {
            setUsers((loadedUsers) => [...users,loadedUsers]);
            console.log(loadedUsers)
        });
        
        return () => {
            socketRef.current.disconnect();
        };
    },[]);

    const sendMessage = (message) => { socketRef.current.emit('newChatMessage',message) };
    const sendUser = (user) => { socketRef.current.emit('loadUsers',user) };

    return {messages, sendMessage,users,sendUser};
}



export default useChat;