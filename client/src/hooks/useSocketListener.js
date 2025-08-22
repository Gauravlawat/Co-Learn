import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const socket = io('https://co-learn.onrender.com');

export const useSocketListener = (eventName) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const handleEvent = (newData) => {
            console.log(`Received event '${eventName}':`, newData);
            setData(newData);
        };
        
        socket.on(eventName, handleEvent);

        return () => {
            socket.off(eventName, handleEvent);
        };
    }, [eventName]);

    return data;
};