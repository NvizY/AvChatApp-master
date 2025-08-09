import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Authprovider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser) {
            const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
            const socket = io(SOCKET_URL, {
                query: {
                    userId: authUser.user._id,
                },
            });

            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
            
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
