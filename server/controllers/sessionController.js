const Session = require('../models/Session');

exports.createSession = async (req, res) => {
    const { title, description, skillCategory, location } = req.body;
    try {
        const newSession = new Session({
            title,
            description,
            skillCategory,
            location,
            host: req.user.id
        });

        const session = await newSession.save();
        const populatedSession = await Session.findById(session._id).populate('host', 'name');

        // Broadcast the new session to all connected clients
        req.io.emit('sessionCreated', populatedSession);

        res.status(201).json(populatedSession);
    } catch (err) {
        console.error("ERROR CREATING SESSION:", err.message);
        res.status(500).send('Server error');
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find().populate('host', 'name');
        res.json(sessions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate('host', 'name')
            .populate('participants', 'name');
        if (!session) return res.status(404).json({ msg: 'Session not found' });
        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};