const userModel = require('../models/radiusModels');

exports.getSessionList = async (req, res) => {
    const { user, active } = req.body;
    try {
        const sessionList = await userModel.getSessionList(user, active);
        res.json(sessionList);
    } catch (err) {
        res.send({ error: err.message });
    }
};

exports.deleteSession = async (req, res) => {
    const { id } = req.body;
    try {
        const sessionDelete = await userModel.deleteSession(id);
        res.send({
            status: 'Session has been deleted'
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};