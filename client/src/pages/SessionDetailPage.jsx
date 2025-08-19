import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const SessionDetailPage = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Get the session ID from the URL

    useEffect(() => {
        const getSessionDetails = async () => {
            try {
                const res = await api.get(`/sessions/${id}`);
                setSession(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        getSessionDetails();
    }, [id]); // Re-run this effect if the ID in the URL changes

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
            <button>Join this Session</button>
        </div>
    );
};

export default SessionDetailPage;