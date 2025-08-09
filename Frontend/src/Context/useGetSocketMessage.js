import { useEffect } from 'react'
import useConversation from '../zustand/useConversation';
import { useSocketContext } from './SocketContext';
import sound from '../assets/sound.mp3'

export default function useGetSocketMessage() {
    const { socket } = useSocketContext();
    const { messages,setMessage } = useConversation();

    useEffect(() => {
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            setMessage([...messages, newMessage]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages, setMessage]);
}

