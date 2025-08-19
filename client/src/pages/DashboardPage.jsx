import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { useSocketListener } from '../hooks/useSocketListener';

// Leaflet icon setup
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] });
L.Marker.prototype.options.icon = DefaultIcon;

const DashboardPage = () => {
    const [sessions, setSessions] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', skillCategory: '' });

    const newSession = useSocketListener('sessionCreated');
    const { title, description, skillCategory } = formData;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
        const getSessions = async () => {
            try {
                const res = await api.get('/sessions');
                setSessions(res.data);
            } catch (err) { console.error(err); }
        };
        getSessions();
    }, []);

    useEffect(() => {
        if (newSession) {
            setSessions(prevSessions => [newSession, ...prevSessions]);
        }
    }, [newSession]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (!userLocation) return alert("Please allow location access to create a session.");
        try {
            const sessionData = { 
                ...formData, 
                location: {
                    type: 'Point',
                    coordinates: [userLocation.lng, userLocation.lat]
                }
            };
            await api.post('/sessions', sessionData);
            setFormData({ title: '', description: '', skillCategory: '' });
        } catch (err) { console.error(err); }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={onSubmit}>
                <h2>Create a New Session</h2>
                <input type="text" placeholder="Title" name="title" value={title} onChange={onChange} required />
                <textarea placeholder="Description" name="description" value={description} onChange={onChange} required></textarea>
                <input type="text" placeholder="Skill Category" name="skillCategory" value={skillCategory} onChange={onChange} required />
                <button type="submit">Create Session</button>
            </form>
            <div>
                <h2>Available Sessions</h2>
                {userLocation ? (
                    <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: '500px', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {sessions.map(session => (
                            <Marker key={session._id} position={[session.location.coordinates[1], session.location.coordinates[0]]}>
                                <Popup>
                                    <h3><Link to={`/session/${session._id}`}>{session.title}</Link></h3>
                                    <p>Hosted by: {session.host.name}</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                ) : <p>Loading map...</p>}
            </div>
        </div>
    );
};

export default DashboardPage;