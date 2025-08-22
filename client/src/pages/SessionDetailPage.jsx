import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useSocketListener, socket } from '../hooks/useSocketListener';



const SessionDetailPage = () => {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Get the session ID from the URL
    const updatedSession = useSocketListener('sessionUpdated');

    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null); // This is a helper for auto-scrolling
    const newMessage = useSocketListener('newMessage');

    useEffect(() => {
        const getSessionDetails = async () => {
            try {
                const res = await api.get(`/sessions/${id}`);
                setSession(res.data);
                setLoading(false);
                socket.emit('joinRoom', id);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        getSessionDetails();
    }, [id]); // Re-run this effect if the ID in the URL changes

    useEffect(() => {
        // We only update if the updated session matches this page's session
        if (updatedSession && updatedSession._id === id) {
            setSession(updatedSession);
        }
    }, [updatedSession, id]);

    useEffect(() => {
        if (newMessage) {
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
        }
    }, [newMessage]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            api.get('/auth/me').then(userRes => { // Gets current user info
                socket.emit('sendMessage', { sessionId: id, message, user: userRes.data });
                setMessage(''); // Clears the input box
            });
        }
    };

    const handleJoinSession = async () => {
        try {
            // Get the current logged-in user's data
            const userRes = await api.get('/auth/me');
            const currentUser = userRes.data;

            if (session.host._id === currentUser._id) {
                console.log('You are the host of this session. You cannot join as a participant.');
                alert("You are the host, can't join the session.");
                return; // Stop the function here
            }

            const isAlreadyParticipant = session.participants.some(
                (participant) => participant._id === currentUser._id
            );

            if (isAlreadyParticipant) {
                console.log('This user is already a participant in the session.');
                alert('You have already joined this session.'); // Optional: you can also show an alert
                return; // Stop the function here
            }
            // This just tells the server we want to join.
            // The server will handle the update and broadcast it back to us.
            await api.post(`/sessions/${id}/join`);
        } catch (err) {
            console.error(err.response.data);
            alert('Failed to join session. You may already be a participant.');
        }
    };

    if (loading) {
        return <div>Loading session...</div>;
    }

    if (!session) {
        return <div>Session not found.</div>;
    }

    return (
        <div>
            <Link to="/dashboard">Back to Dashboard</Link>
            <h1>{session.title}</h1>
            <p><strong>Category:</strong> {session.skillCategory}</p>
            <p><strong>Hosted by:</strong> {session.host.name}</p>
            <hr />
            <h3>Description</h3>
            <p>{session.description}</p>
            <hr />

            {/* This is where you would add future features */}
            <h3>Participants ({session.participants.length})</h3>
            <ul>
                {session.participants.map(participant => (
                    <li key={participant._id}>{participant.name}</li>
                ))}
            </ul>
            <button onClick={handleJoinSession}>Join this Session</button>
            <hr style={{ margin: '2rem 0' }} />
            <div className="chat-container">
                <h3>Session Chat</h3>
                <div className="chat-messages">
                    {chatMessages.map((msg, index) => {
                        const isHost = msg.user._id === session.host._id;

                        return(
                            <div key={index} className="chat-message">
                                <strong>{isHost ? 'Host' : msg.user.name}: </strong>
                                <span>{msg.text}</span>
                            </div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="chat-form">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default SessionDetailPage;